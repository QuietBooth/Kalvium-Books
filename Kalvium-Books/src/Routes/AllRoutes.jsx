// AllRoutes.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Books from "../components/Books";
import Forms from "../components/Form";

function AllRoutes() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function getBooks() {
            try {
                const response = await fetch("https://reactnd-books-api.udacity.com/books", {
                    headers: { 'Authorization': 'whatever-you-want' }
                });
                const data = await response.json();
                setBooks(data.books);
            } catch (error) {
                console.log(error);
            }
        }
        getBooks();
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Books books={books} />} />
                <Route path="/register" element={<Forms />} />
            </Routes>
        </div>
    );
}

export default AllRoutes;
