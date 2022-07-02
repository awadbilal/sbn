import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { IoFilter } from 'react-icons/io5';

function Index({ filter, setFilter, sort, setSort, productsRef }) {
  const SORTING = [
    {
      name: 'Popularity',
      title: 'Popularity',
    },
    {
      name: 'Discount',
      title: 'Discount',
    },
    {
      name: 'Name',
      title: 'Name',
    },
    {
      name: 'Price Down',
      title: 'Price 🠗',
    },
    {
      name: 'Price Up',
      title: 'Price 🠕',
    },
  ];
  const FILTERING = [
    {
      name: 'All Products',
      title: 'All',
    },
    {
      name: 'Sneakers',
      title: 'Sneakers',
    },
    {
      name: 'Hats',
      title: 'Hats',
    },
    {
      name: 'Bags',
      title: 'Bags',
    },
    {
      name: 'Accessories',
      title: 'Accessories',
    },
  ];
  return (
    <Container id='filter' ref={productsRef}>
      <Col xs md={1} lg={1} xxl={1}>
        <IoFilter size={'4rem'} />
      </Col>
      <Col className='innerContainer'>
        <Row className='sortingRow row-equal-height'>
          <Col md={2} lg={2} xxl={2}>
            Sort By
          </Col>
          {SORTING.map(({ name, title }, index) => {
            return (
              <Col md={2} lg={2} xxl={2} key={`sorting${index}`}>
                <button
                  name={name}
                  onClick={(e) => setSort(e.target.name)}
                  className={sort === name ? 'selected' : ''}
                >
                  {title}
                </button>
              </Col>
            );
          })}
        </Row>
        <div>
          <br />
        </div>
        <Row className='filterRow row-equal-height'>
          <Col md={2} lg={2} xxl={2}>
            Category
          </Col>
          {FILTERING.map(({ name, title }, index) => {
            return (
              <Col md={2} lg={2} xxl={2} key={`filtering${index}`}>
                <button
                  name={name}
                  onClick={(e) => setFilter(e.target.name)}
                  className={filter === name ? 'selected' : ''}
                >
                  {title}
                </button>
              </Col>
            );
          })}
        </Row>
      </Col>
    </Container>
  );
}

export default Index;
