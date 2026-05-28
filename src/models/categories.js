import db from './db.js'

const getAllCategories = async () => {
  const query = `
        SELECT category_id, name
      FROM public.category;
    `;

  const result = await db.query(query);

  return result.rows;
}

const getCategoryById = async (id) => {
  const query = `
    SELECT
      c.category_id,
      c.name
    FROM category c
    WHERE c.category_id = $1;
  `;

  const queryParams = [id];
  const result = await db.query(query, queryParams);

  return result.rows[0];
};

const getAllServiceProjectsByCategoryId = async (category_id) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.project_date AS date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name,
      c.category_id,
      c.name AS category_name
    FROM service_project sp
    JOIN project_category pc
      ON sp.project_id = pc.project_id
    JOIN category c
      ON pc.category_id = c.category_id
    JOIN organizations o
      ON sp.organization_id = o.organization_id
    WHERE c.category_id = $1
    ORDER BY sp.project_date ASC;
  `;

  const queryParams = [category_id];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const getAllCategoriesByProjectId = async (project_id) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.project_date AS date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name,
      c.category_id,
      c.name AS category_name
    FROM service_project sp
    JOIN project_category pc
      ON sp.project_id = pc.project_id
    JOIN category c
      ON pc.category_id = c.category_id
    JOIN organizations o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_id = $1
    ORDER BY c.name ASC;
  `;

  const queryParams = [project_id];
  const result = await db.query(query, queryParams);

  return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
}


const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
}

export { getAllCategories, getCategoryById, getAllServiceProjectsByCategoryId, getAllCategoriesByProjectId, assignCategoryToProject, updateCategoryAssignments }  
