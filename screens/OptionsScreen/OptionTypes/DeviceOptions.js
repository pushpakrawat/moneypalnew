import React from "react";
import UpdateNotification from "../../../components/notifications/updateNotification"
import LogoutButton from "../../../components/smallComponents/signOutButton";
import { useSelector } from "react-redux";

const DeviceOptions = () => {
    const isLoggedin = useSelector((state) => state.user.isLoggedin)

    return (
        <>
            {isLoggedin && <UpdateNotification />}
            <LogoutButton />
        </>
    )
};

export default DeviceOptions;
