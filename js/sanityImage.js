import { createImageUrlBuilder } from '@sanity/image-url';
import { client } from './sanity'; // Import your Sanity client

const urlFor = (source) => createImageUrlBuilder(client).image(source);

export default urlFor;