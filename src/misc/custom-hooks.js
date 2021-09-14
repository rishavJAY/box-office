import { useState, useReducer, useEffect, useRef, useCallback } from 'react';
import { apiGet } from './config';

// all hooks are function regardless they are normal or custom hooks
// useReducer also have 3rd argument which is initializer function

function showsReducer(prevState, action) {
    switch (action.type) {

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

export function useLastQuery(key = 'lastQuery') {
    const [input, setInput] = useState(() => {
        const persisted = sessionStorage.getItem(key);

        return persisted ? JSON.parse(persisted) : '';
    });

    // key will not change so its new copy will not be created
    const setPersistedInput = useCallback(newState => {
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState));

    }, [key]);

    return [input, setPersistedInput];
}

const reducer = (prevState, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS': {
        return { isLoading: false, error: null, show: action.show };
      }
      case 'FETCH_FAILED': {
        return { isLoading: false, error: action.error };
      }
      default: return prevState;
    }
  };

export function useShow(showId) {
    const [state, dispatch] = useReducer(reducer, {
        show: null,
        isLoading: true,
        error: null
      });

    useEffect(() => {
        let isMounted = true;

        apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
            .then(results => {
                if (isMounted) {
                    dispatch({ type: 'FETCH_SUCCESS', show: results })
                }
            }).catch(err => {
                if (isMounted) {
                    dispatch({ type: 'FETCH_FAILED', error: err.message })
                }
            });
        return () => { isMounted = false };
    }, [showId]);

    return state;
}

// useEffect 2nd argument is array where key will not change(it is for removing warning)

// Hook
export function useWhyDidYouUpdate(name, props) {
    // Get a mutable ref object where we can store props ...
    // ... for comparison next time this hook runs.
    const previousProps = useRef();
    useEffect(() => {
      if (previousProps.current) {
        // Get all keys from previous and current props
        const allKeys = Object.keys({ ...previousProps.current, ...props });
        // Use this object to keep track of changed props
        const changesObj = {};
        // Iterate through keys
        allKeys.forEach((key) => {
          // If previous is different from current
          if (previousProps.current[key] !== props[key]) {
            // Add to changesObj
            changesObj[key] = {
              from: previousProps.current[key],
              to: props[key],
            };
          }
        });
        // If changesObj not empty then output to console
        if (Object.keys(changesObj).length) {
          console.log("[why-did-you-update]", name, changesObj);
        }
      }
      // Finally update previousProps with current props for next hook call
      previousProps.current = props;
    });
  }