/**
 * action of storing a lecture
 * @file
 * @module actions
 */

 /**
  * @returns action of storing a lecture
  * @memberof module:actions
  */
export const storeLecture = (lecture) => {
    return {
        type: 'STORE_LECTURE',
        lecture: lecture
    }
}