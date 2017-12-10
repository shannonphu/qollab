export const storeJoinCode = (joinCode) => {
    return {
        type: 'STORE_JOIN_CODE',
        joinCode: joinCode
    }
};

export const canvasUpdated = (canvasJSON) => {
    return {
        type: 'socket/CANVAS_UPDATED',
        canvasJSON: canvasJSON
    }
};

export const setInitialCanvas = (canvas) => {
    return {
        type: "SET_INITIAL_CANVAS",
        canvas: canvas
    }
}

export const activateCanvasDrawingMode = () => {
    return {
        type: "ACTIVATE_CANVAS_DRAWING_MODE"
    }
}

export const deactivateCanvasDrawingMode = () => {
    return {
        type: "DEACTIVATE_CANVAS_DRAWING_MODE"
    }
}

export const addRectToCanvas = () => {
    return {
        type: "CANVAS_RECT_ADDED"
    }
}

export const removeRectFromCanvas = (id) => {
    return {
        type: "CANVAS_RECT_REMOVED",
        objectId: id
    }
}

export const highlightRect = (id) => {
    return {
        type: "HIGHLIGHT_RECT",
        objectId: id
    }
}

export const unhighlightAllRects = (id) => {
    return {
        type: "UNHIGHLIGHT_RECT"
    }
}

export const freezeCanvasObjects = () => {
    return {
        type: "FREEZE_CANVAS_OBJECTS"
    }
}

export const showAnnotations = () => {
    return {
        type: "SHOW_ANNOTATIONS"
    }
}

export const hideAnnotations = () => {
    return {
        type: "HIDE_ANNOTATIONS"
    }
}