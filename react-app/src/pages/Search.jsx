import { useEffect, useRef, useState } from "react";
import "../App.css";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

function Search() {
    const {
        user,
        bookmarks,
        setBookmarks,
        bookmarksUpdated,
        setBookmarksUpdated,
    } = useStateContext();
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState([]);
    const [SavedbookmarksImdbID, setSavedbookmarksImdbID] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState({});

    const ratingRef = useRef();
    const numWatchedRef = useRef();

    const handleSearch = async (e) => {
        e.preventDefault();
        const response = await axios.get(
            `https://www.omdbapi.com/?s=${search}&&apikey=22396c3c`
        );
        setMovies(response.data.Search);
    };

    const handleRatingSubmit = (e) => {
        e.preventDefault();

        const rating = ratingRef.current.value;
        const watchCounter = numWatchedRef.current.value;

        const payload = {
            title: selectedMovie.Title,
            imdbID: selectedMovie.imdbID,
            poster: selectedMovie.Poster,
            rating: rating,
            watch_count: watchCounter,
        };

        axiosClient
            .post("/bookmarks", payload)
            .then((response) => {
                console.log(response);
                setBookmarksUpdated(bookmarksUpdated + 1);
                setShowPopup(false);
                setSelectedMovie({});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleBookmark = (movie) => {
        // toggle bookmark
        if (!SavedbookmarksImdbID.includes(movie.imdbID)) {
            setShowPopup(true);
            setSelectedMovie(movie);
        }
    };

    useEffect(() => {
        const justImdbIDs = bookmarks.map((bookmark) => {
            return bookmark.imdbID;
        });
        console.log("bookmarksUpdated + 1");
        setSavedbookmarksImdbID(justImdbIDs);
    }, [bookmarks]);

    return (
        <>
            <div className="w-full flex justify-center py-20">
                <form onSubmit={handleSearch}>
                    <input
                        className="border-black border p-2"
                        type="text"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-green-400 border border-black p-2 text-white"
                    >
                        Search
                    </button>
                </form>
            </div>
            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="absolute bg-white rounded-lg shadow-lg p-6">
                        <div className="relative flex justify-end">
                            <button
                                // className="text-right"
                                onClick={() => {
                                    setShowPopup(false);
                                }}
                            >
                                close
                            </button>
                        </div>
                        {selectedMovie && (
                            <h1 className="text-2xl text-center bg-white p-3">
                                {selectedMovie.Title}
                            </h1>
                        )}
                        <form
                            onSubmit={handleRatingSubmit}
                            className="bg-white py-5 px-5 flex flex-col"
                        >
                            <div class="mb-6">
                                <label
                                    for="rating"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Rating
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    defaultValue="7"
                                    ref={ratingRef}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div class="mb-6">
                                <label
                                    for="watchedTimes"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    How many times have you watched the movie?
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    defaultValue="1"
                                    ref={numWatchedRef}
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add to watched list
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <div className="lg:px-40 sm:px-3 md:px-5 flex flex-wrap align-middle justify-between">
                {movies &&
                    movies.map((movie) => (
                        <div
                            key={movie.imdbID}
                            className="h-22 sm:w-2/6 lg:w-1/5 relative"
                        >
                            <button
                                onClick={() => handleBookmark(movie)}
                                // {SavedbookmarksImdbID.includes(movie.imdbID)
                                //     ? className="bg-green-400 absolute top-0 right-0 p-2"
                                //     : className="bg-red-400 absolute top-0 right-0 p-2"}
                                className={
                                    SavedbookmarksImdbID.includes(movie.imdbID)
                                        ? "bg-green-400 absolute top-0 right-0 p-2"
                                        : "bg-red-400 absolute top-0 right-0 p-2"
                                }
                            >
                                {SavedbookmarksImdbID.includes(movie.imdbID)
                                    ? "watched"
                                    : "add to watched list"}
                            </button>
                            <img
                                className="w-full min-h-max overflow-hidden"
                                src={movie.Poster}
                                alt=""
                            />
                            <p>{movie.Title}</p>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Search;
