// App.jsx

import React from "react";
import { BrowserRouter } from "react-router-dom";
// import Navbar from "./components/Navbar";
import AllRoutes from "./Routes/AllRoutes";
import "./index.css";

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    {/* <Navbar /> */}
                    <AllRoutes />
                </div>
            </BrowserRouter>
        );
    }
}
