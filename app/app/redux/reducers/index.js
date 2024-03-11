/* 
Name: reducers
Action: all reducers
*/

import { combineReducers } from 'redux';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';


export default combineReducers({
    notifications:notificationReducer,
    user: userReducer
});