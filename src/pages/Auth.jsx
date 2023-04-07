import React, { useState } from 'react';
import Button from '@avtopro/button/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import { observer } from 'mobx-react-lite';
import Modal from '@avtopro/modal/dist/index';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/mainContext';

const Auth = () => {
    const { user } = useStore();
    const navigate = useNavigate();
    const [values, setValues] = useState({});
    const [authMode, setAuthMode] = useState(true);

    const handleUser = (e) => {
        const { value } = e.target;
        const { name } = e.target;
        setValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        await user.login(values);
        if (user.state === 'done') {
            navigate('/');
        }
    };

    const onSubmitReg = async (e) => {
        e.preventDefault();
        await user.register(values);
    };

    return (
        <Modal style={{ width: '400px !important' }} className="auth__wrapper">
            <div
                className="auth__tabs grid-base"
                style={{
                    '--g-columns': '2'
                }}
            >
                <Button type="button" onClick={() => setAuthMode(true)}>
                    Sign In
                </Button>
                <Button type="button" onClick={() => setAuthMode(false)}>
                    Sign Up
                </Button>
            </div>
            <div className="auth__form">
                {authMode ? (
                    <form className="grid-base" onSubmit={onSubmitLogin}>
                        <TextInput
                            className="g-col-12"
                            name="email"
                            onChange={handleUser}
                            type="text"
                            placeholder="E-mail..."
                        />
                        <TextInput
                            className="g-col-12"
                            name="password"
                            onChange={handleUser}
                            type="password"
                            placeholder="Password..."
                        />
                        <Button className="g-col-12" theme="blue" type="submit">
                            Login
                        </Button>
                    </form>
                ) : (
                    <form className="grid-base" onSubmit={onSubmitReg}>
                        <TextInput
                            className="g-col-12"
                            name="email"
                            onChange={handleUser}
                            type="text"
                            placeholder="E-mail..."
                        />
                        <TextInput
                            className="g-col-12"
                            name="password"
                            onChange={handleUser}
                            type="password"
                            placeholder="Password..."
                        />
                        <Button className="g-col-12" theme="blue" type="submit">
                            Register
                        </Button>
                    </form>
                )}
            </div>
        </Modal>
    );
};

export default observer(Auth);
