import { message } from 'antd';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BsArrowRight } from 'react-icons/bs';
import { db } from '../../../../firebaseconfig';

function Index() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    if (Object.values(formData).includes('')) {
      return message.warn('Please fill all fields then try again');
    }
    const date = new Date();
    console.log('🚀 ~ file: index.jsx ~ line 28 ~ handleClick ~ date', date);
    const q = query(collection(db, 'messages'), orderBy('id', 'desc'));
    const querySnapshot = await getDocs(q);
    const docRef = await addDoc(collection(db, 'messages'), {
      ...formData,
      date: `${new Date()}`,
      id:
        Array.isArray(querySnapshot?.docs) && querySnapshot?.docs.length !== 0
          ? querySnapshot.docs[0].data().id + 1
          : 0,
    })
      .then(() => {
        message.success('Your message has been received');
      })
      .catch((err) => {
        message.warn(
          'There was a problem sending your message, please try again'
        );
      });
  };

  const formInputs = [
    {
      title: 'Name Surname',
      value: formData.name,
      placeHolder: 'e.g. John Doe',
      name: 'name',
      type: 'text',
    },
    {
      title: 'Email',
      value: formData.email,
      placeHolder: 'e.g. John.Doe@gmail.com',
      name: 'email',
      type: 'email',
    },
    {
      title: 'Subject',
      value: formData.subject,
      placeHolder: 'e.g. Collaboration Opportunity',
      name: 'subject',
      type: 'text',
    },
    {
      title: 'Message',
      value: formData.message,
      placeHolder:
        'e.g. Lets have a meeting to discuss an expanding opportunity at the time of your convenience.',
      name: 'message',
      type: 'textarea',
    },
  ];

  return (
    <Container className='emailForm mt-5 mb-4'>
      <h1>For collaboration, issues, or requests</h1>
      {formInputs.map(({ title, value, placeHolder, name, type }, i) => {
        return (
          <Row className='row-equal-height' key={`${title}${i}`}>
            <Col md={2} lg={2} xl={2} className='formTitle'>
              <p>{title}</p>
            </Col>
            <Col md={5} lg={5} xl={5} className='formInput'>
              {type === 'textarea' ? (
                <textarea
                  placeholder={placeHolder}
                  value={value}
                  onChange={(e) => handleChange(e)}
                  name={name}
                />
              ) : (
                <input
                  type={type}
                  placeholder={placeHolder}
                  value={value}
                  onChange={(e) => handleChange(e)}
                  name={name}
                />
              )}
            </Col>
          </Row>
        );
      })}
      <span>
        <button onClick={handleClick}>
          <BsArrowRight size={30} />
        </button>{' '}
        Submit
      </span>
    </Container>
  );
}

export default Index;
