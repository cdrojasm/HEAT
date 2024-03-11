import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Alert, AlertTitle } from '@mui/material'
import { removeNotification } from '../../redux/actions';

const mapStateToProps = state => {
    return {
        user: state.user,
        terms: state.terms,
        notifications: state.notifications
    };
};

function NotificatorLogin(props) {
    const [showingNotification, setShowingNotification] = useState(undefined);
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.notifications && props.notifications?.length && props.notifications.length > 0) {
            const notification_i = props.notifications[0];
            if (notification_i.hasOwnProperty("msg") && notification_i.hasOwnProperty("status")) {
                setShowingNotification(notification_i);
            }
        }
    }, [props.notifications])

    useEffect(() => {
        if (showingNotification !== undefined) {
            const timer = setTimeout(() => {
                setShowingNotification(undefined);
                dispatch(removeNotification());
            }, 2500)
            return () => clearTimeout(timer);
        }
    }, [showingNotification])

    if (showingNotification) {
        return (
            <div className="fullWidht fullHeight pad_t_20">
                <Alert severity={showingNotification.status === "ok" ? "success" : "error"}>
                    <AlertTitle>{showingNotification.status === "ok" ? "Exitoso" : "Error"}</AlertTitle>
                    {showingNotification.msg}
                </Alert>
            </div>
        )
    } else {
        return (
            <div style={{ display: "none" }}></div>
        )
    }
}

export default connect(mapStateToProps, null)(NotificatorLogin);