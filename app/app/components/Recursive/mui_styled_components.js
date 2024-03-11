/* 
Name: mui_styled_components.js
Action: Styled components for MUI components
*/

import { styled } from "@mui/material/styles";
import { Button, Table, TableRow, TableSortLabel, Tab, Tabs, IconButton, Chip, Avatar, Switch } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';


export const StyledMain = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
)

export const StyledDrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export const StyledSwitch = styled((props) => <Switch {...props} />)(
    ({ theme }) => ({
        '& .MuiSwitch-switchBase': {
            '&.Mui-checked': {
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: "#5f618d",
                    opacity: 1,
                    border: 0,
                }
            }
        }
    })
)

export const StyledChip = styled((props) => <Chip {...props} />)(
    ({ theme }) => ({
        "&:hover": {
            backgroundColor: "#585a6d",
            textTransform: "unset",
        },
        backgroundColor: "#8587a3",  //"#aaacc8", 
        textTransform: "unset",
        color: "#f2f3fb",
        fontSize: "16px",
        '& .MuiChip-icon': { color: "#dddff5" }
    })
)

export const StyledAvatar = styled((props) => <Avatar {...props} />)(
    ({ theme }) => ({
        "&:hover": {
            backgroundColor: "#585a6d",
            textTransform: "unset",
        },
        width: 32,
        height: 32,
        backgroundColor: "#8587a3",  //"#aaacc8", 
        textTransform: "unset",
        color: "#f2f3fb",
    })
)

export const StyledButton = styled((props) => <Button {...props} />)(
    ({ theme }) => ({
        "&:hover": {
            color: "#FFFFFF",
            backgroundColor: "#222550"
        },
        backgroundColor: "#464866",
        textTransform: "unset",
        fontWeight: "bolder",
        minHeight: "40px",
        borderRadius: "6px",
        color: "#FFFFFF",
    })
)

export const StyledButtonRounded = styled((props) => <Button {...props} />)(
    ({ theme }) => ({
        "&:hover": {
            color: "#FFFFFF",
            backgroundColor: "#222550"
        },
        backgroundColor: "#464866",
        textTransform: "unset",
        fontWeight: "bolder",
        minHeight: "40px",
        borderRadius: "25px"
    })
)

export const StyledIconButton = styled((props) => <IconButton {...props} />)(
    ({ theme }) => ({
        "&:hover": {
            padding: "0px"
        },
        paddingRight: "0px",
        paddingleft: "2px",
        paddingTop: "0px",
        paddingBottom: "0px",
    })
)

export const RowsHeadStyled = styled((props) => <TableRow {...props} />)(
    ({ theme }) => ({
        borderBottom: "unset",
        background: "#2A3F54"
    })
)

export const RowsStyled = styled((props) => <TableRow {...props} />)(
    ({ theme }) => ({
        borderBottom: "1px solid #e6e9ed",
        background: "#ffffff",
        "&:hover": {
            backgroundColor: "rgb(227 236 241)",
            opacity: 1
        },
    })
)

export const SortTableStyled = styled((props) => <TableSortLabel {...props} />)(
    ({ theme }) => ({
        "&:hover": {
            color: "rgb(227 236 241)"
        },
        color: "#ffffff"
    })
)

export const TableStyled = styled((props) => <Table {...props} />)(
    ({ theme }) => ({
        "& .MuiTableCell-root": {
            border: "unset"
        },
        "& .MuiTableRow-root:nth-child(2n)": {
            backgroundColor: "#eef1f3"
        },
        "& .MuiTableRow-root:nth-child(2n):hover": {
            background: "rgb(227 236 241)"
        },
        ".MuiTableSortLabel-root.Mui-active": {
            color: "rgb(224 224 224)"
        }
    })
)

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: "none",
        minWidth: 0,
        [theme.breakpoints.up("sm")]: {
            minWidth: 0
        },
        fontWeight: 400,
        fontSize: "18px",
        marginRight: theme.spacing(1),
        color: "#AAACC8",
        fontFamily: "Roboto",
        "&:hover": {
            color: "#286090",
            opacity: 1
        },
        "&.Mui-selected": {
            color: "#464867",
            fontWeight: theme.typography.fontWeightMedium
        },
    })
);

export const StyledTabs = styled((props) => <Tabs {...props} />)(
    ({ theme }) => ({
        '.MuiTabs-indicator': {
            backgroundColor: "#464867 !important",
        },
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        width: "100%",
    })
);

