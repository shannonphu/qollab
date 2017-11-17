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