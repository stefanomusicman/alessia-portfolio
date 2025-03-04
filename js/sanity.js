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

async function getArticlesByCategory(categoryName) {
    try {
        const request = `
            *[_type == "post" && categories[]->title match "${categoryName}"] {
                title,
                slug{current},
                mainImage,
                secondaryImage,
                categories[]->{
                    title
                },
                body,
                originalArticle
            }
        `;

        const articles = await client.fetch(request);
        return articles;
    } catch (error) {
        console.error(`ERROR FETCHING ARTICLES: `, error);
    }
}

export { client, getCategories, getArticlesByCategory };