import { combineReducers } from 'redux';
import CommentsReducer from './comment.js';

const reducers =  combineReducers({
	comments: CommentsReducer,
});

export default reducers;