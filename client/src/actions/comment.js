export const addAnnotation = (annotationName) => {
    return {
        type: 'ADD_ANNOTATION',
        annotationName: annotationName
    }
};

export const addComment = (comment) => {
    return {
        type: 'ADD_COMMENT',
        comment: comment
    }
};