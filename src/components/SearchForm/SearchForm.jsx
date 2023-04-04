import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import Button from '@avtopro/button/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import Slider from '@avtopro/slider/dist/index';
import Modal from '@avtopro/modal/dist/index';
import Select, { Option } from '@avtopro/select/dist/index';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../context/mainContext';
import './SearchForm.css';

const SearchForm = () => {
    const { models } = useStore();
    const [openModal, setOpenModal] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const [search, setSearch] = useState('');
    const [value, setValue] = useState({
        part: {}
    });
    const [part, setPart] = useState({ parts: [] });
    const [count, setCount] = useState(1);

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

    const addMilleage = (e) => {
        setValue((prevState) => ({
            ...prevState,
            milleagePart: e
        }));
    };

    const addPart = () => {
        setPart((prevState) => {
            const isEl = prevState.parts.findIndex(
                (el) => el.label === value.part
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
                parts: [...prevState.parts, { label: value.part, count }]
            };
        });
    };

    const handleOpenModal = () => {
        setOpenModal((prev) => !prev);
        models.getModels();
    };
    const handleCloseModal = () => {
        setOpenModal((prev) => !prev);
    };

    return (
        <>
            <div className="search__wrapper">
                <TextInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
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
            {openFilter && (
                <Slider
                    ariaLabel={['Lower', 'Upper']}
                    defaultValue={[0, 100]}
                    minDistance={10}
                    pearling
                />
            )}
            {openModal && (
                <Modal onClose={() => handleCloseModal()} closeOnClick="true">
                    <h3 className="modal__title">New List Item</h3>
                    <div className="select__wrapper">
                        <Select
                            className="modal__dropdown"
                            searchable="true"
                            placeholder="Model"
                            onChange={(_, newValue) =>
                                handleModelName(newValue)
                            }
                        >
                            {models.modelsList.map((item) => (
                                <Option key={nanoid()} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            className="modal__dropdown"
                            placeholder="Engine"
                            onChange={(_, newValue) =>
                                handleEngineName(newValue)
                            }
                        >
                            {models.modelEngines.map((item) => (
                                <Option key={nanoid()} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            className="modal__dropdown"
                            placeholder="Complectation"
                            onChange={(_, newValue) =>
                                handleModelComplect(newValue)
                            }
                        >
                            {models.modelComplects.map((item) => (
                                <Option key={nanoid()} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            className="modal__dropdown"
                            placeholder="Part Groups"
                            onChange={(_, newValue) =>
                                handlePartsGroups(newValue)
                            }
                        >
                            {models.partsGroups.map((item) => (
                                <Option key={nanoid()} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            className="modal__dropdown"
                            placeholder="Part Sub Groups"
                            onChange={(_, newValue) =>
                                handlePartsSubGroups(newValue)
                            }
                        >
                            {models.partsSubGroups.map((item) => (
                                <Option key={nanoid()} value={item}>
                                    {item}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className="parts__wrapper">
                        <div className="parts__add">
                            <Select
                                className="modal__dropdown"
                                placeholder="Parts"
                                onChange={(_, newValue) =>
                                    handleParts(newValue)
                                }
                            >
                                {models.parts.map((item) => (
                                    <Option key={nanoid()} value={item}>
                                        {item}
                                    </Option>
                                ))}
                            </Select>
                            <TextInput
                                type="number"
                                min="0"
                                onChange={(e) => addMilleage(e.target.value)}
                                placeholder="Milleage"
                            />
                            <TextInput
                                value={count}
                                type="number"
                                min="1"
                                onChange={(e) => setCount(+e.target.value)}
                                placeholder="Count"
                            />
                            <Button onClick={addPart} theme="blue">
                                +
                            </Button>
                        </div>
                        <div className="parts__list">
                            <ul>
                                {part.parts.length > 0 ? (
                                    part.parts.map((item) => (
                                        <li key={nanoid()}>
                                            <span>
                                                {item.label} - {item.count}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <p>Parts not found</p>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className="modal__controls">
                        <Button
                            onClick={() => setOpenModal((prev) => !prev)}
                            theme="inverse"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => setOpenModal((prev) => !prev)}
                            theme="prime"
                        >
                            Add
                        </Button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default observer(SearchForm);
