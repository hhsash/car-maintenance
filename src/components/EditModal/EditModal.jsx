import React, { useState } from 'react';
import Button from '@avtopro/button/dist/index';
import Modal from '@avtopro/modal/dist/index';
import NumberInput from '@avtopro/number-input/dist/index';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../context/mainContext';

const EditModal = ({ currentEdit, setOpenEditModal }) => {
    const { partsList } = useStore();
    const [changedMileage, setChangedMileage] = useState(currentEdit.mileage);

    return (
        <Modal
            size="wide"
            onClose={() => setOpenEditModal()}
            closeOnClick="true"
        >
            <h3 className="modal__title">
                {currentEdit.modelName} {currentEdit.complecationName}
            </h3>
            <p>
                Mileage: {currentEdit.mileage} km
                <br />
                Edit mileage:
            </p>
            <NumberInput
                value={changedMileage}
                placeholder="Mileage..."
                onChange={(e) => setChangedMileage(e.target.value)}
            />
            <div className="modal__controls grid-base">
                <Button
                    onClick={() => setOpenEditModal((prev) => !prev)}
                    theme="inverse"
                    className="g-col-6"
                >
                    Cancel
                </Button>
                <Button
                    onClick={async () => {
                        await partsList.updateCard(currentEdit, changedMileage);
                        await partsList.getCards();
                        setOpenEditModal((prev) => !prev);
                    }}
                    theme="prime"
                    className="g-col-6"
                >
                    Add
                </Button>
            </div>
        </Modal>
    );
};

export default observer(EditModal);
