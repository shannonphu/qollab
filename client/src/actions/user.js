/**
 * action of setting user
 * @file
 * @module actions
 */

 /**
  * @returns action to set a user
  * @memberof module:actions
  */
export const setUser = (user) => {
    return {
        type: 'SET_USER',
        user: user
    }
}