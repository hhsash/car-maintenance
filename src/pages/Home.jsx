import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Button from '@avtopro/button/dist/index';
import Banner from '@avtopro/banner/dist/index';
import RobotPreloader from '@avtopro/preloader/dist/index';
import SearchForm from '../components/SearchForm/SearchForm';
import { useStore } from '../context/mainContext';
import EditModal from '../components/EditModal/EditModal';
import CarCard from '../components/CarCard/CarCard';

const Home = () => {
    const navigate = useNavigate();
    const { partsList, user } = useStore();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [currentEdit, setCurrentEdit] = useState({});

    useEffect(() => {
        partsList.getCards();
    }, []);

    return (
        <div>
            <div className="header grid-base">
                <h1 className="g-col-10">Car Maintenance</h1>
                <Button
                    square
                    theme="danger"
                    onClick={() => {
                        user.logout();
                        navigate('/login');
                    }}
                >
                    Log out
                </Button>
            </div>
            {openEditModal && (
                <EditModal
                    currentEdit={currentEdit}
                    setOpenEditModal={setOpenEditModal}
                />
            )}
            <SearchForm />
            {partsList.state === 'loading' && (
                <RobotPreloader title="Loading..." />
            )}
            {partsList.state === 'done' && (
                <div>
                    {partsList.searchFilter.length > 0 ? (
                        <div
                            className="grid-base"
                            style={{
                                rowGap: '20px'
                            }}
                        >
                            {partsList.searchFilter.map((item) => (
                                <CarCard
                                    key={item.id}
                                    item={item}
                                    setCurrentEdit={setCurrentEdit}
                                    setOpenEditModal={setOpenEditModal}
                                />
                            ))}
                        </div>
                    ) : (
                        <Banner header="Cards not found!" mode="attention">
                            <div>
                                Add new cards and they will be displayed here.
                            </div>
                        </Banner>
                    )}
                </div>
            )}
        </div>
    );
};

export default observer(Home);
