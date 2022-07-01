import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { doc, writeBatch } from 'firebase/firestore';
import { db } from '../../../../firebaseconfig';

function Index({ footerInfo }) {
  const onFinish = async (values) => {
    const batch = await writeBatch(db);
    const sfRef = await doc(db, 'layout', 'footer');
    const valuesToSend = {
      instagram: values.instagram,
      whatsapp: values.whatsapp.split(' ').join(''),
      email: values.email,
    };
    batch.update(sfRef, valuesToSend);
    message.success('Footer has been updated successfully.');
    await batch.commit();
  };

  const onFinishFailed = (errorInfo) => {
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.warn(errorInfo.errorFields[i].errors[0]);
    }
  };

  return (
    <div>
      <h1>Edit Footer</h1>
      <Form
        style={{ marginTop: '3rem' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        defaultValue={footerInfo}
      >
        <Form.Item
          label='Instagram'
          name='instagram'
          rules={[{ required: true, message: 'Please provide a title!' }]}
        >
          <Input
            type='url'
            placeholder='https://www.instagram.com/splash_bynoor/'
          />
        </Form.Item>

        <Form.Item
          label='Whatsapp'
          name='whatsapp'
          rules={[{ required: true, message: 'Please provide a number!' }]}
        >
          <Input type='number' placeholder='545 545 54 54' />
        </Form.Item>

        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please provide an email!' }]}
        >
          <Input type='email' placeholder='help@sbn.com' />
        </Form.Item>

        <div className='buttonSection'>
          <Form.Item>
            <Button htmlType='submit'>Save changes</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default Index;
