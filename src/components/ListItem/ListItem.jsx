import React from 'react';
import './ListItem.css';

const ListItem = () => (
    <div className="listitem__wrapper">
        <div className="listitem">
            <div className="listitem__header">
                <span className="listitem__title">Title</span>
                <span className="listitem__edit">Edit</span>
            </div>
            <div className="listitem__body" />
        </div>
    </div>
);

export default ListItem;
