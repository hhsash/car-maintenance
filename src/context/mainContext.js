import React, { useContext } from 'react';

export const mainContext = React.createContext(null);

export const useStore = () => {
    const context = useContext(mainContext);

    if (context === null) {
        throw new Error('error');
    }

    return context;
};
