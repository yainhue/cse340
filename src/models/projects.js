import db from './db.js'

const getAllProjects = async () => {

  // This querry retrieves all service projects along with their associated organization names
  const query = `
        SELECT 
    sp.project_id,
    sp.title,
    sp.location,
    sp.project_date,
    o.name AS organization_name
FROM service_project sp
JOIN public.organizations o
  USING (organization_id);

    `;

  const result = await db.query(query);

  return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
  const query = `
        SELECT
  sp.project_id,
  sp.title,
  sp.description,
  sp.project_date AS date,
  sp.location,
  sp.organization_id,
  o.name AS organization_name
FROM service_project sp
JOIN organizations o
  ON sp.organization_id = o.organization_id
WHERE sp.project_date >= CURRENT_DATE
ORDER BY sp.project_date ASC
LIMIT $1;
      `;

  const queryParams = [number_of_projects];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
        SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.project_date AS date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM service_project sp
    JOIN organizations o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_id = $1;
  `;

  const queryParams = [id];
  const result = await db.query(query, queryParams);

  return result.rows[0];
};

const createProject = async (title, description, location, date, organizationId) => {
  const query = `
      INSERT INTO service_project (title, description, location, project_date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id;
    `;

  const queryParams = [title, description, location, date, organizationId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
}

const updateProject = async (projectId, organizationId, title, description, location, date) => {
  const query = `
    UPDATE service_project
    SET organization_id = $1, title = $2, description = $3, location = $4, project_date = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const queryParams = [organizationId, title, description, location, date, projectId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Project not found');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated project with ID:', projectId);
  }

  return result.rows[0].project_id;
};

const signUpForProject = async (projectId, userId) => {

  const query = 'INSERT INTO project_volunteer (project_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING;'
  const queryParams = [projectId, userId]

  const result = await db.query(query, queryParams);

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Signed up user to project with corresponding IDs:', userId, projectId);
  }

}

const isUserVolunteer = async (projectId, userId) => {

  const query = `
    SELECT EXISTS (
      SELECT 1 
      FROM project_volunteer 
      WHERE project_id = $1 AND user_id = $2
    );
  `;

  const queryParams = [projectId, userId]

  const result = await db.query(query, queryParams);

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Is User Volunteer?', result.rows[0].exists);
  }

  return result.rows[0].exists;

}

const getProjectsforUser = async (userId) => {

  const query = `
    SELECT sp.project_id,
           sp.title,
           sp.project_date,
           sp.organization_id,
           o.name
    FROM project_volunteer pv
    JOIN service_project sp ON pv.project_id = sp.project_id
    JOIN organizations o ON sp.organization_id = o.organization_id
    WHERE pv.user_id = $1;
  `;

  const queryParams = [userId]

  const result = await db.query(query, queryParams);

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Obtained the projects for userId:', userId);
    result.rows.forEach(element => {
      console.log(element.title)
    });
    console.log()
  }

  return result.rows;

}

const removeFromProject = async (projectId, userId) => {

  const query = `
    DELETE FROM project_volunteer
    WHERE project_id = $1 AND user_id = $2;
  `;

  const queryParams = [projectId, userId]

  const result = await db.query(query, queryParams);

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Removed user from project with corresponding IDs:', userId, projectId);
  }

}


// Export the model functions
export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  createProject,
  updateProject,
  signUpForProject,
  isUserVolunteer,
  getProjectsforUser,
  removeFromProject
};
