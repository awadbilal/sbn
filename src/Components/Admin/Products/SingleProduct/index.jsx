import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
} from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../../../../firebaseconfig';
const { TextArea } = Input;

function Index({ item }) {
  const [componentDisabled, setComponentDisabled] = useState(true);

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  const onFinish = async (values) => {
    const batch = await writeBatch(db);
    let valuesToSend = await { ...item, ...values };
    const sfRef = await doc(db, 'products', item.docRef);
    batch.update(sfRef, valuesToSend);
    message.success('Product has been updated successfully.');
    setComponentDisabled(true);
    await batch.commit();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Container className='singleProduct'>
      <Form
        initialValues={item}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label='Title'
          name='title'
          rules={[{ required: true, message: 'Please provide a title!' }]}
        >
          <Input placeholder='Alien Sneakers' disabled={componentDisabled} />
        </Form.Item>

        <Form.Item
          label='Category'
          name='category'
          rules={[{ required: true, message: 'Please select a category.' }]}
        >
          <Select disabled={componentDisabled}>
            <Select.Option value='Sneakers'>Sneakers</Select.Option>
            <Select.Option value='Hats'>Hats</Select.Option>
            <Select.Option value='Bags'>Bags</Select.Option>
            <Select.Option value='Accessories'>Accessories</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label='Price'
          name='price'
          rules={[{ required: true, message: 'Please provide a price!' }]}
        >
          <InputNumber placeholder='250 &#8378;' disabled={componentDisabled} />
        </Form.Item>

        <Form.Item
          label='Discount'
          name='discount'
          rules={[
            {
              required: true,
              message: 'Please provide a discount rate (if none type 0)!',
            },
          ]}
        >
          <InputNumber placeholder='10' disabled={componentDisabled} />
        </Form.Item>

        <Form.Item
          label='Quantity'
          name='quantity'
          rules={[
            {
              required: true,
              message: 'Please provide available quantity!',
            },
          ]}
        >
          <InputNumber placeholder='10' disabled={componentDisabled} />
        </Form.Item>

        {!componentDisabled && (
          <Form.Item
            name='image'
            label='Main Display Image'
            valuePropName='image'
            getValueFromEvent={normFile}
            extra='Main image to be displayed'
          >
            <Upload name='logo' action='/upload.do' listType='picture'>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        )}

        {!componentDisabled && (
          <Form.Item label='Dragger'>
            <Form.Item
              name='gallery'
              valuePropName='gallery'
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger
                name='files'
                action='/upload.do'
                listType='picture'
              >
                <p className='ant-upload-drag-icon'>
                  <InboxOutlined />
                </p>
                <p className='ant-upload-text'>
                  Click or drag an image to this area to upload
                </p>
                <p className='ant-upload-hint'>
                  Support for a single or bulk upload.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        )}

        <Form.Item
          label='Description'
          name='description'
          rules={[{ required: true, message: 'Please provide a description!' }]}
        >
          <TextArea rows={6} disabled={componentDisabled} />
        </Form.Item>

        <div className='buttonSection'>
          <Form.Item>
            <Button
              htmlType='reset'
              onClick={() => setComponentDisabled(!componentDisabled)}
            >
              {componentDisabled ? 'Edit' : 'Cancel'}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' disabled={componentDisabled}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Container>
  );
}

export default Index;
