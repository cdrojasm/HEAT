/* 
Name: MainBar
Action: MainBar
*/

import { removeUserInfo, addGroup, pushNotification } from '../../redux/actions';
import { styled } from '@mui/material/styles';
import { connect, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { StyledDrawerHeader, colorAPP, StyledChip, StyledAvatar, StyledSwitch } from '../Recursive/mui_styled_components';
import MuiDrawer from '@mui/material/Drawer';
import {
    validateExpirationTime
}
    from '../../source/recursiveSecurity';
import {
    validatorAPIBasicParameters,
} from '../../source/validators';
//=====Icons
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import DomainRoundedIcon from '@mui/icons-material/DomainRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import DatasetRoundedIcon from '@mui/icons-material/DatasetRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';
import PolylineRoundedIcon from '@mui/icons-material/PolylineRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import PlagiarismOutlinedIcon from '@mui/icons-material/PlagiarismOutlined';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';


const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

function MainBar(props) {

    /*
    =======================================================
    ===============VARIABLES===============================
    =======================================================
    */

    const [openUser, setOpenUser] = useState(false);
    const [openGroups, setOpenGroups] = useState(false);
    const [groupsFound, setGroupsFound] = useState([]);
    const [stateDisplayOptions, setStateDisplayOptions] = useState({});
    const dispatch = useDispatch();
    const lateralBarOptions = [
        {
            id: "security", title: 'Seguridad', icon: <BadgeRoundedIcon className='color_body_text' sx={{ fontSize: "30px" }} />, subOptions: [
                { title: 'Grupos', icon: <GroupsRoundedIcon />, handleFunction: "security/groups" },
                { title: 'Usuarios', icon: <PersonRoundedIcon />, handleFunction: "security/users" },
                { title: 'Directorio activo', icon: <FolderSharedRoundedIcon />, handleFunction: "security/activeDirectory" },
            ]
        },
        {
            id: "infrastructure", title: 'Infraestructura', alias: 'Estructura', icon: <DomainRoundedIcon className='color_body_text' sx={{ fontSize: "30px" }} />, subOptions: [
                { title: 'Instancias', icon: <AppRegistrationRoundedIcon />, handleFunction: "infrastructure/instances" },
                { title: 'Clusters', icon: <PolylineRoundedIcon />, handleFunction: "infrastructure/clusters" },
            ]
        },
        {
            id: "tasks", title: 'Tareas', icon: <ScheduleRoundedIcon className='color_body_text' sx={{ fontSize: "30px" }} />, subOptions: [
                { title: 'Creación', icon: <AddTaskRoundedIcon />, handleFunction: "tasks/add" },
                { title: 'Configuración', icon: <EngineeringRoundedIcon />, handleFunction: "tasks/setup" },
            ]
        },
        {
            id: "files", title: 'Archivos', icon: <LibraryBooksRoundedIcon className='color_body_text' sx={{ fontSize: "30px" }} />, subOptions: [
                { title: 'Lista', icon: <ListRoundedIcon />, handleFunction: "files/list" },
                { title: 'Carga', icon: <FileUploadRoundedIcon />, handleFunction: "files/upload" },
            ]
        },
        {
            id: "dataSources", title: 'Fuentes de datos', alias: 'Fuentes', icon: <StorageRoundedIcon className='color_body_text' sx={{ fontSize: "30px" }} />, subOptions: [
                { title: 'Lista', icon: <ListRoundedIcon />, handleFunction: "dataSources/list" },
                { title: 'Configuración', icon: <FileUploadRoundedIcon />, handleFunction: "dataSources/upload" },
            ]
        },
        {
            id: "queries", title: 'Consultas', icon: <ManageSearchRoundedIcon className='color_body_text' sx={{ fontSize: "30px" }} />, subOptions: [
                { title: 'SQL', icon: <PlagiarismOutlinedIcon />, handleFunction: "queries/sql" },
                { title: 'Lenguaje natural', icon: <QuestionAnswerRoundedIcon />, handleFunction: "queries/llm" },
            ]
        },
        { id: "catalog", title: 'Catálogo', icon: <DatasetRoundedIcon className='color_body_text' sx={{ fontSize: "30px" }} />, subOptions: [], handleFunction: "catalog" }
    ]
    const userOptions = [
        {
            id: "license", title: 'Licencia', icon: <StarBorder className='color_body_text' fontSize="small" />, handleFunction: "about"
        },
        {
            id: "logout", title: 'Cerrar sesión', icon: <Logout className='color_body_text' fontSize="small" />, handleFunction: "handleLogout"
        }
    ]
    const staticPrefix = process.env.staticPrefix;
    const anchorEl = useRef();
    const router = useRouter();
    const openedMixin = (theme) => ({
        width: props.drawerwidthmax,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: props.drawerwidthmin,
    });
    const [groupsOptions, setGroupsOptions] = useState([])
    const verbose = false;

    /*
    =======================================================
    ===============VERBOSE=================================
    =======================================================
    */

    if (verbose) { console.log("LateralBar ElanchorEl", anchorEl) }
    if (verbose) { console.log("LateralBar props", props) }
    if (verbose) { console.log("LateralBar stateOpne", stateDisplayOptions) }
    if (verbose) { console.log("LateralBar colorApp", colorAPP) }
    if (verbose) { console.log("LateralBar groupsOptions", groupsOptions) }
    if (verbose) { console.log("LateralBar groupsfound", groupsFound) }

    /*
    =======================================================
    ===============USEEFFECT===============================
    =======================================================
    */

    useEffect(() => {
        let auxDisplayOptions = Object.assign([], lateralBarOptions);
        let auxOpenDisplayOptions = {}
        auxDisplayOptions.map((eachOp, index) => {
            if (eachOp.subOptions.length != 0) {
                auxOpenDisplayOptions[eachOp.id] = false
            } else {
                auxOpenDisplayOptions[eachOp.id] = "empty"
            }
        })
        setStateDisplayOptions(auxOpenDisplayOptions);
    }, []);

    useEffect(() => {
        if (props?.user[0]?.userID != undefined) {
            handleSearchPermissions(props.user[0])
        }
    }, [props?.user[0]?.userID]);

    useEffect(() => {
        if (groupsFound.length != 0) {
            let auxMaxRol = []
            let auxGroupsOptions = []
            groupsFound.map((eachGroup) => {
                auxMaxRol.push(Number(eachGroup.rol))
                auxGroupsOptions.push({ id: eachGroup.id, name: eachGroup.name, selectedState: false })
            })
            let maxValue = Math.max(...auxMaxRol);
            let maxPosition = auxMaxRol.indexOf(maxValue);
            if (verbose) {
                console.log("positionMax0", auxMaxRol)
                console.log("positionMax1", maxValue)
                console.log("positionMax2", maxPosition)
                console.log("positionMax3", auxGroupsOptions)
            }
            auxGroupsOptions[maxPosition]["selectedState"] = true
            setGroupsOptions(auxGroupsOptions)
            dispatch(addGroup([auxGroupsOptions[maxPosition]]))
        } else {
            setGroupsOptions([])
        }
    }, [groupsFound])

    /*
    ==============================================================
    ===============CONTROL STYLE==================================
    ==============================================================
    */

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        backgroundColor: "#464866",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${props.drawerwidthmax}px)`,
            marginLeft: `${props.drawerwidthmax}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            '& .MuiPaper-root': {
                backgroundColor: "#ffffff",
                border: "1px solid #ffffff"
            },
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    /*
    ==============================================================
    ===============CONTROL FUNCTIONS==============================
    ==============================================================
    */

    const handleUserOpen = () => {
        setOpenUser(true);
        setOpenGroups(false);
    };

    const handleGroupsOpen = () => {
        setOpenGroups(true);
        setOpenUser(false);
    };

    const handleUserClose = () => {
        setOpenUser(false);
    };

    const handleGroupsClose = () => {
        setOpenGroups(false);
    };

    const handleDrawerOpen = () => {
        props.setOpen(true);
    };

    const handleDrawerClose = () => {
        props.setOpen(false);
    };

    const handleOpenDisplayOption = (e, opId) => {
        if (verbose) { console.log("LateralBar open event", e) }
        let deepCopyStateDisplayOptions = Object.assign({}, stateDisplayOptions);
        if (deepCopyStateDisplayOptions[opId] != "empty") {
            deepCopyStateDisplayOptions[opId] = !deepCopyStateDisplayOptions[opId]
            setStateDisplayOptions(deepCopyStateDisplayOptions);
        }
    };

    const handleFunction = (e, handleName) => {
        if (verbose) { console.log("handleFunctionName", handleName) }
        if (verbose) { console.log("handleFunctionE", e) }
        switch (handleName) {
            case "handleLogout":
                handleCloseSession(props.user[0])
                break;
            default:
                if (verbose) { console.log("trying to router") }
                router.push("../" + handleName)
                break;
        }
    };

    const handleCloseSession = async (userSession) => {
        if (verbose) { console.log("handleSession0", userSession) }
        let stateExpiration = validateExpirationTime(userSession.userData.expiration)
        if (verbose) { console.log("handleSession1", stateExpiration) }
        if (stateExpiration) {
            let notif2return = {}
            let requestHeader = {
                'Authorization': 'Bearer ' + userSession.userID,
                'Content-Type': 'application/json'
            }
            let responseLogout = await getUserLogout(requestHeader);
            const [validResponseLogout, responseContentLogout] = validatorAPIBasicParameters(responseLogout);
            if (verbose) { console.log("indexLogout1", validResponseLogout) }
            if (verbose) { console.log("indexLogout2", responseContentLogout) }
            if (validResponseLogout) {
                if (responseContentLogout?.status == "ok" || responseContentLogout?.status == true) {
                    notif2return = {
                        "msg": `Cierre de sesión exitoso.`,
                        "status": "ok",
                    }
                } else {
                    notif2return = {
                        "msg": `No se pudo final el proceso de cierre de sesión en el servidor.`,
                        "status": "err",
                    }
                }
                dispatch(pushNotification(notif2return));
            } else {
                let notificationObject = {
                    "msg": `La respuesta del servidor para cerrar sesión no es válida`,
                    "status": "err"
                };
                dispatch(pushNotification(notificationObject));
            }
            dispatch(removeUserInfo());
            router.push("/login/exec?forward=/security/groups");
        } else {
            if (verbose) { console.log("handleSessionLogout", stateExpiration) }
            dispatch(removeUserInfo());
            router.push("/login/exec?forward=/security/groups");
        }
    }

    const handleOpenUncollapse = (e, opId) => {
        if (verbose) { console.log("Uncallepse open event", e) }
        let deepCopyStateDisplayOptions = Object.assign({}, stateDisplayOptions);
        Object.keys(deepCopyStateDisplayOptions).map((eachButton) => {
            if (eachButton != opId) {
                deepCopyStateDisplayOptions[eachButton] = false
            } else {
                deepCopyStateDisplayOptions[eachButton] = true
            }
        })
        setStateDisplayOptions(deepCopyStateDisplayOptions);
        props.setOpen(true)
    };

    const handleChangeGroupState = (e, opId) => {
        if (verbose) { console.log("state group changed1", e) }
        if (verbose) { console.log("state group changed2", opId) }
        setGroupsOptions(prev => {
            let deepCopyStateGroupOptions = Object.assign([], prev);
            deepCopyStateGroupOptions.map((eachGroup, index) => {
                if (eachGroup.id == opId.id) {
                    eachGroup.selectedState = true
                    dispatch(addGroup([eachGroup]))
                } else {
                    eachGroup.selectedState = false
                }
            })
            return deepCopyStateGroupOptions
        })
    };

    const handleSearchPermissions = async (userSession) => {
        if (verbose) { console.log("handleSessionPermission0", userSession) }
        let stateExpiration = validateExpirationTime(userSession.userData.expiration)
        if (verbose) { console.log("handleSessionPermission1", stateExpiration) }
        if (stateExpiration) {
            let notif2return = {}
            let requestHeader = {
                'Authorization': 'Bearer ' + userSession.userID,
                'Content-Type': 'application/json'
            }
            let responsePermissions = await getUserPermissions(requestHeader);
            const [validResponsePermissions, responseContentPermissions] = validatorAPIBasicParameters(responsePermissions);
            if (verbose) { console.log("indexPermission1", validResponsePermissions) }
            if (verbose) { console.log("indexPermission2", responseContentPermissions) }
            if (validResponsePermissions) {
                if (responseContentPermissions?.status == "ok" || responseContentPermissions?.status == true) {
                    let auxGroupsList = responseContentPermissions?.data;
                    if (verbose) { console.log("LateralBar auxGroupsList1", auxGroupsList) }
                    let auxDispatchGroups = []
                    if (auxGroupsList != undefined && auxGroupsList.length != 0) {
                        auxGroupsList.map((eachGroup) => {
                            auxDispatchGroups.push({ "id": eachGroup.group.id, "name": eachGroup.group.name, "rol": eachGroup.rol.value })
                        })
                        if (verbose) { console.log("LateralBar auxGroupsList2", auxDispatchGroups) }
                    }
                    setGroupsFound(auxDispatchGroups)
                } else {
                    notif2return = {
                        "msg": `No se pudo finalizar el proceso de consulta de roles del usuario en el servidor.`,
                        "status": "err",
                    }
                    dispatch(pushNotification(notif2return));
                }
            } else {
                let notificationObject = {
                    "msg": `La respuesta del servidor para consultar los roles del usuario no es válida`,
                    "status": "err"
                };
                dispatch(pushNotification(notificationObject));
            }
        } else {
            if (verbose) { console.log("handleSessionLogout", stateExpiration) }
            dispatch(removeUserInfo());
            router.push("/login/exec?forward=/security/groups");
        }
    }

    /*
    ==============================================================
    ===============RENDER=========================================
    ==============================================================
    */

    if (props.user.length != 0) {
        return (
            <Box>
                <AppBar position="fixed" open={props.open}>
                    <Toolbar className='distributed_horz'>
                        <Box component="div" className='left_horz'>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{ marginRight: 2, ...(props.open && { display: 'none' }) }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Box component="div" sx={{ padding: "8px" }}>
                                <img src={`${staticPrefix}/img/logoCreangel.png`} height="30" alt="logo creangel" />
                            </Box>
                        </Box>
                        <Box>
                            <StyledChip
                                icon={<GroupRoundedIcon />}
                                label={"Grupo"}
                                onClick={handleGroupsOpen}
                            >
                            </StyledChip>
                            <IconButton
                                ref={anchorEl}
                                onClick={handleUserOpen}
                                size="small"
                            >
                                <StyledAvatar>A</StyledAvatar>
                            </IconButton>
                        </Box>
                        {groupsOptions.length != 0 &&
                            <Menu
                                elevation={0}
                                anchorEl={() => anchorEl?.current}
                                id="account-menu"
                                open={openGroups}
                                onClose={handleGroupsClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        }
                                    },
                                    style: {
                                        transform: 'translateX(-10%) translateY(27px)',
                                    }
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                            >
                                {
                                    groupsOptions.map((eachOp) => {
                                        return (
                                            <MenuItem key={eachOp.id} sx={{ display: "flex", flexDirection: "row" }}>
                                                <StyledSwitch checked={eachOp.selectedState} onChange={(e) => { handleChangeGroupState(e, eachOp) }} />
                                                <ListItemText primary={eachOp.name.length > 15 ? eachOp.name.substring(0, 15) : eachOp.name} />
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Menu>
                        }
                        <Menu
                            elevation={0}
                            anchorEl={() => anchorEl?.current}
                            id="account-menu"
                            open={openUser}
                            onClose={handleUserClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    }
                                },
                                style: {
                                    transform: 'translateX(0%) translateY(30%)',
                                }
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                        >
                            {
                                userOptions.map((eachOp, index) => {
                                    return (
                                        <MenuItem key={eachOp.id} onClick={(e) => { handleFunction(e, eachOp.handleFunction) }}>
                                            <ListItemIcon>
                                                {eachOp.icon}
                                            </ListItemIcon>
                                            {eachOp.title}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Menu>
                    </Toolbar>
                </AppBar>
                <StyledDrawer
                    variant="permanent"
                    open={props.open}
                >
                    <StyledDrawerHeader>
                        <Box component="div" className='fullWidht distributed_horz'>
                            <Box component="div" className='w_80 center_horz'>
                                <Typography variant="h5" noWrap component="div" className='color_body_text' sx={{ textAlign: "center", fontWeight: "500" }}>
                                    <span>Data Catalog</span>
                                </Typography>
                            </Box>
                            <Box component="div" className='w_20 center_vert'>
                                <IconButton className='rotateX_180' onClick={handleDrawerClose}>
                                    <MenuOpenIcon className='color_body_text' />
                                </IconButton>
                            </Box>
                        </Box>
                    </StyledDrawerHeader>
                    <Divider />
                    <List key={"optionsBar"}>
                        {stateDisplayOptions.length != 0 && lateralBarOptions.map((eachOp, index) => (
                            <Box component="div" key={"optionsBar" + index}>
                                {props.open == true &&
                                    <ListItem key={eachOp.id} disablePadding onClick={(e) => { stateDisplayOptions[eachOp.id] != "empty" ? handleOpenDisplayOption(e, eachOp.id) : handleFunction(e, eachOp.handleFunction) }}>
                                        <ListItemButton key={"button" + eachOp.id} sx={{ width: "100%" }}>
                                            <ListItemIcon key={"icon" + eachOp.id}>
                                                {eachOp.icon}
                                            </ListItemIcon>
                                            <ListItemText key={"text" + eachOp.id} primary={eachOp.title} />
                                            {stateDisplayOptions[eachOp.id] != "empty" && stateDisplayOptions[eachOp.id] == true && <ExpandMore />}
                                            {stateDisplayOptions[eachOp.id] != "empty" && stateDisplayOptions[eachOp.id] == false && <NavigateNextRoundedIcon />}
                                        </ListItemButton>
                                    </ListItem>
                                }
                                {props.open == true && stateDisplayOptions[eachOp.id] != "empty" &&
                                    <Collapse key={"subOptionsCollapse" + eachOp.id} in={stateDisplayOptions[eachOp.id]} timeout="auto" unmountOnExit>
                                        <List key={"subOptions" + eachOp.id} component="div" disablePadding>
                                            {eachOp.subOptions.map((eachSubOp) => {
                                                return (
                                                    <ListItem key={eachOp.id + "_" + eachSubOp.title} disablePadding onClick={(e) => { handleFunction(e, eachSubOp.handleFunction) }}>
                                                        <ListItemButton sx={{ pl: 4 }}>
                                                            <ListItemIcon>
                                                                {eachSubOp.icon}
                                                            </ListItemIcon>
                                                            <ListItemText className='color_body_text' primary={eachSubOp.title} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                )
                                            })}
                                        </List>
                                    </Collapse>
                                }
                                {props.open == false &&
                                    <ListItem key={eachOp.id} disablePadding onClick={(e) => { handleOpenUncollapse(e, eachOp.id) }}>
                                        <ListItemButton key={"button" + eachOp.id} className="fullWidht center_vert">
                                            <ListItemIcon key={"icon" + eachOp.id} className="fullWidht center_horz">
                                                {eachOp.icon}
                                            </ListItemIcon>
                                            <ListItemText key={"text" + eachOp.id} disableTypography primary={eachOp?.alias != undefined ? eachOp.alias : eachOp.title} className='font_roboto font_12px' />
                                        </ListItemButton>
                                    </ListItem>
                                }
                            </Box>
                        ))}
                    </List>
                </StyledDrawer>
            </Box>
        )
    }
    else {
        return (<>Cargando información del usuario</>)
    }
}

export default connect(mapStateToProps, null)(MainBar);