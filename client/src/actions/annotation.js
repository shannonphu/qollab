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

export const submitAnnotation = (annotation) => {
    return {
        type: 'SUBMITTED_ANNOTATION',
        annotation: annotation
    }
};

export const removeAnnotation = (annotation) => {
    return {
        type: 'REMOVE_ANNOTATION',
        annotation: annotation
    }
};

export const setNeutralAnnotationState = () => {
    return {
        type: 'SET_NEUTRAL_ANNOTATION_STATE'
    }
};