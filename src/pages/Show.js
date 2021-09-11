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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          setShow(results);
          setIsLoading(false);
        }
      }).catch(err => {
        if (isMounted) {
          setError(err.messsage);
          setIsLoading(false);
        }
      });
    return () => { isMounted = false };
  }, [id]);

  console.log('show', show);
  if (isLoading) {
    return (
      <div>
        {isLoading}
      </div>
    )
  }
  if (error) {
    <div>Error Occured: {error}</div>
  }
  return (<div> This is Show Page</div>)
}

export default Show
