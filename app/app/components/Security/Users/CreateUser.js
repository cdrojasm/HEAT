/* 
Name: CreateUser
Action: form to create users
*/

import _ from "lodash";
import { useState, useEffect } from 'react';
import { StyledButton } from '../../Recursive/mui_styled_components';
import { removeUserInfo, pushNotification } from '../../../redux/actions';
import { useDispatch } from 'react-redux';
import {
    getUserRol,
} from '../../../api/creangelAuthAPI'
import { validateExpirationTime } from '../../../source/recursiveSecurity';
import {
    validatorAPIBasicParameters,
} from '../../../source/validators';
import {
    Box,
    Tooltip,
    Typography,
    Divider,
    MenuItem,
    Select,
    FormControl
} from '@mui/material';
//Icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const CreateUser = (props) => {

    /*
    =======================================================
    ===============VARIABLES===============================
    =======================================================
    */

    const verbose = true
    const [userForm, setUserForm] = useState([
        { "id": "username", "title": "Nombre de usuario", "info": "Nombre de referencia del usuario o alias.", "placeholder": "", "value": "", "component": "input", "type": "text" },
        { "id": "email", "title": "Correo electrónico", "info": "Ingresar el correo para el registro del usario local. Con este correo el usuario local realizará el inicio de sesión.", "placeholder": "", "value": "", "component": "input", "type": "text" },
        { "id": "password", "title": "Contraseña", "info": "La constraseña ingresada debe ser alfanumérica y debe contener al menos 8 caracteres.", "placeholder": "", "value": "", "component": "input", "type": "password", "stateView": false },
        { "id": "confirmPassword", "title": "Confirmación de contraseña", "info": "Ingrese la misma contraseña que desea registrar para este usuario.", "placeholder": "", "value": "", "component": "input", "type": "password", "stateView": false },
        { "id": "rolId", "title": "Rol", "info": "Seleccione el rol que se le asignará al usuario en el grupo activo.", "value": "", "component": "select", "showValues": [], "valueId": "" }
    ]);
    const dispatch = useDispatch();

    /*
    =======================================================
    ===============VERBOSE=================================
    =======================================================
    */

    if (verbose) { console.log("ModalCreateUser0", props) }
    if (verbose) { console.log("ModalCreateUser2", userForm) }

    /*
    =======================================================
    ===============USEEFFECTS==============================
    =======================================================
    */

    useEffect(() => {
        handleGetUserRol()
    }, [])

    /*
    ==============================================================
    ===============CONTROL FUNCTIONS==============================
    ==============================================================
    */

    const handleChangeUserForm = (evt, id) => {
        setUserForm((prev) => {
            let deepCopyPrev = _.cloneDeep(prev)
            deepCopyPrev.map((eachOne) => {
                if (eachOne.id === id) {
                    eachOne.value = evt.target.value
                }
            })
            return deepCopyPrev
        })
    }

    const handleViewPassword = (evt, id) => {
        setUserForm((prev) => {
            let deepCopyPrev = _.cloneDeep(prev)
            deepCopyPrev.map((eachOne) => {
                if (verbose) { console.log("ModalCreateUser3a", eachOne) }
                if (verbose) { console.log("ModalCreateUser3b", id) }
                if (eachOne.id === id) {
                    eachOne.stateView = !eachOne.stateView
                }
            })
            return deepCopyPrev
        })
    }

    //=====CREATE USERS

    const handleCreateUsers = async (e) => {
        if (verbose) { console.log("handleCreateUsers0", props.user) }
        /*
        let stateExpiration = validateExpirationTime(props.user.userData.expiration)
        if (verbose) { console.log("handleCreateUsers1", stateExpiration) }
        if (verbose) { console.log("handleCreateUsers2", userForm) }
        if (stateExpiration) {
            let auxUser = {}
            userForm.map((eachField) => {
                auxUser[eachField.id] = eachField.value
            })
            if (verbose) { console.log("handleCreateUsers3", auxUser) }
            let notificationVars = checkerCreateUser(auxUser)
            if (verbose) { console.log("handleCreateUsers2", notificationVars) }
            if (notificationVars["status"] == true) {
                let notif2return = {}
                let requestHeader = {
                    'Authorization': 'Bearer ' + props.user.userID,
                    'Content-Type': 'application/json'
                }
                let auxRol = ""

                eachOne.showValues.map((eachRol) => {
                    if (eachRol.type == evt.target.value) {
                        auxRol = eachRol.id
                    }
                })
                eachOne.valueId = auxRol

                
                let requestBody = {
                    "username": auxUser.username,
                    "email": auxUser.email,
                    "password": auxUser.password,
                    "rol_id": "bbf55feb-27c0-4282-ab61-f4c83af05669",
                    "group_id": "33f491d9-d3b9-44bc-90ec-94dfa1b2b5b0",
                    "organization_id": "7273c264-b39d-4703-b58e-e3ff6031db4c"
                }
                let responseGroupCreation = await createGroup(requestBody, requestHeader);
                const [validResponseGroupCreation, responseContentGroupCreation] = validatorAPIBasicParameters(responseGroupCreation);
                if (verbose) { console.log("indexGroupCreator1", validResponseGroupCreation) }
                if (verbose) { console.log("indexGroupCreator2", responseContentGroupCreation) }
                if (validResponseGroupCreation) {
                    if (responseContentGroupCreation?.status == "ok" || responseContentGroupCreation?.status == true) {
                        notif2return = {
                            "msg": `El grupo "${groupData.id}" ha sido creado exitosamente.`,
                            "status": "ok",
                        }
                        setGroupData(prev => {
                            let deepCopyGroupData = Object.assign({}, prev)
                            deepCopyGroupData["id"] = ""
                            return deepCopyGroupData
                        })
                    } else if (responseContentGroupCreation?.status == "err" && responseContentGroupCreation.msg == "Group already exists") {
                        notif2return = {
                            "msg": `No se pudo final el proceso de creación del grupo "${groupData.id}". El grupo ya existe.`,
                            "status": "err",
                        }
                    } else {
                        notif2return = {
                            "msg": `No se pudo final el proceso de creación del grupo "${groupData.id}". Servicio no disponible.`,
                            "status": "err",
                        }
                    }
                    dispatch(pushNotification(notif2return));
                    props.handleChange()
                } else {
                    let notificationObject = {
                        "msg": `La respuesta del servidor para crear los grupos no es válida`,
                        "status": "err"
                    };
                    dispatch(pushNotification(notificationObject));
                }

                
            } else {
                let auxDispatch = {
                    "msg": notificationVars["message"],
                    "status": "err"
                }
                dispatch(pushNotification(auxDispatch));
            }
        } else {
            if (verbose) { console.log("handleChangeGroups2Logout", stateExpiration) }
            dispatch(removeUserInfo());
        }
        */
    }

    //=====UPDATE DATA OF THE USER

    const handleChangeText = (e, typeData) => {
        setGroupData(prev => {
            let deepCopyGroupData = Object.assign({}, prev)
            deepCopyGroupData[typeData] = e.target.value
            return deepCopyGroupData
        })
    }

    //=====VERIFICATION OF PARAMETERS BEFORE CREATE AN USER

    const checkerCreateUser = (pjUser) => {
        let notif2return = {}
        let alphaNumValidation = /^[A-Za-z\-0-9_@]+$/
        let passwordVal = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])[ a-zA-Z0-9!¡@#$%^&*_+=\[\]{}'"\\|<>\/?.;-]+$/)
        let emailVal = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if (pjUser.username == "" || pjUser.username == undefined) {
            notif2return = {
                "message": "El nombre de usuario no puede ser vacío.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.username.match(alphaNumValidation) == null) {
            notif2return = {
                "message": "Por favor ingrese un nombre de usuario sin caracteres especiales (excepto _@-) ni espacios.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.username.length > 30) {
            notif2return = {
                "message": "El nombre de usuario no puede contener más de 30 caracteres.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.email == "" || pjUser.email == undefined) {
            notif2return = {
                "message": "El correo electrónico no puede ser vacío.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.email.match(emailVal) == null) {
            notif2return = {
                "message": "Ingrese un correo electrónico válido.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.password == "" || pjUser.password == undefined) {
            notif2return = {
                "message": "La contraseña no puede ser vacía.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.password.length < 8) {
            notif2return = {
                "message": "La contraseña ingresada debe contener al menos 8 caracteres.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.password.search(passwordVal) == -1) {
            notif2return = {
                "message": "La contraseña ingresada debe contener al menos una letra y un número.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.password.search(new RegExp(pjUser.username)) != -1) {
            notif2return = {
                "message": "La contraseña ingresada no debe contener el nombre de usuario.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.password.length > 150) {
            notif2return = {
                "message": "La contraseña no puede contener más de 150 caracteres.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.confirmPassword == "" || pjUser.confirmPassword == undefined) {
            notif2return = {
                "message": "No se ha ingresado la confirmación de contraseña.",
                "status": false,
                "openNotification": true
            }
        } else if (pjUser.password != pjUser.confirmPassword) {
            notif2return = {
                "message": "La contrasñea y su confirmación no coinciden.",
                "status": false,
                "openNotification": true
            }
        } else {
            notif2return = {
                "message": "El usuario ha sido creado exitosamente.",
                "status": true,
                "openNotification": false
            }
        }
        return notif2return
    }

    const handleGetUserRol = async () => {
        if (verbose) { console.log("handleGetUserRol0", props.user) }
        let stateExpiration = validateExpirationTime(props.user.userData.expiration)
        if (verbose) { console.log("handleGetUserRol1", stateExpiration) }
        if (verbose) { console.log("handleGetUserRol2", userForm) }
        if (stateExpiration) {
            let requestHeader = {
                'Authorization': 'Bearer ' + props.user.userID,
                'Content-Type': 'application/json'
            }
            let requestBody = {
                "group_id": props.group
            }
            let responseGroupRol = await getUserRol(requestBody, requestHeader);
            const [validResponseGroupRol, responseContentGroupRol] = validatorAPIBasicParameters(responseGroupRol);
            if (verbose) { console.log("indexGroupRol1", validResponseGroupRol) }
            if (verbose) { console.log("indexGroupRol2", responseContentGroupRol) }
            if (validResponseGroupRol) {
                if (responseContentGroupRol?.status == "ok" || responseContentGroupRol?.status == true) {
                    setUserForm((prev) => {
                        let deepCopyUserForm = _.cloneDeep(prev)
                        deepCopyUserForm.map((eachOne) => {
                            if (eachOne.id == "rolId") {
                                eachOne.showValues = responseContentGroupRol.data
                            }
                        })
                        return deepCopyUserForm
                    })
                } else {
                    let notif2return = {
                        "msg": `No se pudo finalizar el proceso de listar roles del usuario en el grupo seleccionado. Servicio no disponible.`,
                        "status": "err",
                    }
                    dispatch(pushNotification(notif2return));
                }
            } else {
                let notificationObject = {
                    "msg": `La respuesta del servidor para listar los roles del usuario por el grupo seleccionado no es válida`,
                    "status": "err"
                };
                dispatch(pushNotification(notificationObject));
            }
        } else {
            if (verbose) { console.log("handleChangeGroups2Logout", stateExpiration) }
            dispatch(removeUserInfo());
        }
    }

    /*
    ==============================================================
    ===============RENDER=========================================
    ==============================================================
    */

    return (
        <Box className="pad_35">
            <Typography variant="h6" noWrap className='color_body_titles' component="div" sx={{ fontWeight: "500", marginBottom: "10px" }}>
                <span>{"Creador de usuarios"}</span>
            </Typography>
            <Divider />
            <Box type="div" className="mt_40 ml_20 mr_20 mb_20 center_vert gap_10px" key={"boxClustersCreator"}>
                {userForm.map((eachOne, ind1) => {
                    return (
                        <Box type="div" className="ml_20 mr_20 center_vert gap_10px fullWidht bg_white" key={"boxForm_" + ind1}>
                            <Typography noWrap className='color_body_titles left_horz fullWidht' component="div" sx={{ fontWeight: "500", fontSize: "15px" }}>
                                <span>{eachOne.title}</span>
                                <Tooltip title={eachOne.info} placement="right">
                                    <InfoOutlinedIcon sx={{ fontSize: "15px", paddingLeft: "2px" }} />
                                </Tooltip>
                            </Typography>
                            <Box key={"optionsClusters" + ind1} className="fullWidht">
                                <Box className="center_vert">
                                    <Box className="bg_white_op_236 brdr_rad_3px border_none fullWidht">
                                        {eachOne.component == "input" && eachOne.type == "text" &&
                                            <input
                                                className="pad_10 font_16px border_none outline_none bg_white_op_236 color_body_text w_95"
                                                type={eachOne.type}
                                                autoComplete="off"
                                                onChange={(e) => { handleChangeUserForm(e, eachOne.id) }}
                                                placeholder={eachOne.placeholder}
                                                value={eachOne.value}
                                            />}
                                        {eachOne.component == "input" && eachOne.type == "password" &&
                                            <Box className="distributed_horz">
                                                <input
                                                    className="pad_10 font_16px border_none outline_none bg_white_op_236 color_body_text w_95"
                                                    type={eachOne.stateView == false ? eachOne.type : "text"}
                                                    onChange={(e) => { handleChangeUserForm(e, eachOne.id) }}
                                                    placeholder={eachOne.placeholder}
                                                    value={eachOne.value}
                                                    autoComplete="new-password"
                                                    onPaste={() => { return false }}
                                                />
                                                <Box
                                                    className="center_vert"
                                                >
                                                    {eachOne.stateView == false && <VisibilityRoundedIcon fontSize="small" className='bg_icons_color' onClick={(e) => { handleViewPassword(e, eachOne.id) }} />}
                                                    {eachOne.stateView == true && <VisibilityOffRoundedIcon fontSize="small" className='bg_icons_color' onClick={(e) => { handleViewPassword(e, eachOne.id) }} />}
                                                </Box>
                                            </Box>
                                        }
                                    </Box>
                                    {eachOne.component == "select" &&
                                        <Box className="fullWidht">
                                            <FormControl className="w_50">
                                                <Select
                                                    id="toCreateUserSelector"
                                                    sx={{ width: "100%", color: "#425568", maxHeight: "40px" }}
                                                    value={eachOne.value}
                                                    displayEmpty
                                                    onChange={(e) => { handleChangeUserForm(e, eachOne.id) }}
                                                    renderValue={(selected) => {
                                                        if (selected == undefined || selected == "") {
                                                            return "Seleccione un rol";
                                                        } else {
                                                            return selected;
                                                        }
                                                    }}
                                                >
                                                    {eachOne.showValues.length != 0 && eachOne.showValues.map((rol) => {
                                                        return (
                                                            <MenuItem value={rol.type} key={`group_element_name_${rol.id}`}>{rol.type}</MenuItem>
                                                        )
                                                    }
                                                    )}
                                                </Select>
                                            </FormControl >
                                        </Box>
                                    }
                                </Box>
                            </Box >
                        </Box >
                    )
                })}
            </Box >
            <Box className="center_horz gap_10_undetermine">
                <StyledButton
                    variant="contained"
                    onClick={() => { props.handleCloseAll("CreateUser") }}
                >
                    <Box component="span">
                        {"Cancelar"}
                    </Box>
                </StyledButton>
                <StyledButton
                    variant="contained"
                    onClick={(e) => { handleCreateUsers(e) }}
                >
                    <Box component="span">
                        {"Registrar"}
                    </Box>
                </StyledButton>
            </Box>
        </Box>
    )
}

export default CreateUser;