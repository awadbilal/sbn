import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Upload,
  Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { writeBatch, doc } from 'firebase/firestore';
import { db, storage } from '../../../../firebaseconfig';
import { v4 } from 'uuid';
const { TextArea } = Input;

function Index({ item }) {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < item.gallery.length; i++) {
      newArr.push({ url: item.gallery[i] });
    }
    setFileList(newArr);
  }, []);

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const onFinish = async (values) => {
    const batch = await writeBatch(db);
    const newArr = [];
    for (let i = 0; i < fileList.length; i++) {
      newArr.push(fileList[i].url);
    }
    let valuesToSend = await { ...item, ...values, gallery: newArr };
    const sfRef = await doc(db, 'products', item.docRef);
    batch.update(sfRef, valuesToSend);
    message.success('Product has been updated successfully.');
    setComponentDisabled(true);
    await batch.commit();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleFakeUpload = async ({ file, onSuccess }) => {
    const imageRef = await ref(storage, `${file.name + v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList([...fileList.filter((item) => !item.status), { url: url }]);
      });
    });
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  // The following 4 functions are to display the pictures after upload
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    );
  };

  const handleCancel = () => setPreviewVisible(false);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

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

        <Form.Item
          label='Gallery'
          extra='The first image uploaded will be used as main product display'
        >
          <Form.Item
            name='gallery'
            valuePropName='gallery'
            getValueFromEvent={normFile}
            noStyle
            disabled={componentDisabled}
            rules={[
              {
                required: true,
                message: 'Please provide at least one image!',
              },
            ]}
          >
            <Upload
              customRequest={handleFakeUpload}
              multiple
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              disabled={componentDisabled}
            >
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
        </Form.Item>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt='example'
            style={{
              width: '100%',
            }}
            src={previewImage}
          />
        </Modal>

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
