import { useState } from "react";
import httpClient from "../httpClient";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import betLogo from '../images/loginBg.png';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as IoIcons from 'react-icons/io5';

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    function isValidEmail(email) {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(email);
    }

    function samePasswords(password, passwordAgain) {
        return password === passwordAgain;
    }

    const registerUser = async (e) => {
        e.preventDefault()
        if (!isValidEmail(email)) {
            alert("Please enter a valid email");
            return;
        }
        if (!samePasswords(password, passwordAgain)) {
            alert("Passwords don't match");
            return;
        }
        try {
            // eslint-disable-next-line
            await httpClient.post("/auth/register", {
                email,
                username,
                password,
            }, { withCredentials: true });

            window.location.href = "/login";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Forbidden");
            } else if (error.response && error.response.status === 409) {
                alert("Username already exists");
            } else {
                alert("Something went wrong");
                console.log(error)
            }
        }
    };

    return (
        <div className="auth-wrapper bg">
            <div className="flexBox">
                <img src={betLogo} width={280} style={{ marginBottom: 0 }} alt="bet_logo"></img>
                <div className="auth-inner">
                    <form onSubmit={registerUser}>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" className="white">
                                <IoIcons.IoMailOutline size={18} />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Email"
                                aria-describedby="basic-addon1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" className="white">
                                <FaIcons.FaRegUser size={18} />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Username"
                                aria-describedby="basic-addon1"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2" className="white">
                                <FiIcons.FiLock size={18} />
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                aria-describedby="basic-addon2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon2" className="white">
                                <FiIcons.FiLock size={18} />
                            </InputGroup.Text>
                            <Form.Control
                                type="password"
                                placeholder="Password again"
                                aria-describedby="basic-addon2"
                                value={passwordAgain}
                                onChange={(e) => setPasswordAgain(e.target.value)}
                            />
                        </InputGroup>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <div className="forgot-password text-right" style={{ display: 'flex', justifyContent: 'center', textAlign: 'right', fontSize: 13, paddingTop: 10, margin: 0 }}>
                            Already have an account ? <a href="/login"><div style={{ color: '#0d6efd', paddingLeft: 3 }}>Log in</div></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default RegisterPage;