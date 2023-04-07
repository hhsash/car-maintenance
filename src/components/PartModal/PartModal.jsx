import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from '@avtopro/modal/dist/index';
import Select, { Option } from '@avtopro/select/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import NumberInput from '@avtopro/number-input/dist/index';
import Button from '@avtopro/button/dist/index';
import { nanoid } from 'nanoid';
import { useStore } from '../../context/mainContext';

const PartModal = ({ setOpenModal }) => {
    const { models, partsList } = useStore();
    const [value, setValue] = useState({
        part: []
    });
    const [part, setPart] = useState({ parts: [] });
    const [count, setCount] = useState('');

    const handleModelName = (newValue) => {
        setValue((prevState) => ({
            ...prevState,
            modelName: newValue[0]
        }));
        models.getModelEngine({ modelName: newValue[0] });
    };

    const handleEngineName = (newValue) => {
        setValue((prevState) => ({
            ...prevState,
            engineName: newValue[0]
        }));
        models.getModelComplect({ engineName: newValue[0], value });
    };

    const handleModelComplect = (newValue) => {
        setValue((prevState) => ({
            ...prevState,
            modelComplect: newValue[0]
        }));
        models.getPartsGroup({ modelComplect: newValue[0], value });
    };

    const handlePartsGroups = (newValue) => {
        setValue((prevState) => ({
            ...prevState,
            partsGroup: newValue[0]
        }));
        models.getPartsSubGroup({ partsGroup: newValue[0], value });
    };

    const handlePartsSubGroups = (newValue) => {
        setValue((prevState) => ({
            ...prevState,
            partsSubGroup: newValue[0]
        }));
        models.getParts({ partsSubGroup: newValue[0], value });
    };

    const handleParts = (newValue) => {
        setValue((prevState) => ({
            ...prevState,
            part: newValue[0]
        }));
    };

    const addMileage = (e) => {
        setValue((prevState) => ({
            ...prevState,
            mileage: e
        }));
    };

    const addPart = () => {
        setPart((prevState) => {
            const isEl = prevState.parts.findIndex(
                (el) => el.partName === value.part
            );
            if (isEl !== -1) {
                const parts = [...prevState.parts];
                parts[isEl].count += count;
                return {
                    ...prevState,
                    parts
                };
            }
            return {
                ...prevState,
                parts: [...prevState.parts, { partName: value.part, count }]
            };
        });
    };

    const addCard = () => {
        partsList.sendCard(value, part);
        partsList.getCards();
        setOpenModal((prev) => !prev);
    };

    const handleCloseModal = () => {
        setOpenModal((prev) => !prev);
    };

    return (
        <Modal
            size="wider"
            onClose={() => handleCloseModal()}
            closeOnClick="true"
        >
            <h3 className="modal__title">New List Item</h3>
            <div
                className="grid-base"
                style={{
                    '--g-columns': '2'
                }}
            >
                <Select
                    searchable="true"
                    placeholder="Model"
                    onChange={(_, newValue) => handleModelName(newValue)}
                >
                    {models.modelsList.map((item) => (
                        <Option key={nanoid()} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Engine"
                    onChange={(_, newValue) => handleEngineName(newValue)}
                >
                    {models.modelEngines.map((item) => (
                        <Option key={nanoid()} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Complectation"
                    onChange={(_, newValue) => handleModelComplect(newValue)}
                >
                    {models.modelComplects.map((item) => (
                        <Option key={nanoid()} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Part Groups"
                    onChange={(_, newValue) => handlePartsGroups(newValue)}
                >
                    {models.partsGroups.map((item) => (
                        <Option key={nanoid()} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <Select
                    placeholder="Part Sub Groups"
                    onChange={(_, newValue) => handlePartsSubGroups(newValue)}
                >
                    {models.partsSubGroups.map((item) => (
                        <Option key={nanoid()} value={item}>
                            {item}
                        </Option>
                    ))}
                </Select>
                <NumberInput
                    min="0"
                    onChange={(e) => addMileage(e.target.value)}
                    placeholder="Mileage..."
                />
            </div>
            <div className="parts__wrapper">
                <div className="parts__add grid-base">
                    <Select
                        className="g-col-7"
                        placeholder="Parts..."
                        onChange={(_, newValue) => handleParts(newValue)}
                    >
                        {models.parts.map((item) => (
                            <Option key={nanoid()} value={item}>
                                {item}
                            </Option>
                        ))}
                    </Select>
                    <TextInput
                        className="g-col-4"
                        value={count}
                        type="number"
                        min="1"
                        onChange={(e) => setCount(+e.target.value)}
                        placeholder="Count..."
                    />
                    <Button className="g-col-1" onClick={addPart} theme="blue">
                        +
                    </Button>
                </div>
                <div className="parts__list">
                    <ul>
                        {part.parts.length > 0 ? (
                            part.parts.map((item) => (
                                <li key={nanoid()}>
                                    <span>
                                        {item.partName} - {item.count}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <p>Parts not added</p>
                        )}
                    </ul>
                </div>
            </div>
            <div className="modal__controls grid-base">
                <Button
                    className="g-col-6"
                    onClick={() => setOpenModal((prev) => !prev)}
                    theme="inverse"
                >
                    Cancel
                </Button>
                <Button
                    className="g-col-6"
                    onClick={() => addCard()}
                    theme="prime"
                >
                    Add
                </Button>
            </div>
        </Modal>
    );
};

export default observer(PartModal);
