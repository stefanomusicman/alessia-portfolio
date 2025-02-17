import { getCategories } from "./sanity.js";

async function fetchAndLogCategories() {
    const categories = await getCategories();
    console.log('CATEGORIES: ', categories);
}

fetchAndLogCategories();