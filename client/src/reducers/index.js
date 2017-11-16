import { combineReducers } from 'redux';
import CommentsReducer from './comment.js';

const reducers =  combineReducers({
	commentsReducer: CommentsReducer,
});

export default reducers;