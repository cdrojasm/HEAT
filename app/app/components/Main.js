/* 
Name: Main
Action: Main
*/

import Head from 'next/head';
import MainBar from './Base/MainBar';
import Footer from './Base/Footer';
import Notificator from './Recursive/Notificator';
import React, { useState, useEffect } from 'react';
import Router from "next/router";
import { connect } from 'react-redux';
import { StyledMain, StyledDrawerHeader } from './Recursive/mui_styled_components';

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

function Main(props) {

    /*
    =======================================================
    ===============VARIABLES===============================
    =======================================================
    */

    const [userName, updateUserName] = useState();
    const [hydrationLoad, setHydrationLoad] = useState(true);
    const [openLateralMenu, setOpenLateralMenu] = useState(false);
    const drawerwidthmax = 260;
    const drawerwidthmin = 70;
    const staticPrefix = process.env.staticPrefix;
    const data = props.user;
    const sess_i = ((data !== 'null') && (data !== undefined) && (data.length > 0));
    const verbose = false;

    /*
    =======================================================
    ===============VERBOSE=================================
    =======================================================
    */

    if (verbose) { console.log("main component") }
    if (verbose) { console.log("main props", props) }

    /*
    =======================================================
    ===============USEEFFECTS==============================
    =======================================================
    */

    useEffect(() => {
        setHydrationLoad(false);
    }, [])

    useEffect(() => {
        if (sess_i) {
            updateUserName(data.username)
        } else {
            const forwardURL = (props.forwardURL === undefined) ? '/security/users' : props.forwardURL
            Router.push("/login/exec?forward=" + forwardURL);
        }
    }, [sess_i])

    /*
    ==============================================================
    ===============RENDER=========================================
    ==============================================================
    */

    if (sess_i) {
        if (hydrationLoad == true) {
            return (<>Loading</>)
        } else {
            return (
                <>
                    <Head>
                        <title>HEAT</title>
                    </Head>
                    <div id="datacatalog_admin_app_container">
                        <div className="main_container">
                            <MainBar
                                drawerwidthmax={drawerwidthmax}
                                drawerwidthmin={drawerwidthmin}
                                open={openLateralMenu}
                                setOpen={setOpenLateralMenu}
                            />
                            <StyledMain
                                open={openLateralMenu}
                            >
                                <StyledDrawerHeader />
                                <div className="right_section fullWidht">
                                    <div className='main_container_section'>
                                        {props.children}
                                    </div>
                                </div>
                            </StyledMain>
                        </div>
                        <Notificator />
                        <Footer />
                    </div>
                </>)
        }
    } else {
        return (<>Loading</>)
    }
}

export default connect(mapStateToProps, null)(Main);