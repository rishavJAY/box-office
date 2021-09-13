import { useReducer, useEffect } from 'react';

// all hooks are function regardless they are normal or custom hooks
// useReducer also have 3rd argument which is initializer function

function showsReducer(prevState, action) {
    switch(action.type){

        case 'ADD': {
            return [...prevState, action.showId]
        }

        case 'REMOVE': {
            return prevState.filter((showId) => showId !== action.showId);
        }

        default: 
            return prevState;
    }
}

function usePersistentReducer(reducer, initialState, key) {

    const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
        const persisted = localStorage.getItem(key);

        return persisted ? JSON.parse(persisted) : initial;
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));

    }, [state, key]);


    return [state, dispatch];
}

export function useShows(key = 'shows') {
    return usePersistentReducer(showsReducer, [], key);
    // above empty array is for initial State
}


// useEffect 2nd argument is array where key will not change(it is for removing warning)