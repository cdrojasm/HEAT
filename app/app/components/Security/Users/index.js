/*
Name: index
Action: Users index
Props: map2props
Return: main component of users
*/

import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { validateExpirationTime } from '../../../source/recursiveSecurity';
import UsersAdmin from './UsersAdmin';
import CreateUser from './CreateUser';
import DeleteUser from './DeleteUser';
import Box from '@mui/material/Box';
import { removeUserInfo, pushNotification} from '../../../redux/actions';
import {
    validatorAPIBasicParameters,
} from '../../../source/validators';


const Users = (props) => {

    /*
    =======================================================
    ===============VARIABLES===============================
    =======================================================
    */

    const [userName, updateUserName] = useState();
    const [displayAction, setDisplayAction] = useState([
        {
            id: "ListUsers",
            displayOn: false,
        },
        {
            id: "CreateUser",
            displayOn: false,
        },
        {
            id: "EditUser",
            displayOn: false,
            rowData: "",
        },
        {
            id: "DeleteUser",
            displayOn: false,
            rowData: ""
        },
    ])
    const [usersFound, setUsersFound] = useState([])
    const [isLoadingUsersList, setIsLoadingUsersList] = useState(true);
    const dispatch = useDispatch();
    const verbose = true

    /*
    =======================================================
    ===============VERBOSE=================================
    =======================================================
    */

    if (verbose) { console.log("homeUser1", props) }
    if (verbose) { console.log("homeUser2", userName) }
    if (verbose) { console.log("homeUser3", displayAction) }
    if (verbose) { console.log("homeUser4", usersFound) }

    /*
    =======================================================
    ===============USEEFFECTS==============================
    =======================================================
    */

    //=====CARGAR VARIABLES INICIALES

    useEffect(() => {
        handleChangeUsersList()
    }, [props.group[0].id])

    /*
    ==============================================================
    ===============CONTROL FUNCTIONS==============================
    ==============================================================
    */

    //=====UPDATE USERS LIST

    const handleChangeUsersList = async () => {
        if (verbose) { console.log("handleChangeUsers0", props.user[0]) }
        let stateExpiration = validateExpirationTime(props.user[0].userData.expiration)
        if (verbose) { console.log("handleChangeUsers1", stateExpiration) }
        if (stateExpiration) {
            let requestHeader = {
                'Authorization': 'Bearer ' + props.user[0].userID,
                'Content-Type': 'application/json'
            }
            let requestBody = {
                "group_id": props.group[0].id
            }        
            const responseUsersList = await getUsersList(requestBody, requestHeader);
            if (verbose) { console.log("handleChangeUsers2", responseUsersList) }
            const [validResponseUsersList, responseContentUsersList] = validatorAPIBasicParameters(responseUsersList);
            if (verbose) { console.log("handleChangeUsers3", validResponseUsersList) }
            if (verbose) { console.log("handleChangeUsers4", responseContentUsersList) }
            if (validResponseUsersList) {
                if (responseContentUsersList.status === "ok" || responseContentUsersList.status === true) {
                    setUsersFound(responseContentUsersList.data)
                    setIsLoadingUsersList(false)
                } else {
                    let notificationObject = {
                        "msg": `Ocurrio un error para listar los usuarios -> ${responseContentUsersList.msg}`,
                        "status": "err"
                    };
                    dispatch(pushNotification(notificationObject));
                    setUsersFound([])
                }
            } else {
                let notificationObject = {
                    "msg": `La respuesta del servidor para enlistar los usuarios no es válida`,
                    "status": "err"
                };
                dispatch(pushNotification(notificationObject));
                setUsersFound([])
                setIsLoadingUsersList(true)
            }
        } else {
            if (verbose) { console.log("handleChangeUsers5", stateExpiration) }
            dispatch(removeUserInfo());
        }
    }

    const handleDisplayAction = (e, id, rowData) => {
        let auxDisplayAction = Object.assign([], displayAction)
        auxDisplayAction.map((eachD) => {
            if (eachD.id == id) {
                eachD.displayOn = true
                if (eachD?.rowData != undefined) {
                    eachD.rowData = rowData
                }
            } else {
                eachD.displayOn = false
                if (eachD?.rowData != undefined) {
                    eachD.rowData = {}
                }
            }
        })
        setDisplayAction(auxDisplayAction)
    }

    //=====close all

    const handleCloseAll = (id) => {
        let auxDisplayAction = Object.assign([], displayAction)
        auxDisplayAction.map((eachD) => {
            if (eachD.id == id) {
                eachD.displayOn = false
                if (eachD?.rowData != undefined) {
                    eachD.rowData = {}
                }
                if (eachD?.rowIndex != undefined) {
                    eachD.rowIndex = ""
                }
            }
        })
        setDisplayAction(auxDisplayAction)
    }

    /*
    ==============================================================
    ===============RENDER=========================================
    ==============================================================
    */

    return (
        <div className='fullWidht distributed_horz_strech flex_wrap gap_2_undetermine'>
            <div className='w_50 bg_white box_shadow_aws'>
                <UsersAdmin
                    displayAction={displayAction}
                    usersFound={usersFound}
                    handleChange={handleChangeUsersList}
                    isLoadingList={isLoadingUsersList}
                    handleDisplayAction={handleDisplayAction}
                />
            </div>
            {displayAction.map((eachAction, indexAction) => {
                if (eachAction.displayOn == true) {
                    if (eachAction.id == "CreateUser") {
                        return (
                            <Box key={eachAction.id} className='w_48 bg_white box_shadow_aws'>
                                <CreateUser
                                    setDisplayAction={setDisplayAction}
                                    handleChange={handleChangeUsersList}
                                    user={props.user[0]}
                                    group={props.group[0].id}
                                    handleCloseAll={handleCloseAll}
                                />
                            </Box>
                        )
                    } else if (eachAction.id == "EditUser") {
                        return (
                            <Box key={eachAction.id} className='w_48 bg_white box_shadow_aws'>
                                <EditUser
                                    userName={userName}
                                    handleChange={handleChangeGroupsList}
                                    displayAction={displayAction}
                                    setDisplayAction={setDisplayAction}
                                />
                            </Box>
                        )
                    } else if (eachAction.id == "DeleteUser") {
                        return (
                            <Box key={eachAction.id} className='w_48 bg_white box_shadow_aws'>
                                <DeleteUser
                                    handleChange={handleChangeUsersList}
                                    displayAction={displayAction}
                                    setDisplayAction={setDisplayAction}
                                    handleCloseAll={handleCloseAll}
                                    user={props.user[0]}
                                    group={props.group[0].id}
                                />
                            </Box>
                        )
                    }
                } else {
                    return ""
                }
            })
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        user: state.user,
        group: state.group,
    };
};

export default connect(mapStateToProps, null)(Users);