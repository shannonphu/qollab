export const addAnnotation = () => {
    return {
        type: 'ADD_ANNOTATION'
    }
};

export const storeAnnotation = (annotation) => {
    return {
        type: 'STORE_ANNOTATION',
        annotation: annotation
    }
};

export const removeAnnotation = (annotation) => {
    return {
        type: 'REMOVE_ANNOTATION',
        annotation: annotation
    }
};