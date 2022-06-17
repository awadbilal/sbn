import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { HiUpload } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';
import Banner from '../../Shared/Banner';

function Index() {
  // const [image, setImage] = useState();
  const [message, setMessage] = useState();

  const handleUpload = () => {
    // upload image
  };

  const handleSubmit = () => {
    // Submit form
  };

  return (
    <div id='customization'>
      <Banner title='Personal Cutomization' />
      <Container className='mt-5 mb-5'>
        <Row className='row-equal-height' align='middle'>
          <Col
            md={6}
            lg={6}
            xxl={6}
            align='middle'
            className='uploadImageColumn'
          >
            <div className='uploadImage' onClick={handleUpload}>
              Upload an image
            </div>
            <p>
              <button onClick={handleUpload}>
                <HiUpload size={30} />
              </button>
              Upload Image
            </p>
          </Col>
          <Col md={6} lg={6} xxl={6}>
            <div className='formInfo'>
              <p>Description</p>
              <textarea
                placeholder='I would like a size 41 shoes similar to the one in the photo...'
                value={message}
                onChange={(e) => setMessage(e)}
              />
              <span>
                <button onClick={handleSubmit}>
                  <BsArrowRight size={30} />
                </button>
                Submit
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Index;
