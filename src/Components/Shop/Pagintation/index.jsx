/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

function Index({ page, pageCount, nextPage, prevPage }) {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < pageCount; i++) {
      if (page === i + 1) newArr.push(<div className='active innerDiv'></div>);
      else if (i + 1 > page)
        newArr.push(
          <div className='innerDiv' onClick={() => nextPage()}></div>
        );
      else if (i + 1 < page)
        newArr.push(
          <div className='innerDiv' onClick={() => prevPage()}></div>
        );
    }
    setArr(newArr);
  }, [page, pageCount]);

  return (
    <Container id='pagintation'>
      {pageCount >= 1 &&
        arr.map((item, index) => {
          return (
            <div className='outerDiv' key={index}>
              {item}
            </div>
          );
        })}
    </Container>
  );
}

export default Index;
