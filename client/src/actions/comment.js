export const addAnnotation = () => {
    return {
        type: 'ADD_ANNOTATION'
    }
};

export const storeAnnotationId = (annotationId) => {
    return {
        type: 'STORE_ANNOTATION_ID',
        annotationId: annotationId
    }
};

export const removeAnnotation = (annotationId) => {
    return {
        type: 'REMOVE_ANNOTATION',
        annotationId: annotationId
    }
};

export const addComment = (comment) => {
    return {
        type: 'ADD_COMMENT',
        comment: comment
    }
};

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