import express from 'express';

import {
    showIndexPage
} from './controllers/index.js';

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
    processEditProjectForm,
    processUserSingUp,
    processVolunteerRemoval
} from './controllers/projects.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showAssignCategoriesForm,
    processAssignCategoriesForm,
    showNewCategoryForm,
    processNewCategoryForm,
    categoryValidation,
    showEditCategoryForm,
    processEditCategoryForm
}
    from './controllers/categories.js';

import {
    showUserRegistrationForm,
    processUserRegistrationForm,
    showLoginForm,
    processLoginForm,
    processLogout,
    requireLogin,
    showDashboard,
    requireRole,
    showUsersPage
}
    from './controllers/users.js';

import {
    testErrorPage
} from './controllers/errors.js';

const router = express.Router();

// Route for index page
router.get('/', showIndexPage);

// --- ORGANIZATIONS ROUTES ---

// Route for organizations page
router.get('/organizations', showOrganizationsPage);

// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for new organization page
router.get('/new-organization', requireRole("admin"), showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', requireRole("admin"), organizationValidation, processNewOrganizationForm);

// Route for editing organization page
router.get('/edit-organization/:id', requireRole("admin"), showEditOrganizationForm);

// Route to handle the edit organization form submission
router.post('/edit-organization/:id', requireRole("admin"), organizationValidation, processEditOrganizationForm);

// --- PROJECTS ROUTES ---

// Route for projects page
router.get('/projects', showProjectsPage);

// Route for project details page
router.get('/project/:id', showProjectDetailsPage);

// Route for editing project page
router.get('/edit-project/:id', requireRole("admin"), showEditProjectForm);

// Route to handle the edit project form submission
router.post('/edit-project/:id', requireRole("admin"), projectValidation, processEditProjectForm);

// Route for new project page
router.get('/new-project', requireRole("admin"), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireRole("admin"), projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:projectId', requireRole("admin"), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole("admin"), processAssignCategoriesForm);

// Route to handle project volunteer singup
router.post("/signup/:id", requireLogin, processUserSingUp);

// Route to handle project volunteer removal
router.post("/removefrom/:id", requireLogin, processVolunteerRemoval);

// --- CATEGORIES ROUTES ---

// Route for categories page
router.get('/categories', showCategoriesPage);

// Route for category details page
router.get('/category/:id', showCategoryDetailsPage);

// Route for new category page
router.get('/new-category', requireRole("admin"), showNewCategoryForm);

// Route to handle new category form submission
router.post('/new-category', requireRole("admin"), categoryValidation, processNewCategoryForm);

// Route for editing category page
router.get('/edit-category/:id', requireRole("admin"), showEditCategoryForm);

// Route to handle the edit category form submission
router.post('/edit-category/:id', requireRole("admin"), categoryValidation, processEditCategoryForm);

// --- USER ROUTES ---

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Dashboard route (protected)
router.get('/dashboard', requireLogin, showDashboard);

// Users page route (protected)
router.get('/users', requireRole("admin"), showUsersPage);

// --- MISC. ROUTES ---

// error handling routes
router.get('/test-error', testErrorPage);

export default router;