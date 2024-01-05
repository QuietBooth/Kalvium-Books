// // Navbar.jsx

// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import SearchIcon from "@mui/icons-material/Search";
// import HomeIcon from "@mui/icons-material/Home";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import Logo from "../assets/Logo.png";
// import "../App.css";

// function Navbar({ books, setFilteredBooks }) {
//     const [registrationSuccess, setRegistrationSuccess] = useState(false);
//     const [isFormOpen, setIsFormOpen] = useState(false);
//     const [userInfo, setUserInfo] = useState({});
//     const [searchInput, setSearchInput] = useState("");
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
//         if (storedUserInfo) {
//             setUserInfo(storedUserInfo);
//             setRegistrationSuccess(true);
//         }
//     }, []);

//     const handleHomeClick = () => {
//         setRegistrationSuccess(true);
//         setIsFormOpen(false);
//         navigate("/");
//     };

//     const handleSearch = (e) => {
//         const input = e.target.value;
//         setSearchInput(input);

//         // Perform search based on the input
//         const searchQuery = input.toLowerCase();
//         const filtered = books.filter((book) =>
//             book.title.toLowerCase().includes(searchQuery)
//         );
//         setFilteredBooks(filtered);
//     };

//     const handleRegisterClick = () => {
//         setIsFormOpen(true);
//     };

//     const showHomeIcon = !registrationSuccess && !isFormOpen;

//     return (
//         <div className="navbar">
//             <div className="logo-container">
//                 <img className="logo" src={Logo} alt="Logo" />
//                 <p className="logo-text">Kalvium Books</p>
//             </div>
//             <div className="searchBar">
//                 <input
//                     className="searchInput"
//                     type="text"
//                     placeholder="Search books"
//                     value={searchInput}
//                     onChange={handleSearch}
//                 />
//                 <div className="searchButton">
//                     <SearchIcon />
//                 </div>
//             </div>
//             {isFormOpen ? (
//                 registrationSuccess ? null : (
//                     <div
//                         className="backButton"
//                         style={{ display: registrationSuccess ? "none" : "block" }}
//                         onClick={handleHomeClick}
//                     >
//                         <HomeIcon />
//                     </div>
//                 )
//             ) : (
//                 <>
//                     {registrationSuccess ? (
//                         <div className="user-info">
//                             <AccountCircleIcon />
//                             <p className="user-name">
//                                 {userInfo.firstName} {userInfo.lastName}
//                             </p>
//                         </div>
//                     ) : (
//                         <>
//                             {showHomeIcon && (
//                                 <button className="homeButton" onClick={handleHomeClick}>
//                                     <HomeIcon />
//                                 </button>
//                             )}
//                             {!registrationSuccess && (
//                                 <NavLink style={{ textDecoration: "none" }} to="/register">
//                                     <button
//                                         className="registerButton"
//                                         onClick={handleRegisterClick}
//                                     >
//                                         Register
//                                     </button>
//                                 </NavLink>
//                             )}
//                         </>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// }

// export default Navbar;
