const NUMBER_OF_UPCOMING_PROJECTS = 5;

// Import any needed model functions
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';

// Define any controller functions
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const project = await getProjectDetails(req.params.id);
    const title = 'Project Details';

    res.render('project', { title, project });
};


// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };