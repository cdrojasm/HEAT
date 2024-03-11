/* 
Name: UsersAdmin
Action: users administration
*/

import React from 'react'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Error from '../../Base/Error';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { StyledButton, StyledMaterialTable } from '../../Recursive/mui_styled_components';
//Icons
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


const UsersAdmin = (props) => {

    /*
    =======================================================
    ===============VARIABLES===============================
    =======================================================
    */

    const [windowSize, setWindowSize] = useState(undefined);
    const columnsTable = [
        {
            accessorKey: "username",
            header: "Nombre del usuario",
            size: 200,
            muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'email',
            header: 'Correo electrónico',
            size: 200,
            muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'created_at',
            header: 'Fecha de creación',
            size: 200,
            muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            accessorKey: 'edited_at',
            header: 'Fecha de edición',
            size: 200,
            muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        }
    ]
    const [rowSelectedTableEnableActions, setRowSelectedTableEnableActions] = useState(0);
    const verbose = true

    /*
    =======================================================
    ===============VERBOSE=================================
    =======================================================
    */

    if (verbose) { console.log("usersA", props) }

    /*
    =======================================================
    ===============USEEFFECTS==============================
    =======================================================
    */

    useEffect(() => {
        props.handleChange()
        const handleWindowResize = () => {
            setWindowSize(window.innerWidth);
        };
        window.addEventListener('resize', handleWindowResize);
        setWindowSize(window.innerWidth);
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [])

    /*
    ==============================================================
    ===============RENDER=========================================
    ==============================================================
    */


    if (props.usersFound !== undefined && windowSize !== undefined) {
        return (
            <Box>
                <Box className="pad_35">
                    <Typography variant="h5" noWrap className='color_body_titles' component="div" sx={{ fontWeight: "500", marginBottom: "10px" }}>
                        <span>{"Administración de usuarios"}</span>
                    </Typography>
                    <Divider />
                    <Box className='right_horz mt_10 mb_10'>
                        <StyledButton
                            variant="contained"
                            onClick={(e) => { props.handleDisplayAction(e, "CreateUser", "") }}
                        >
                            <PersonAddAlt1RoundedIcon />
                            <Typography noWrap component="div" sx={{ fontSize: "14px", marginLeft: "5px" }}>
                                <span>Crear usuario</span>
                            </Typography>
                        </StyledButton>
                    </Box>
                    {props.usersFound.length != 0 &&
                        <StyledMaterialTable
                            state={{ isLoading: props.isLoadingList }}
                            columns={columnsTable ?? []}
                            data={props.usersFound ?? []}
                            muiTableBodyRowProps={({ row }) => ({
                                onMouseOver: () => {
                                    setRowSelectedTableEnableActions(row.id)
                                }
                            })}
                            renderRowActions={({ row, table }) => (
                                <>
                                    {rowSelectedTableEnableActions == row.index &&
                                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', gap: '8px' }}>
                                            <Tooltip title={"Editar usuario"} placement="top" arrow>
                                                <IconButton
                                                    onClick={(e) => { props.handleDisplayAction(e, "EditUser", row.original) }}
                                                >
                                                    <EditRoundedIcon className='bg_icons_color' />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={"Eliminar usuario"} placement="top" arrow>
                                                <IconButton
                                                    onClick={(e) => { props.handleDisplayAction(e, "DeleteUser", row.original) }}
                                                >
                                                    <DeleteRoundedIcon className='bg_icons_color' />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    }
                                </>
                            )}
                        />
                    }
                    {props.usersFound.length == 0 &&
                        <Box className="pad_40" style={{ minHeight: windowSize }}>
                            <Typography noWrap component="div" sx={{ textAlign: "center", fontWeight: "500", marginBottom: "10px", fontSize: "18px" }}>
                                <Error message="No existen usuarios creados." />
                            </Typography>
                        </Box>
                    }
                </Box >
            </Box >
        )
    } else {
        return (
            <Box className="pad_40" style={{ minHeight: windowSize }}>
                <Typography variant="h6" noWrap component="div" sx={{ textAlign: "center", fontWeight: "500", marginBottom: "10px" }}>
                    <Error message="Credenciales no válidas para acceder a la administración de usuarios." />
                </Typography>
            </Box>
        )
    }
}


export default UsersAdmin;