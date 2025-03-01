import { getArticlesByCategory } from "./sanity";
import urlFor from "./sanityImage";

const category = "Environment";

async function fetchAndLogArticles() {
    const articles = await getArticlesByCategory(category);
    console.log('ENVIRONMENT ARTICLES: ', articles);
    return articles;
}

function generateArticleHTML(article) {
    const imageUrl = article.mainImage
        ? urlFor(article.mainImage).width(600).url()
        : 'images/thumbs/masonry/statue-600.jpg'; // Fallback image

    const imageUrl2x = article.mainImage
        ? urlFor(article.mainImage).width(1200).url()
        : 'images/thumbs/masonry/statue-1200.jpg 2x';

    return `
        <article class="brick entry" data-animate-el>
            <div class="entry__thumb">
                <a href="${article.title.toLowerCase().trim()}.html" class="thumb-link">
                    <img src="${imageUrl}"
                        srcset="${imageUrl} 1x, ${imageUrl2x} 2x"
                        alt="${article.title}">
                </a>
            </div>
            <div class="entry__text">
                <div class="entry__header">
                    <h1 class="entry__title"><a href="single-standard.html">${article.title}</a></h1>
                </div>
                <a class="entry__more-link" href="#0">See Article</a>
            </div>
        </article>
    `;
}

async function renderArticles() {
    const articles = await fetchAndLogArticles();
    const bricksWrapper = document.querySelector('.bricks-wrapper');

    if (articles && articles.length > 0) {
        let html = '';
        articles.forEach(article => {
            html += generateArticleHTML(article);
        });

        // Insert the generated HTML into the container
        bricksWrapper.innerHTML = html;
    } else {
        bricksWrapper.innerHTML = '<p>No articles found.</p>';
    }
}

renderArticles()