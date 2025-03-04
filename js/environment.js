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
                <a href="single-standard.html" data-article='${JSON.stringify(article)}' class="thumb-link">
                    <img src="${imageUrl}"
                        srcset="${imageUrl} 1x, ${imageUrl2x} 2x"
                        alt="${article.title}">
                </a>
            </div>
            <div class="entry__text">
                <div class="entry__header">
                    <h1 class="entry__title">
                        <a href="single-standard.html" data-article='${JSON.stringify(article)}'>
                            ${article.title}
                        </a>
                    </h1>
                </div>
                <a class="entry__more-link" href="single-standard.html" data-article='${JSON.stringify(article)}'>See Article</a>
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

        // Add click event listeners to article links
        setupArticleClickHandlers();
    } else {
        bricksWrapper.innerHTML = '<p>No articles found.</p>';
    }
}

// Function to handle article clicks
function setupArticleClickHandlers() {
    const articleLinks = document.querySelectorAll('a[data-article]');

    articleLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Prevent the default behavior (navigating to the link)
            event.preventDefault();

            // Retrieve the article object from the data attribute
            const articleData = link.getAttribute('data-article');
            const article = JSON.parse(articleData);

            // Store the article object in localStorage
            sessionStorage.setItem('selectedArticle', JSON.stringify(article));

            // Navigate to the new page
            window.location.href = link.href;
        });
    });
}

renderArticles()