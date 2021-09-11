import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../misc/config';

// Custom hooks are needed for getting id from url
// Custom hooks are hooks that are build on top of standard react hooks
// that are from react package such as useState() and react-router-dom comes with 
// a set of custom hooks  

// useEffect allows us to hook into different component life cycle event
// componentdidMount, .... (two arguments)
// 1. callback function (which executes when something changes)
// in 2nd argument (array of dependencies)

const Show = () => {
    const { id } = useParams();
    const [show, setShow] = useState(null);

    useEffect( () => {
        apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
        .then( results => {
            setShow(results);
        });
    }, [id] );

    console.log('show', show);
    return (
        <div>
            c
        </div>
    )
}

export default Show
