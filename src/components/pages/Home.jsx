/* eslint-disable arrow-body-style */
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import ListItem from '../ListItem/ListItem';

const Home = () => {
    return (
        <div>
            <SearchForm />
            <div className="listitems">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
            </div>
        </div>
    );
};

export default Home;
