var CanvasReducer = (state = {
	lectureCode: null,
	canvasJSON: null
}, action) => {
	switch (action.type) {
		case 'STORE_JOIN_CODE':
			return {
				...state,
				lectureCode: action.joinCode
			}
		case 'LOAD_CANVAS_FROM_JSON':
			// Only update the stored canvasJSON if the lecture code is for this lecture
			let joinCode = action.canvasJSON["joinCode"];
			if (state.lectureCode !== joinCode) {
				return state;
			}

			let canvasJSON = action.canvasJSON["data"];			
			return {
				...state,
				joinCode: joinCode,
				canvasJSON: canvasJSON
			}
		default:
			return state;
	}
}

export default CanvasReducer;