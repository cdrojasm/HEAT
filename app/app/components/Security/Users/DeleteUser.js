/* 
Nombre: DeleteUser
Action:Delete an user
*/

import _ from "lodash";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import { StyledButton, colorAPP } from '../../Recursive/mui_styled_components';
import { pushNotification, removeUserInfo } from '../../../redux/actions';
import {
    validatorAPIBasicParameters,
} from '../../../source/validators';
import {
    Box,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { validateExpirationTime } from '../../../source/recursiveSecurity';


const DeleteUser = (props) => {

    /*
    =======================================================
    ===============VARIABLES===============================
    =======================================================
    */

    const verbose = true
    const [userName, setUserName] = useState();
    const [userIndex, setUserIndex] = useState();
    const dispatch = useDispatch();

    /*
    =======================================================
    ===============VERBOSE=================================
    =======================================================
    */

    if (verbose) { console.log("ModalDeleteUser0", props) }
    if (verbose) { console.log("ModalDeleteUser1", userName) }
    if (verbose) { console.log("ModalDeleteUser2", userIndex) }

    /*
    =======================================================
    ===============USEEFFECTS==============================
    =======================================================
    */

    useEffect(() => {
        props.displayAction.map((eachOption) => {
            if (eachOption.id == "DeleteUser") {
                if (eachOption.displayOn == true) {
                    if (eachOption?.rowData != undefined && Object.keys(eachOption.rowData).length > 0) {
                        setUserName(eachOption.rowData?.username)
                        setUserIndex(eachOption.rowData?.id)
                    } else {
                        dispatch(pushNotification({ "msg": "Servicio no disponible", "status": "err" }));
                    }
                }
            }
        })
    }, [props.displayAction])

    /*
    ==============================================================
    ===============CONTROL FUNCTIONS==============================
    ==============================================================
    */

    const handleDeleteUser = async () => {
        if (userIndex !== undefined) {
            if (verbose) { console.log("handleCreateUsers0", props.user) }
            let stateExpiration = validateExpirationTime(props.user.userData.expiration)
            if (verbose) { console.log("handleCreateUsers1", stateExpiration) }
            if (stateExpiration) {
                let requestHeader = {
                    'Authorization': 'Bearer ' + props.user.userID,
                    'Content-Type': 'application/json'
                }
                let requestBody = {
                    "user_id": userIndex,
                    "group_id": props.group
                }
                let responseRequestDeleteUser = await deleteUser(requestBody, requestHeader);
                let [validResponse__, validatedResponse] = validatorAPIBasicParameters(responseRequestDeleteUser);
                if (validResponse__) {
                    let respStatus__ = validatedResponse["status"];
                    if (respStatus__ === "ok") {
                        let notificationObject = {
                            "msg": `El usario "${userName}" fue eliminado con éxito.`,
                            "status": "ok"
                        };
                        dispatch(pushNotification(notificationObject))
                        props.handleChange()
                        props.handleCloseAll("DeleteUser")
                    } else {
                        let notificationObject = {
                            "msg": `No fue posible eliminar el usurario ${userName}.`,
                            "status": "err"
                        };
                        dispatch(pushNotification(notificationObject))
                    }
                } else {
                    dispatch(pushNotification({ "msg": "Response could not be parsed due incompatibilities", "status": "err" }))
                }
            } else {
                if (verbose) { console.log("handleChangeUsers2Logout", stateExpiration) }
                dispatch(removeUserInfo());
            }
        } else {
            dispatch(pushNotification({ "msg": "User info doesn't have id key delete", "status": "err" }))
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
                <span>{"Eliminación de usuarios"}</span>
            </Typography>
            <Divider />
            <Box className="pad_20">
                {
                    <Box className="pad_40 bg_white_op_245">
                        <Typography component="div" className="bg_body_titles center_horz_2" sx={{ textAlign: "center", fontWeight: "500", marginBottom: "10px", fontSize: "20px" }}>
                            <WarningRoundedIcon fontSize="medium" className="pad_r_5 center_vert" sx={{ color: colorAPP["bg_icons_warning"] }} />
                            <span>{"Advertencia"}</span>
                        </Typography>
                        <Typography component="div" sx={{ textAlign: "justify", fontWeight: "500", marginBottom: "10px", fontSize: "16px" }}>
                            <span>{"La acción que desea realizar no se puede revertir. Confirmar esta acción implica la eliminación de todas las relaciones asociadas al usuario "}</span>
                            <span className="font_w_600">{userName}</span>
                            <span>{"."}</span>
                        </Typography>
                        <Typography component="div" sx={{ textAlign: "center", fontWeight: "500", marginBottom: "10px", fontSize: "16px" }}>
                            <span>{"Presione "}</span>
                            <span className="font_w_600">{"'Confirmar' "}</span>
                            <span>{"para continuar, de lo contrario presione "}</span>
                            <span className="font_w_600">{"'Cancelar'"}</span>
                            <span>{"."}</span>
                        </Typography>
                    </Box>
                }
            </Box>
            <Box className="center_horz gap_10_undetermine">
                <StyledButton
                    variant="contained"
                    onClick={() => { props.handleCloseAll("DeleteUser") }}
                >
                    <Box component="span">
                        {"Cancelar"}
                    </Box>
                </StyledButton>
                <StyledButton
                    variant="contained"
                    onClick={handleDeleteUser}
                >
                    <Box component="span">
                        {"Continuar"}
                    </Box>
                </StyledButton>
            </Box>
        </Box>
    )
}

export default DeleteUser;
