// Import any needed model functions
import { getAllCategories, getCategoryById, getAllServiceProjectsByCategoryId } from '../models/categories.js';

// Define any controller functions
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const category = await getCategoryById(req.params.id);
    const title = 'Category Details';
    const projects = await getAllServiceProjectsByCategoryId(req.params.id);

    res.render('category', { title, category, projects });
};

// Export any controller functions
export { showCategoriesPage, showCategoryDetailsPage };