import { combineReducers } from 'redux';
import RealtimeReducer from './realtime.js';
import CommentsReducer from './comments.js';
import LectureReducer from './lecture.js';
import UserReducer from './user.js';

const reducers =  combineReducers({
	realtimeReducer: RealtimeReducer,
	commentsReducer: CommentsReducer,
  lectureReducer: LectureReducer,
  userReducer: UserReducer
});

export default reducers;