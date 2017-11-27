import { combineReducers } from 'redux';
import AnnotationReducer from './annotation.js';
import RealtimeReducer from './realtime.js';
import CommentsReducer from './comments.js';

const reducers =  combineReducers({
	annotationReducer: AnnotationReducer,
	realtimeReducer: RealtimeReducer,
	commentsReducer: CommentsReducer
});

export default reducers;