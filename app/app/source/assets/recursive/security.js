/* 
Name: security
Action: functions to validate security of all the React Project
*/

export const checkLevelAccess = (userInfo) => {
    let auxLevelAccessArray = []
    userInfo[0].userInfo.permissions.map((eachPermission) => {
        auxLevelAccessArray.push(eachPermission.rol.value)
    })
    let valueMaxLevelAccess = Math.max(...auxLevelAccessArray)
    let indexMaxLevelAccess = auxLevelAccessArray.indexOf(valueMaxLevelAccess)
    return indexMaxLevelAccess;
};

export const getUserGroup = (userInfo) => {
    userInfo = userInfo[0].userInfo.permissions.replace(/\[|\]|'|\s/g, "");
    userInfo = userInfo.split(',');
    return userInfo[0];
};