import React from 'react';
import { Button, Form, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { doc, writeBatch } from 'firebase/firestore';
import { db, storage } from '../../../../firebaseconfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

function Index() {
  const handleImageUpload = async (values) => {
    const keys = [
      'sneakers',
      'bags',
      'hats',
      'accessories',
      'sneakersSquare',
      'accessoriesSquare',
    ];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (values[key] && values[key].file) {
        const imageRef = ref(storage, `${values[key].file.name + v4()}`);
        uploadBytes(imageRef, values[key].file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            handleUpdateData({ [key]: url });
          });
        });
      }
    }
  };

  const handleUpdateData = async (data) => {
    const batch = await writeBatch(db);
    const sfRef = await doc(db, 'layout', 'categories');
    batch.update(sfRef, data);
    await batch.commit();
  };

  const onFinish = async (values) => {
    handleImageUpload(values);
  };

  const onFinishFailed = (errorInfo) => {
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.warn(errorInfo.errorFields[i].errors[0]);
    }
  };

  const handleUpload = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 2000);
  };

  return (
    <div>
      <h1>Edit Categories display</h1>
      <Form
        style={{ marginTop: '3rem' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label='Sneakers'
          name='sneakers'
          extra='It has to be 16:9 ratio (Portrait)'
        >
          <Upload customRequest={handleUpload} maxCount='1'>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label='Hats'
          name='hats'
          extra='It has to be a squared picture'
        >
          <Upload customRequest={handleUpload} maxCount='1'>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label='Bags'
          name='bags'
          extra='It has to be a squared picture'
        >
          <Upload customRequest={handleUpload} maxCount='1'>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label='Accessories'
          name='accessories'
          extra='It has to be 9:16 ratio (Landscape)'
        >
          <Upload customRequest={handleUpload} maxCount='1'>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label='Sneakers Squared'
          name='sneakersSquare'
          extra='It has to be a squared picture'
        >
          <Upload customRequest={handleUpload} maxCount='1'>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label='Accessories Squared'
          name='accessoriesSquare'
          extra='It has to be a squared picture'
        >
          <Upload customRequest={handleUpload} maxCount='1'>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
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
