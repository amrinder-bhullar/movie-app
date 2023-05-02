import React, { useEffect } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

function DefaultLayout() {
    const {
        user,
        token,
        setUser,
        setToken,
        setBookmarks,
        bookmarksUpdated,
        setBookmarksUpdated,
    } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
        setBookmarksUpdated(0);
    }, []);

    useEffect(() => {
        axiosClient.get("/bookmarks").then(({ data }) => {
            setBookmarks(data);
        });
    }, [bookmarksUpdated]);

    return (
        <div>
            <header className="flex justify-between py-2 px-10">
                <h4>Movie App</h4>
                <nav>
                    <ul className="flex gap-x-1">
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/search">Search</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </div>
    );
}

export default DefaultLayout;
