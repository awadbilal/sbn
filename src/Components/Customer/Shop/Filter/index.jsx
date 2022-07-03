import React from 'react';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import { BsArrowDown } from 'react-icons/bs';
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
      <Col xs md={1} lg={1} xxl={1} className='remove desktop'>
        <IoFilter size={'4rem'} />
      </Col>
      <Col className='innerContainer desktop'>
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
        <Row className='row-equal-height'>
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

      <Col className='innerContainer mobile' sm={12} md={12} lg={12}>
        <Row className='row-equal-height'>
          <Col md={5} sm={5} lg={5}>
            <Dropdown
              className='sizeDropDown mt-4'
              onSelect={(e) => setSort(e)}
            >
              <Dropdown.Toggle id='dropdown-autoclose-true'>
                <span className='dropDownText ps-2 pe-2'>
                  {sort ? (
                    SORTING.filter((item) => item.name === sort)[0]?.title
                  ) : (
                    <>
                      <span>Sort By</span>
                      <BsArrowDown size={22} color='#ee3364' />
                    </>
                  )}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu flip={false} className='dropDownMenu'>
                {SORTING.map(({ title, name }, i) => (
                  <Dropdown.Item key={`sorting${name}`} eventKey={name}>
                    {title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col md={5} sm={5} lg={5}>
            <Dropdown
              className='sizeDropDown mt-4'
              onSelect={(e) => setFilter(e)}
            >
              <Dropdown.Toggle id='dropdown-autoclose-true'>
                <span className='dropDownText ps-2 pe-2'>
                  {filter ? (
                    FILTERING.filter((item) => item.name === filter)[0]?.title
                  ) : (
                    <>
                      <span>Category</span>
                      <BsArrowDown size={22} color='#ee3364' />
                    </>
                  )}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu flip={false} className='dropDownMenu'>
                {FILTERING.map(({ title, name }, i) => (
                  <Dropdown.Item key={`filtering${name}`} eventKey={name}>
                    {title}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default Index;
