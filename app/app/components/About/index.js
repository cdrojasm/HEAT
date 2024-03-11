/* 
Name: About
Action: License description
*/

import { connect } from 'react-redux';
import { Typography } from '@mui/material';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/system/Box';


const mapStateToProps = state => {
    return {
        user: state.user,
        organization: state.organization,
    };
};

function About(props) {
    const [screenMinHei, setScreenMinHei] = useState(400);
    const staticPrefix = process.env.staticPrefix;
    const verbose = true;

    if (verbose) { console.log("aboutProps", props) }

    return (
        <Container fixed>
            <Box className="fullWidht center_horz mt_40">
                <Box component="section" className="mt_50 w_60 bg_white" sx={{ minHeight: screenMinHei, boxShadow: "0 10px 20px rgb(0 0 0/19%),0 6px 6px rgb(0 0 0/23%)" }}>
                    <Box className="pad_40">
                        <Box className="center_vert col_gap_10">
                            <Box className="center_horz">
                                <img style={{ width: "150px" }} src={staticPrefix + "/img/ifinditBig.png"} />
                            </Box>
                            <Box className="center_horz mt_20">
                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                    IFindIt Data Catalog®
                                </Typography>
                            </Box>
                            <Box className="center_horz">
                                <Typography variant="body1" component="p" >
                                    Versión 0.1.0
                                </Typography>
                            </Box>
                            <Box className="center_horz mt_20">
                                <Typography variant="body1" component="p" sx={{ fontWeight: 'bold' }}>
                                    Cliente: {"MinSalud"}
                                </Typography>
                            </Box>
                            <Box className="center_horz">
                                <Typography variant="body1" component="p" >
                                    Usuario activo en esta sesión: {props.user[0].userData.username}
                                </Typography>
                            </Box>
                            <Box className="center_horz">
                                <Typography variant="body1" component="p" >
                                    Orden de compra No: {"121580-2023 CTO 1558 de 2023"}
                                </Typography>
                            </Box>
                            <Box className="center_horz">
                                <Typography variant="body1" component="p" >
                                    Licencia válida desde {"7-Dic-2023"} hasta {"6-Dic-2024"}
                                </Typography>
                            </Box>
                            <Box className="center_horz">
                                <Typography variant="body1" component="p" >
                                    ©2024 Creangel. Todos los derechos reservados.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default connect(mapStateToProps, null)(About);