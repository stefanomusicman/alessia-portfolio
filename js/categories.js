import { getCategories } from "./sanity.js";
import urlFor from "./sanityImage.js";

async function fetchAndLogCategories() {
    const categories = await getCategories();
    return categories;
}

function generateCategoryHTML(category) {
    const imageUrl = urlFor(category.categoryImage)
        .width(600) // Set the width of the image
        .url(); // Get the URL of the image

    const imageUrl2x = urlFor(category.categoryImage)
        .width(1200) // Set the width for the 2x version
        .url();

    return `
        <article class="brick entry" data-animate-el>
            <div class="entry__thumb">
                <a href="single-standard.html" class="thumb-link">
                    <img src="${imageUrl}"
                        srcset="${imageUrl} 1x, ${imageUrl2x} 2x"
                        alt="${category.title}">
                </a>
            </div>
            <div class="entry__text">
                <div class="entry__header">
                    <h1 class="entry__title"><a href="single-standard.html">${category.title}</a></h1>
                </div>
                <div class="entry__excerpt">
                    <p>
                        ${category.description}
                    </p>
                </div>
                <a class="entry__more-link" href="#0">See Articles</a>
            </div>
        </article>
    `;
}

async function renderCategories() {
    const categories = await fetchAndLogCategories();
    const bricksWrapper = document.querySelector('.bricks-wrapper');

    if (categories && categories.length > 0) {
        let html = '';
        categories.forEach(category => {
            html += generateCategoryHTML(category);
        });

        // Insert the generated HTML into the container
        bricksWrapper.innerHTML = html;
    } else {
        bricksWrapper.innerHTML = '<p>No categories found.</p>';
    }
}

// Call the renderCategories function to render the categories
renderCategories();