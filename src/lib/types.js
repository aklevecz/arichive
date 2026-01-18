/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {'technical' | 'personal' | 'art'} type
 * @property {string} description
 * @property {string | null} url
 * @property {string[]} categories
 */

/**
 * @typedef {Object} ProjectData
 * @property {string} id
 * @property {string} name
 * @property {'technical' | 'personal' | 'art'} type
 * @property {string} description
 * @property {string[]} [descriptionLong]
 * @property {string[] | null} url
 * @property {string[]} categories
 * @property {boolean} [hasGallery]
 * @property {string[]} [videoUrls]
 * @property {*} [videoConfiguration]
 * @property {*} [imgConfiguration]
 */