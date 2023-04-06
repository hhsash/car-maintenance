/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ItemCard from '@avtopro/item-card/dist/index';
import Button from '@avtopro/button/dist/index';
import Modal from '@avtopro/modal/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import RobotPreloader from '@avtopro/preloader/dist/index';
import SearchForm from '../components/SearchForm/SearchForm';
import { useStore } from '../context/mainContext';
import EditModal from '../components/EditModal/EditModal';

const Home = () => {
    const { partsList } = useStore();
    const [openEditModal, setOpenEditModal] = useState(false);
    const [currentEdit, setCurrentEdit] = useState({});
    const [changedMileage, setChangedMileage] = useState(currentEdit.mileage);

    useEffect(() => {
        partsList.getCards();
    }, []);

    return (
        <div>
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
                <div className="listitems">
                    {partsList.searchFilter.length > 0 ? (
                        partsList.searchFilter.map((item) => (
                            <ItemCard
                                title={
                                    <div>
                                        <span>
                                            {item.modelName}{' '}
                                            {item.complecationName}
                                        </span>
                                        <p>{item.mileage} km</p>
                                    </div>
                                }
                                controls={[
                                    <span
                                        key="1"
                                        onClick={() => {
                                            setCurrentEdit({
                                                ...item
                                            });
                                            setOpenEditModal((prev) => !prev);
                                        }}
                                    >
                                        Update
                                    </span>,
                                    <Button
                                        key="2"
                                        theme="danger"
                                        type="button"
                                        onClick={() => {
                                            partsList.deleteCard(item);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                ]}
                                key={item.id}
                            >
                                <div className="itemcard__block">
                                    <ul>
                                        {item.parts.map((part) => (
                                            <li key={part.id}>
                                                {part.partName} - {part.count}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </ItemCard>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center' }}>
                            Cards not found...
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default observer(Home);
