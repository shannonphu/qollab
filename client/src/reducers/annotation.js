export const ANNOTATION_STATE = {
	EDITING: 'EDITING',
	SUBMITING: 'SUBMITING',
	REMOVING: 'REMOVING',
	NONE: 'NONE'
};

let AnnotationReducer = (state = {
	activeAnnotation: null,
	annotationState: ANNOTATION_STATE.NONE
}, action) => {
	switch (action.type) {
		case 'ADD_ANNOTATION':
			return {
				...state,
				annotationState: ANNOTATION_STATE.EDITING,
			};
		case 'STORE_ANNOTATION':
			return {
				...state,
				activeAnnotation: action.annotation
			};
		case 'SUBMITTED_ANNOTATION':
			return {
				...state,
				annotationState: ANNOTATION_STATE.SUBMITING
			}
		case 'REMOVE_ANNOTATION':
			return {
				...state,
				annotationState: ANNOTATION_STATE.REMOVING
			};
		case 'SET_NEUTRAL_ANNOTATION_STATE':
			return {
				...state,
				activeAnnotation: null,
				annotationState: ANNOTATION_STATE.NONE
			}
		default:
			return state;
	}
}

export default AnnotationReducer;