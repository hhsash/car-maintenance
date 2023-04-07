import React, { useState } from 'react';
import Button from '@avtopro/button/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import Slider from '@avtopro/slider/dist/index';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../context/mainContext';
import PartModal from '../PartModal/PartModal';

const SearchForm = () => {
    const { models, partsList } = useStore();
    const [openModal, setOpenModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenModal = () => {
        setOpenModal((prev) => !prev);
        models.getModels();
    };

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
            <div className="search__wrapper grid-base">
                <TextInput
                    value={partsList.search}
                    onChange={(e) => {
                        partsList.search = e.target.value;
                    }}
                    type="text"
                    className="search__input g-col-10"
                    autoFocus
                    placeholder="Enter list title..."
                />
                <Button
                    onClick={() => handleOpenModal()}
                    className="search__add g-col-1"
                    theme="telegram"
                >
                    +
                </Button>
                {partsList.carCards.length > 0 && (
                    <Button
                        onClick={() => setOpenFilter((prev) => !prev)}
                        className="search__filter g-col-1"
                        theme="inverse"
                    >
                        Filter
                    </Button>
                )}
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
