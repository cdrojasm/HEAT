/* 
Name: index
Action: index of Catalog component
*/

import { connect } from 'react-redux';
import { Typography } from '@mui/material';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/system/Box';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';

const mapStateToProps = state => {
    return {
        user: state.user,
        terms: state.terms
    };
};

function Catalog(props) {
    const [screenMinHei, setScreenMinHei] = useState(400);
    const staticPrefix = process.env.staticPrefix;
    const verbose = false;

    if (verbose) { console.log("aboutProps", props) }

    return (
        <Container fixed>
            <Box className="fullWidht center_horz mt_40">
                <Box component="section" className="mt_50 w_60 bg_white" sx={{ minHeight: screenMinHei, boxShadow: "0 10px 20px rgb(0 0 0/19%),0 6px 6px rgb(0 0 0/23%)" }}>
                    <Box className="pad_40">
                        <Box className="center_vert col_gap_10">
                            <Box className="center_horz mt_20">
                                <Typography variant="h6" component="p" >
                                    Componente deshabilitado.
                                </Typography>
                                <ConstructionRoundedIcon />
                            </Box>
                            <Box className="center_horz mt_20">
                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                    IFindIt Data Catalog®
                                </Typography>
                            </Box>
                            <Box className="center_horz mt_20">
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

export default connect(mapStateToProps, null)(Catalog);