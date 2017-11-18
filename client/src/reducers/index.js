import { combineReducers } from 'redux';
import AnnotationReducer from './annotation.js';
import RealtimeReducer from './realtime.js';

const reducers =  combineReducers({
	annotationReducer: AnnotationReducer,
	realtimeReducer: RealtimeReducer
});

export default reducers;