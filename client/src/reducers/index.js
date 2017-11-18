import { combineReducers } from 'redux';
import CommentsReducer from './comment.js';
import RealtimeReducer from './realtime.js';

const reducers =  combineReducers({
	commentsReducer: CommentsReducer,
	realtimeReducer: RealtimeReducer
});

export default reducers;