export const colorAPP = {
    "bg_body_1": "#22274E",
    "bg_body_2": "#464867",
    "bg_body_3": "#AAACC8",
    "bg_body_4": "#d2d3e6",
    "bg_body_F": "#FFFFFF",
    "bg_icons_warning": "#ffc100",
    "bg_body_light": "#f2f3fb"
};


export const StyledMaterialTable = (props) => {
    return (
        <MaterialReactTable
            {...props}
            initialState={{
                density: 'comfortable',
                pagination: { pageIndex: 0, pageSize: 10 }
            }}
            localization={MRT_Localization_ES}
            enableStickyHeader
            enableStickyFooter
            selectAllMode="all"
            globalFilterFn="contains"
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            enableSelectAll={false}
            enableMultiRowSelection={false}
            enableRowActions
            displayColumnDefOptions={{
                "mrt-row-actions": {
                    size: 100,
                    enableResizing: true,
                    muiTableHeadCellProps: {
                        align: "center",
                    },
                },
            }}
            positionActionsColumn={'first'}
            muiTableHeadCellFilterTextFieldProps={{ sx: { background: "white", borderRadius: "8px", color: "black" } }}
            muiTableHeadCellColumnActionsButtonProps={{ sx: { color: "white", opacity: "1" } }}
            muiTableHeadCellFilterSliderProps={{ sx: { background: "white" } }}
            muiTableBodyCellProps={{
                sx: {
                    border: 'none',
                }
            }}
            muiTableHeadCellProps={{
                sx: {
                    /*
                    '& .MuiSvgIcon-root': {
                        opacity: '1',
                    },
                    */
                    background: "#464866",
                    color: "white",
                    fontSize: '16px',
                    fontWeight: "500"
                },
            }}
            muiTableBodyProps={{
                sx: () => ({
                    '& tr:nth-of-type(even)': {
                        backgroundColor: 'rgb(219 219 219 / 12%)'
                    },
                })
            }}
            muiTableContainerProps={{
                sx: {
                    minHeight: '400px',
                    maxHeight: '800px',
                    fontFamily: 'Roboto',
                    '& .MuiTableSortLabel-icon': { color: "#ffffff !important" },
                    '& .MuiIconButton-root': { color: "unset !important" }
                }
            }}
        />
    )
}


export const StyledMaterialTable_withoutActions = (props) => {
    return (
        <MaterialReactTable
            {...props}
            initialState={{
                density: 'comfortable',
                pagination: { pageIndex: 0, pageSize: 10 }
            }}
            localization={MRT_Localization_ES}
            enableStickyHeader
            enableStickyFooter
            selectAllMode="all"
            globalFilterFn="contains"
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            enableSelectAll={false}
            enableMultiRowSelection={false}
            displayColumnDefOptions={{
                "mrt-row-expand": {
                    size: 30,
                    enableResizing: true,
                    muiTableHeadCellProps: {
                        align: "center",
                    },
                    muiTableBodyCellProps: {
                        align: 'center',
                    },
                },
            }}
            muiTableHeadCellFilterTextFieldProps={{ sx: { background: "white", borderRadius: "8px", color: "black" } }}
            muiTableHeadCellColumnActionsButtonProps={{ sx: { color: "white", opacity: "1" } }}
            muiTableHeadCellFilterSliderProps={{ sx: { background: "white" } }}
            muiTableBodyCellProps={{
                sx: {
                    border: 'none',
                }
            }}
            muiTableHeadCellProps={{
                sx: {
                    /*
                    '& .MuiSvgIcon-root': {
                        opacity: '1',
                    },
                    */
                    background: "#464866",
                    color: "white",
                    fontSize: '16px',
                    fontWeight: "500"
                },
            }}
            muiTableBodyProps={{
                sx: () => ({
                    '& tr:nth-of-type(even)': {
                        backgroundColor: 'rgb(219 219 219 / 12%)'
                    },
                })
            }}
            muiTableContainerProps={{
                sx: {
                    minHeight: '400px',
                    maxHeight: '800px',
                    fontFamily: 'Roboto',
                    '& .MuiTableSortLabel-icon': { color: "#ffffff !important" },
                    '& .MuiIconButton-root': { color: "unset !important" }
                }
            }}
        />
    )
}