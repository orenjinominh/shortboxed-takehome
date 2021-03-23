

import React, { useState, useEffect } from 'react';



export default function App(props) {

  let paramID = props.id; 
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect (() => {
    fetch(`http://localhost:4000/api/cbcs/json/${paramID}`)
      .then((res) => res.json()) 
      .then(
        (data) => {
          setData([...data]);
          setLoading(false);
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
  }, [paramID]);

  if (error) {
    return <div>Fetch request error: {error.message}</div>;
  } else if (isLoading) {
    return <h2>Loading data... </h2>;
  } else {
    return (
      <div> 
        <h1>CBCS Metadata Crawling Machine</h1>
        <p>Instructions: place the ID string of the comic you'd like to extract metadata from to the end of the URL above. Enjoy!</p>
        {console.log('data here inside render block', data)}
        <ul>
          <li>{data[0].title}</li>
          <li>{data[0].publisher}</li>
          <li>{data[0].grade}</li>
        </ul>
      </div>
    );
  }
}