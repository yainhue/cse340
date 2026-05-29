import express from 'express';

import { showIndexPage } from './controllers/index.js';
import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation,
    showEditOrganizationForm,
    processEditOrganizationForm
} from './controllers/organizations.js';
import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectForm,
    projectValidation,
    processNewProjectForm,
    showEditProjectForm,
    processEditProjectForm
} from './controllers/projects.js';
import { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// Route for index page
router.get('/', showIndexPage);

// Route for organizations page
router.get('/organizations', showOrganizationsPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// Route for editing organization page
router.get('/edit-organization/:id', showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

// Route for projects page
router.get('/projects', showProjectsPage);

// Route for project details page
router.get('/project/:id', showProjectDetailsPage);

// Route for editing project page
router.get('/edit-project/:id', showEditProjectForm);

// Route to handle the edit project form submission
router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// // Route for editing project page
// router.get('/edit-project/:id', showEditProjectForm);

// // Route to handle the edit project form submission
// router.post('/edit-project/:id', projectValidation, processEditProjectForm);

// Route for new project page
router.get('/new-project', showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', showAssignCategoriesForm);
router.post('/assign-categories/:projectId', processAssignCategoriesForm);

// Route for categories page
router.get('/categories', showCategoriesPage);

// Route for category details page
router.get('/category/:id', showCategoryDetailsPage);

// error handling routes
router.get('/test-error', testErrorPage);

export default router;