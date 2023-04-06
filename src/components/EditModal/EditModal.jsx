import React, { useState } from 'react';
import Button from '@avtopro/button/dist/index';
import Modal from '@avtopro/modal/dist/index';
import TextInput from '@avtopro/text-input/dist/index';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../context/mainContext';

const EditModal = ({ currentEdit, setOpenEditModal }) => {
    const { partsList } = useStore();
    const [changedMileage, setChangedMileage] = useState(currentEdit.mileage);

    return (
        <Modal closeOnClick="true">
            <p>
                {currentEdit.modelName} {currentEdit.complecationName}
            </p>
            <p>
                Mileage: {currentEdit.mileage} km
                <br />
                Edit mileage:
            </p>
            <TextInput
                value={changedMileage}
                type="number"
                placeholder="Mileage..."
                onChange={(e) => setChangedMileage(e.target.value)}
            />
            <div className="modal__controls">
                <Button
                    onClick={() => setOpenEditModal((prev) => !prev)}
                    theme="inverse"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    onClick={async () => {
                        await partsList.updateCard(currentEdit, changedMileage);
                        await partsList.getCards();
                        setOpenEditModal((prev) => !prev);
                    }}
                    theme="prime"
                >
                    Add
                </Button>
            </div>
        </Modal>
    );
};

export default observer(EditModal);
