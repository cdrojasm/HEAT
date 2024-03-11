/* 
Name: index
Action: index of reduxe actions
*/

import { DO_NOTHING, ADD_USERINFO, REMOVE_USERINFO, PUSH_NOTIFICATION, REMOVE_NOTIFICATION, CLEAR_NOTIFICATIONS } from './types.js';

export const addUserInfo = (userInfo) => {
    return {
        type: ADD_USERINFO,
        payload: userInfo
    }
};

export const removeUserInfo = () => {
    return {
        type: REMOVE_USERINFO,
        payload: {}
    }
};

export const pushNotification = (notification_object) => {
    return {
        type: PUSH_NOTIFICATION,
        payload: notification_object
    }
}

export const removeNotification = () => {
    return {
        type: REMOVE_NOTIFICATION
    }
}

export const clearNotifications = () => {
    return {
        type: CLEAR_NOTIFICATIONS
    }
}