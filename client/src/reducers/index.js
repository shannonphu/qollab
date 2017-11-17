import { combineReducers } from 'redux';
import CommentsReducer from './comment.js';
import CanvasReducer from './canvas.js';

const reducers =  combineReducers({
	commentsReducer: CommentsReducer,
	canvasReducer: CanvasReducer,
});

export default reducers;