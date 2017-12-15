/**
 * actions for the reducer
 * @file 
 * @module actions
 */

 /**
  * set the user to instructor
  * @memberof module:actions
  * @param {boolean} isInstructor
  * @returns action of setting a instructor
  */
export const setIsInstructor = (isInstructor) => {
    return {
        type: 'SET_IS_INSTRUCTOR',
        isInstructor: isInstructor
    }
};

/**
 * @returns action to store the join code
 * @memberof module:actions
 * @param {String} joinCode 
 */
export const storeJoinCode = (joinCode) => {
    return {
        type: 'STORE_JOIN_CODE',
        joinCode: joinCode
    }
};

/**
 * @returns action to update the canvas
 * @memberof module:actions
 * @param {*} canvasJSON 
 */
export const canvasUpdated = (canvasJSON) => {
    return {
        type: 'socket/CANVAS_UPDATED',
        canvasJSON: canvasJSON
    }
};

/**
 * @returns action to initialize the canvas
 * @memberof module:actions
 * @param {*} canvas 
 */
export const setInitialCanvas = (canvas) => {
    return {
        type: "SET_INITIAL_CANVAS",
        canvas: canvas
    }
}

/**
 * @returns action to activate the drawing mode on canvas for the user
 * @memberof module:actions
 */
export const activateCanvasDrawingMode = () => {
    return {
        type: "ACTIVATE_CANVAS_DRAWING_MODE"
    }
}

/**
 * @returns action to deactivate the drawing mode
 * @memberof module:actions
 */
export const deactivateCanvasDrawingMode = () => {
    return {
        type: "DEACTIVATE_CANVAS_DRAWING_MODE"
    }
}

/**
 * @returns action to add a rect object to canvas
 * @memberof module:actions
 */
export const addRectToCanvas = () => {
    return {
        type: "CANVAS_RECT_ADDED"
    }
}

/**
 * @returns action to remove a certain rect object from canvas
 * @memberof module:actions
 * @param {String} id 
 */
export const removeRectFromCanvas = (id) => {
    return {
        type: "CANVAS_RECT_REMOVED",
        objectId: id
    }
}

/**
 * @returns action to highlight the rect of a certain annotations
 * @memberof module:actions
 * @param {String} id 
 */
export const highlightRect = (id) => {
    return {
        type: "HIGHLIGHT_RECT",
        objectId: id
    }
}

/**
 * @returns action to unhilight all the rect objects
 * @param {String} id 
 */
export const unhighlightAllRects = (id) => {
    return {
        type: "UNHIGHLIGHT_RECT"
    }
}

/**
 * @returns action to freeze the canvas
 * @memberof module:actions
 */
export const freezeCanvasObjects = () => {
    return {
        type: "FREEZE_CANVAS_OBJECTS"
    }
}

/**
 * @returns action to show all annotations
 * @memberof module:actions
 */
export const showAnnotations = () => {
    return {
        type: "SHOW_ANNOTATIONS"
    }
}

/**
 * @returns action to hide all annotations
 * @memberof module:actions
 */
export const hideAnnotations = () => {
    return {
        type: "HIDE_ANNOTATIONS"
    }
}