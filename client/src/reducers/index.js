import { combineReducers } from 'redux';
import RealtimeReducer from './realtime.js';
import CommentsReducer from './comments.js';

const reducers =  combineReducers({
	realtimeReducer: RealtimeReducer,
	commentsReducer: CommentsReducer
});

export default reducers;