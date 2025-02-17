import { createClient } from "@sanity/client";

const client = createClient({
    projectId: 'w4o91pu1',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-02-06',
});

async function getCategories() {
    try {
        const request = `
            *[_type == "category"]{
                title,
                description,
                categoryImage
            }
        `;

        const categories = await client.fetch(request);
        return categories;
    } catch (error) {
        console.error('ERROR FETCHING CATEGORIES: ', error);
    }
}

export { client, getCategories };