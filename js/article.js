import urlFor from "./sanityImage";

// Retrieve the article object from localStorage
const articleData = sessionStorage.getItem('selectedArticle');

let article;
if (articleData) {
    article = JSON.parse(articleData);

    // // Populate the page with the article data
    // document.getElementById('article-title').textContent = article.title;
    // document.getElementById('article-description').textContent = article.description;

    // if (article.mainImage) {
    //     const imageUrl = urlFor(article.mainImage).width(800).url();
    //     document.getElementById('article-image').src = imageUrl;
    // }
}

const mainTitle = document.querySelector('.entry__title');
const mainImage = document.querySelector('.featured-image');
const secondaryImage = document.querySelector('.alignwide');

const mainImageUrl = article.mainImage ? urlFor(article.mainImage).width(1200).url() : 'images/sample-1200.jpg 1200w';
const mainImageUrl2x = article.mainImage ? urlFor(article.mainImage).width(2400).url() : 'images/sample-2400.jpg 2400w';

const secondaryImageUrl = article.secondaryImage ? urlFor(article.secondaryImage).width(1200).url() : 'images/sample-1200.jpg 1200w';
const secondaryImageUrl2x = article.secondaryImage ? urlFor(article.secondaryImage).width(2400).url() : 'images/sample-2400.jpg 2400w';


mainTitle.innerHTML = article.title;

mainImage.innerHTML = `
    <img src="${mainImageUrl}"
        srcset="${mainImageUrl} 1x, ${mainImageUrl2x} 2x"
        alt="${article.title}">
`
if (article.secondaryImage !== null) {
    secondaryImage.innerHTML = `
        <img src="${secondaryImageUrl}"
            srcset="${secondaryImageUrl} 1x, ${secondaryImageUrl2x} 2x"
            alt="${article.title}">
    `
} else {
    secondaryImage.innerHTML = `
        <img src="images/sample-1200.jpg" srcset="images/sample-2400.jpg 2400w, 
                                                  images/sample-1200.jpg 1200w, 
                                                  images/sample-600.jpg 600w" sizes="(max-width: 2400px) 100vw, 2400px"
                                        alt="">
    `
}

console.log('ARTICLE VARIABLE: ', article);