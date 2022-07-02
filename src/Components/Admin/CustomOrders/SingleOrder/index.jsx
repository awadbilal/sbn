/* eslint-disable jsx-a11y/img-redundant-alt */

import React from 'react';
import { Container } from 'react-bootstrap';
import { Card } from 'antd';

function Index({ item }) {
  return (
    <Container
      className='singleOrder site-card-wrapper'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        title='Product Image'
        bordered
        hoverable
        cover={
          <img
            alt='Preview Image'
            src={item}
            style={{
              maxWidth: '420px',
              maxHeight: '420px',
              objectFit: 'cover',
            }}
          />
        }
        style={{
          alignSelf: 'center',
          width: '500px',
          height: '500px',
          maxWidth: '500px',
          maxHeight: '500px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      ></Card>
    </Container>
  );
}

export default Index;
