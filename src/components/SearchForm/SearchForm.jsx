import React, { useState } from 'react';
import Button from '@avtopro/button/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import Slider from '@avtopro/slider/dist/index';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/mainContext';
import PartModal from '../PartModal/PartModal';
import './SearchForm.css';

const SearchForm = () => {
    const navigate = useNavigate();
    const { models, user, partsList } = useStore();
    const [openModal, setOpenModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenModal = () => {
        setOpenModal((prev) => !prev);
        models.getModels();
    };

    console.log(partsList.minMaxValue);

    const slider = (value) => {
        if (value[0] === 0 && value[1] === 100) {
            return partsList.carCards;
        }
        return partsList.carCards.filter(
            (item) => item.mileage >= value[0] && item.mileage <= value[1]
        );
    };

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    user.logout();
                    navigate('/login');
                }}
            >
                Logout
            </button>
            <div className="search__wrapper">
                <TextInput
                    value={partsList.search}
                    onChange={(e) => {
                        partsList.search = e.target.value;
                    }}
                    type="text"
                    className="search__input"
                    autoFocus
                    placeholder="Enter list title..."
                />
                <Button
                    onClick={() => handleOpenModal()}
                    className="search__add"
                    theme="telegram"
                >
                    +
                </Button>
                <Button
                    onClick={() => setOpenFilter((prev) => !prev)}
                    className="search__filter"
                    theme="inverse"
                >
                    Filter
                </Button>
            </div>
            <div className="filter__wrapper">
                {openFilter && (
                    <Slider
                        min={partsList.minMaxValue[0]}
                        max={partsList.minMaxValue[1]}
                        onChange={(value) => {
                            partsList.changeCards(slider(value));
                        }}
                        ariaLabel={['Lower', 'Upper']}
                        defaultValue={partsList.minMaxValue}
                        pearling
                    />
                )}
            </div>
            {openModal && (
                <PartModal
                    modelsList={models.modelsList}
                    setOpenModal={setOpenModal}
                />
            )}
        </>
    );
};

export default observer(SearchForm);
