import { combineReducers } from 'redux';
import CommentsReducer from './comment.js';

const allReducers =  combineReducers({
	comments: CommentsReducer,
});

export default allReducers;