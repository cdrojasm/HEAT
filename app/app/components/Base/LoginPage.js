/* 
Name: LoginPage
Action: LoginPage
*/

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { addUserInfo, pushNotification } from '../../redux/actions';
import { StyledButton } from '../Recursive/mui_styled_components';
import { connect, useDispatch } from 'react-redux';
import Router from "next/router";
import { Divider, Typography, Box } from '@mui/material';
import { getUserLogin } from '../../api/creangelAuthAPI'
import { validatorAPIBasicParameters } from '../../source/validators';
import NotificatorLogin from '../Recursive/NotificatorLogin';
import { jwtDecode } from "jwt-decode";
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';


const LoginPage = (props) => {
    const staticPrefix = process.env.staticPrefix;
    const [userInput, setUserInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [errorUser, setErrorUser] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [tokenAccess, setTokenAccess] = useState("");
    const [viewPassword, setViewPassword] = useState(false)
    const dispatch = useDispatch();
    const verbose = false;

    useEffect(() => {
        if (tokenAccess != "") {
            let tokenDecoded = jwtDecode(tokenAccess);
            if (verbose) { console.log("tokenDecoded", tokenDecoded) }
            dispatch(addUserInfo({
                "userID": tokenAccess,
                "userData": tokenDecoded
            }));
            Router.push(props.forward);
        }
    }, [tokenAccess]);

    const handleChangeUserInput = (event) => {
        setUserInput(event.target.value);
        if (event.target.value != "") {
            setErrorUser("")
        }
    }

    const handleChangePasswordInput = (event) => {
        setPasswordInput(event.target.value);
        if (event.target.value != "") {
            setErrorPassword("")
        }
    }

    const handleClenaAll = () => {
        setUserInput("")
        setPasswordInput("")
        setErrorUser("")
        setErrorPassword("")
    }

    const handleLogin = async (e, userIn, passwordIn) => {
        let validatorUser = checkerUserInput(userIn)
        let validatorPassword = checkerPasswordInput(passwordIn)
        if (validatorUser?.status == "ok" && validatorPassword?.status == "ok") {
            let objDataLogin = {
                "password": passwordIn,
                "username": userIn
            }
            let responseLogin = await getUserLogin(objDataLogin);
            const [validLogin, responseLoginData] = validatorAPIBasicParameters(responseLogin);
            if (verbose) { console.log("loginData1", validLogin) }
            if (validLogin != true) {
                let notificationObject = {
                    "msg": `Servicio no disponible, intente más tarde.`,
                    "status": "err"
                };
                dispatch(pushNotification(notificationObject));
            } else {
                if (verbose) { console.log("loginData2", responseLoginData) }
                let responseStatus = responseLoginData["status"];
                let responseMsg = responseLoginData["msg"];
                let userData = responseLoginData["data"];
                if (responseStatus == "err") {
                    let notificationObject = {
                        "msg": `Provided user or password not found.`,
                        "status": "err"
                    };
                    dispatch(pushNotification(notificationObject));
                } else if (responseStatus == "ok") {
                    setTokenAccess(userData.access_token)
                } else {
                    let notificationObject = {
                        "msg": `Service not available.`,
                        "status": "err"
                    };
                    dispatch(pushNotification(notificationObject));
                }
            }
        }
    }

    const checkerUserInput = (passwordIn) => {
        let notif2return = {}
        if (passwordIn == "" || passwordIn == undefined) {
            notif2return = {
                "msg": "El campo usuario está vacío.",
                "status": "err",
            }
            setErrorUser(notif2return.msg);
        } else {
            notif2return = {
                "msg": "El campo usuario está ok",
                "status": "ok",
            }
            setErrorUser("")
        }
        return notif2return
    }

    const checkerPasswordInput = (userInput) => {
        let notif2return = {}
        if (userInput == "" || userInput == undefined) {
            notif2return = {
                "msg": "El campo contraseña está vacío.",
                "status": "err",
            }
            setErrorPassword("El campo contraseña está vacío.")
        } else {
            notif2return = {
                "msg": "El campo contraseña está ok",
                "status": "ok",
            }
            setErrorPassword("")
        }
        return notif2return
    }

    const handleViewPassword = () => {
        setViewPassword(prev => {
            let deepCopyPrev = _.cloneDeep(prev)
            return !deepCopyPrev
        })
    }

    return (
        <>
            <Box id="HEAT_app_container">
                <Box className="center_vert">
                    <Box className='fullWidth center_horz mt_20'>
                        <Box className='pad_t_40 pad_b_40 pad_l_60 pad_r_60 w_350px box_shadow_aws bg_white mt_10-vh'>
                            <Typography variant="h5" className="mb_15" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                LogIn
                            </Typography>
                            <Divider className="mt_10" />
                            <Typography variant="h6" component="div" style={{ fontSize: "18px", marginTop: "20px" }}>
                                User
                            </Typography>
                            <Box className="fullWidht bg_white_op_f2 brdr_rad_3px border_none pad_b_10 pad_t_10">
                                <input
                                    className="pad_0 font_16px border_none outline_none bg_white_op_f2 color_body_text fullWidht"
                                    type="text"
                                    onChange={(e) => { handleChangeUserInput(e) }}
                                    value={userInput}
                                />
                            </Box>
                            {errorUser != "" &&
                                <Typography component="div" style={{ fontSize: "12px", textAlign: "end" }}>
                                    <a style={{ color: "#a41a1a" }}>{errorUser}</a>
                                </Typography>
                            }
                            <Typography variant="h5" component="div" style={{ fontSize: "18px", marginTop: "20px" }}>
                                Password
                            </Typography>
                            <Box className="fullWidht center_vert">
                                <Box className="fullWidht bg_white_op_f2 brdr_rad_3px border_none pad_b_10 pad_t_10 distributed_horz">
                                    <input
                                        id="inputLogin"
                                        style={{ fontSize: "16px !important" }}
                                        className="pad_0 font_16px border_none outline_none bg_white_op_f2 color_body_text fullWidht"
                                        type={viewPassword == true ? "text" : "password"}
                                        onChange={(e) => { handleChangePasswordInput(e) }}
                                        value={passwordInput}
                                    />
                                    <Box
                                        className="center_vert"
                                    >
                                        {viewPassword == false && <VisibilityRoundedIcon fontSize="small" className='bg_icons_color' onClick={() => { handleViewPassword() }} />}
                                        {viewPassword == true && <VisibilityOffRoundedIcon fontSize="small" className='bg_icons_color' onClick={() => { handleViewPassword() }} />}
                                    </Box>
                                </Box>
                            </Box>
                            {errorPassword != "" &&
                                <Typography component="div" style={{ fontSize: "12px", textAlign: "end" }}>
                                    <a style={{ color: "#a41a1a" }}>{errorPassword}</a>
                                </Typography>
                            }
                            <Box className="fullWidht center_horz">
                                <NotificatorLogin />
                            </Box>
                            <Box className="center_horz gap_10_undetermine pad_t_30">
                                <StyledButton
                                    variant="contained"
                                    onClick={() => { handleClenaAll() }}
                                >
                                    <Box component="span">
                                        {"Limpiar"}
                                    </Box>
                                </StyledButton>
                                <StyledButton
                                    variant="contained"
                                    onClick={(e) => { handleLogin(e, userInput, passwordInput) }}
                                >
                                    <Box component="span">
                                        {"Ingresar"}
                                    </Box>
                                </StyledButton>
                            </Box>
                            <Box className="pad_t_20">
                                <Box className="center_horz">
                                    <img width={"45px"} src={staticPrefix + "/img/logocreangel.png"} />
                                </Box>
                                <Box className="center_horz">
                                    <p className='font_roboto'>©2024 Creangel</p>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

const mapStateToProps = state => {
    return {
        organization: state.organization,
    };
};

export default connect(mapStateToProps, null)(LoginPage);