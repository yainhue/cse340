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

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId };
