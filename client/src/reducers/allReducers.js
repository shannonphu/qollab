import { combineReducers } from 'redux';
import CommentsReducer from './CommentsReducer.js';

const allReducers =  combineReducers({
	comments: CommentsReducer,
});

export default allReducers;