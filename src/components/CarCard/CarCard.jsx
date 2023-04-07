import React from 'react';
import ItemCard from '@avtopro/item-card/dist/index';
import Button from '@avtopro/button/dist/index';
import { useStore } from '../../context/mainContext';

const CarCard = ({ item, setCurrentEdit, setOpenEditModal }) => {
    const { partsList } = useStore();
    return (
        <ItemCard
            className="g-col-6"
            title={
                <div>
                    <span>
                        {item.modelName} {item.complecationName}
                    </span>
                    <p>{item.mileage} km</p>
                </div>
            }
            controls={[
                <Button
                    key="1"
                    blockSize="sm"
                    theme="white"
                    square
                    onClick={() => {
                        setCurrentEdit({
                            ...item
                        });
                        setOpenEditModal((prev) => !prev);
                    }}
                >
                    Update
                </Button>,
                <Button
                    key="2"
                    blockSize="sm"
                    theme="danger"
                    square
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
    );
};

export default CarCard;
