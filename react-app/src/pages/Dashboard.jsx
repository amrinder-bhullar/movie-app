import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

function Dashboard() {
    const { bookmarks, setBookmarks, setBookmarksUpdated, bookmarksUpdated } =
        useStateContext();

    const handleDelete = (id) => {
        axiosClient
            .delete(`/bookmarks/${id}`)
            .then((response) => {
                console.log(response.data);
                setBookmarksUpdated(bookmarksUpdated + 1);
            })
            .catch((err) => {
                console.log(err.error);
            });
    };
    return (
        <div className="flex w-full">
            <main className="w-11/12 mx-auto px-4 mb-8">
                {bookmarks &&
                    bookmarks.map((bookmark) => (
                        <div className="flex mt-16" key={bookmark.imdbID}>
                            <div className="w-32">
                                <img
                                    src={bookmark.poster}
                                    alt={bookmark.title}
                                    width={"100%"}
                                />
                            </div>
                            <div className="w-full bg-gray-300 p-4 relative">
                                <div className="p-2">{bookmark.title}</div>
                                <div className="p-2">
                                    How many times have you watched it?{" "}
                                    <span>{bookmark.watch_count}</span>
                                </div>
                                <div className="p-2">
                                    Your rating of the movie?{" "}
                                    <span>{bookmark.rating}</span>
                                </div>
                                <button className="absolute top-3 right-5">
                                    Edit
                                </button>
                                <button
                                    className="absolute top-10 right-5"
                                    onClick={() => handleDelete(bookmark.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
            </main>
        </div>
    );
}

export default Dashboard;
