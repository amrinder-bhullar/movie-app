import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    bookmarks: null,
    bookmarksUpdated: null,
    setUser: () => {},
    setToken: () => {},
    setBookmarks: () => {},
    setBookmarksUpdated: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [bookmarks, setBookmarks] = useState([]);
    const [bookmarksUpdated, setBookmarksUpdated] = useState(0);

    const setToken = (token) => {
        _setToken(token);

        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };
    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                bookmarks,
                setBookmarks,
                bookmarksUpdated,
                setBookmarksUpdated,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
