
// This file now contains JSDoc comments instead of TypeScript interfaces
// to provide some documentation without requiring TypeScript

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {string[]} images
 * @property {string} category
 * @property {string[]} tags
 * @property {number} rating
 * @property {number} reviews
 * @property {number} stock
 * @property {boolean} [featured]
 * @property {number} [discountPercentage]
 * @property {boolean} [new]
 */

/**
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number} quantity
 */

/**
 * @typedef {CartItem[]} CartItems
 */
