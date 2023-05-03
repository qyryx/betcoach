import { useState } from "react";
import httpClient from "../httpClient";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import betLogo from '../images/loginBg.png';
import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';

const LoginPage = () => {
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const logInUser = async (e) => {
        e.preventDefault()
        try {
            // eslint-disable-next-line
            const response = await httpClient.post("/auth/login", {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                localStorage.setItem("token", response.data.token);
            }
            window.location.href = "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert("Username or password is incorrect");
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
                    <form onSubmit={logInUser}>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1" className="white">
                                <FaIcons.FaRegUser size={18} />
                            </InputGroup.Text>
                            <Form.Control
                                placeholder="Username"
                                aria-describedby="basic-addon1"
                                value={username}
                                onChange={(e) => setEmail(e.target.value)}
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

                        <div className="mb-3">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                    style={{ cursor: "pointer", marginRight: 4 }}
                                />
                                <label className="custom-control-label" htmlFor="customCheck1" style={{ fontSize: 13 }}>
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Log in
                            </button>
                        </div>
                        <div className="forgot-password text-right" style={{ display: 'flex', justifyContent: 'center', textAlign: 'right', fontSize: 13, paddingTop: 10, margin: 0 }}>
                            Don't have an account ? <a href="/register"><div style={{ color: '#0d6efd', paddingLeft: 3 }}>Register</div></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default LoginPage;