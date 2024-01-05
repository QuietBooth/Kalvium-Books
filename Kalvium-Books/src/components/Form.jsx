// Forms.jsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from '../assets/Logo.png';
import '../Form.css';

const Forms = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [formErr, setFormErr] = useState({});
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });
    const [userName, setUserName] = useState('');

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        let errors = validate(formData);
        setFormErr(errors);
        
        let errKeyArray = Object.keys(errors);

        if (errKeyArray.length === 0) {
            localStorage.setItem('userInfo', JSON.stringify(formData));
            setUserName(formData.firstName);
            setFormSubmit(true);
            console.log("registered");
            toast.success('Registration is Sucessfull');
        } else {
            Object.values(errors).forEach((errorMsg) => {
                toast.error(errorMsg);
            });

            setFormSubmit(false);
        }
    };

    const validate = (data) => {
        let error = {};

        if (data.firstName.trim() === '') {
            error.firstName = 'Please enter your first name';
        }
        if (data.lastName.trim() === '') {
            error.lastName = 'Please enter your last name';
        }
        if (data.email.trim() === '') {
            error.email = 'Please enter your email';
        }

        if (data.password.trim() === '') {
            error.password = 'Please enter a password';
        } else if (data.password.trim().length < 8) {
            error.password = 'Password must be at least 8 characters long';
        }

        if (data.confirmPassword.trim() !== data.password.trim()) {
            error.confirmPassword = 'Passwords do not match';
        }

        return error;
    };

    return (
        <div className="Forms-container">
            <ToastContainer />
            <div className="navbar">
                <div className="logo-container">
                    <img className="logo" src={Logo} alt="Logo" />
                    <p className="logo-text">Kalvium Books</p>
                </div>
                {formSubmit && (
                    <div className="user-info">
                        <AccountCircleIcon />
                        <p className="user-name">{userName}</p>
                    </div>
                )}
                <NavLink to="/" className="homeButton">
                    <HomeIcon />
                </NavLink>
            </div>

            <div className="form-container">
                <fieldset id="legend">
                    <legend>Fill this form</legend>
                    {formSubmit ? (
                        <div className="success">
                            <h1 style={{textAlign:"center"}} id="successMsg">Registration Successfull</h1>
                            {/* Home button in success message */}
                            <NavLink to="/" className="homeButton successHomeButton">
                                <HomeIcon style={{ fontSize: '40px' }} />
                            </NavLink>
                        </div>
                    ) : (
                        <form onSubmit={formSubmitHandler}>

                            <label>First Name:</label>
                            <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} />
                            {formErr.firstName && <p className="err">{formErr.firstName}</p>}

                            <label>Last Name:</label>
                            <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} />
                            {formErr.lastName && <p className="err">{formErr.lastName}</p>}

                            <label>Email:</label>
                            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                            {formErr.email && <p className="err">{formErr.email}</p>}

                            <label>Password:</label>
                            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                            {formErr.password && <p className="err">{formErr.password}</p>}

                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                onChange={handleInputChange}
                            />
                            {formErr.confirmPassword && <p className="err">{formErr.confirmPassword}</p>}

                            <input style={{ marginTop: '30px' }} type="submit" value={'Register'} />
                        </form>
                    )}
                </fieldset>
            </div>
        </div>
    );
};

export default Forms;
