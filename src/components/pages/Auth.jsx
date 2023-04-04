import Button from '@avtopro/button/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/mainContext';
import './Auth.css';

const Login = () => {
    const { user } = useStore();
    const [values, setValues] = useState({});
    const [authMode, setAuthMode] = useState(true);
    const navigate = useNavigate();
    const handleUser = (e) => {
        const { value } = e.target;
        const { name } = e.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitLogin = (e) => {
        e.preventDefault();
        user.login(values);
        navigate('/');
    };

    const onSubmitReg = (e) => {
        e.preventDefault();
        user.reg(values);
    };
    return (
        <div className="auth__wrapper">
            <div className="auth__tabs">
                <Button type="button" onClick={() => setAuthMode(true)}>
                    Sign In
                </Button>
                <Button type="button" onClick={() => setAuthMode(false)}>
                    Sign Up
                </Button>
            </div>
            <div className="auth__form">
                {authMode ? (
                    <form onSubmit={onSubmitLogin}>
                        <TextInput
                            value={values.email}
                            name="email"
                            onChange={handleUser}
                            type="text"
                            placeholder="E-mail..."
                        />
                        <TextInput
                            value={values.password}
                            name="password"
                            onChange={handleUser}
                            type="password"
                            placeholder="Password..."
                        />
                        <Button theme="prime" type="submit">
                            Login
                        </Button>
                    </form>
                ) : (
                    <form onSubmit={onSubmitReg}>
                        <TextInput
                            value={values.email}
                            name="email"
                            onChange={handleUser}
                            type="text"
                            placeholder="E-mail..."
                        />
                        <TextInput
                            value={values.password}
                            name="password"
                            onChange={handleUser}
                            type="password"
                            placeholder="Password..."
                        />
                        <Button theme="prime" type="submit">
                            Register
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
