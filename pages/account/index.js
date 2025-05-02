import React from "react";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const logout = async () => {
    await fetch("/api/logout");
    router.push("/login");
};


const AccountPage = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Welcome to your Account Dashboard</h1>
            <p>This page is protected and requires login to view.</p>
            <LogoutButton></LogoutButton>
        </div>
    );
};

export default AccountPage;
