// Books.js

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Logo from "../assets/Logo.png";
import "../App.css";
import FormUse from "./Form";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Books() {
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [searchInput, setSearchInput] = useState("");
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();

        const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (storedUserInfo) {
            setUserInfo(storedUserInfo);
            setIsRegistrationSuccess(true);
        }
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("https://reactnd-books-api.udacity.com/books", {
                headers: {
                    Authorization: 'whatever-you-want'
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            setBooks(data.books);
            setFilteredBooks(data.books);
        } catch (error) {
            console.error("Error fetching data:", error);
            setHasError(true);
        }
    };

    const handleHomeClick = () => {
        if (isRegistrationSuccess) {
            setIsFormOpen(false);
            navigate("/");
        }
    };

    const handleSearch = (e) => {
        const input = e.target.value;
        setSearchInput(input);

        const searchQuery = input.toLowerCase();
        const filtered = books.filter((book) =>
            book.title.toLowerCase().startsWith(searchQuery)
        );
        setFilteredBooks(filtered);
    };

    const handleRegisterClick = () => {
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="navbar">
                <div className="logo-container">
                    <img className="logo" src={Logo} alt="Logo" />
                    <p className="logo-text">Kalvium Books</p>
                </div>
                <div className="searchBar">
                    <input
                        className="searchInput"
                        type="text"
                        placeholder="Search books"
                        value={searchInput}
                        onChange={handleSearch}
                    />
                    <div className="searchButton">
                        <SearchIcon />
                    </div>
                </div>
                {isRegistrationSuccess ? (
                    <div className="user-info">
                        <AccountCircleIcon />
                        <p className="user-name">
                            {userInfo.firstName}
                        </p>
                    </div>
                ) : (
                    <>
                        {!isFormOpen && (
                            <NavLink style={{ textDecoration: "none" }} to="/register">
                                <button
                                    className="registerButton"
                                    onClick={handleRegisterClick}
                                    style={{ display: isRegistrationSuccess ? "none" : "block" }}
                                >
                                    Register
                                </button>
                            </NavLink>
                        )}
                    </>
                )}
                {isFormOpen && (
                    <div className="backButton">
                        <HomeIcon />
                    </div>
                )}
            </div>

            {hasError ? (
                <div>
                    <h1>Something went wrong.</h1>
                    <p>Please try again later.</p>
                </div>
            ) : (
                <div className="books-container">
                    {filteredBooks && filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                            <div key={book.id} className="book-card">
                                <div className="book-image">
                                    <img
                                        style={{ width: "100%", height: "200px" }}
                                        src={book.imageLinks.thumbnail}
                                        alt={book.title}
                                    />
                                </div>
                                <div className="book-details">
                                    <p className="title">{book.title}</p>
                                    <p className="authors">{book.authors.join(", ")}</p>
                                    <p className="rating">⭐ {book.averageRating || "-.-"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="not-found" > Book Not found 😓</p>
                    )}
                </div>
            )}

            {isFormOpen && (
                <div>
                    <FormUse />
                    <ToastContainer />
                </div>
            )}
        </div>
    );
}

export default Books;
