import urlFor from "./sanityImage";

// Retrieve the article object from localStorage
const articleData = sessionStorage.getItem('selectedArticle');

let article;
if (articleData) {
    article = JSON.parse(articleData);
}

const mainTitle = document.querySelector('.entry__title');
const mainImage = document.querySelector('.featured-image');
const categories = document.querySelector('.cat-links');

const mainImageUrl = article.mainImage ? urlFor(article.mainImage).width(1200).url() : 'images/sample-1200.jpg 1200w';
const mainImageUrl2x = article.mainImage ? urlFor(article.mainImage).width(2400).url() : 'images/sample-2400.jpg 2400w';

mainTitle.innerHTML = article.title;

mainImage.innerHTML = `
    <img src="${mainImageUrl}"
        srcset="${mainImageUrl} 1x, ${mainImageUrl2x} 2x"
        alt="${article.title}">
`

function generateCategoryString() {
    const cats = article.categories;
    let catString = '';

    if (cats.length === 1) {
        categories.innerHTML = cats[0].title;
    } else {
        cats.forEach(item => catString += item.title);
        categories.innerHTML = catString;
    }
}

function generateArticleContent() {
    const articleBody = article.body;
    const articleClass = document.querySelector(".entry__content");
    let contentHTML = '';

    articleBody.forEach(item => {
        if (item._type === 'block') {
            // Handle text blocks
            let textContent = '';
            item.children.forEach(child => {
                if (child._type === 'span') {
                    textContent += child.text;
                }
            });
            contentHTML += `<p>${textContent}</p>`;
        } else if (item._type === 'image') {
            // Handle images
            const imageUrl = urlFor(item).width(800).url(); // Adjust width as needed
            contentHTML += `<img src="${imageUrl}" alt="${item.alt || 'Article Image'}" />`;
        }
    });

    contentHTML += `
        <div class="entry__author-box">
            <figure class="entry__author-avatar">
                <img alt="" src="images/alessia-profile-pic.jpg" class="avatar">
            </figure>
            <div class="entry__author-info">
                <h5 class="entry__author-name">
                    <a href="#0">
                        Alessia Proietti
                    </a>
                </h5>
                <p>
                    Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit
                    libero,
                    a pharetra augue laboris in sit minim cupidatat ut dolor voluptate enim
                    veniam
                    consequat occaecat.
                </p>
            </div>
        </div>
    `

    articleClass.innerHTML = contentHTML;
}

generateCategoryString();
generateArticleContent();

console.log('ARTICLE VARIABLE: ', article);