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
  Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { db, storage } from '../../../firebaseconfig';
import { v4 } from 'uuid';
import { useForm } from 'antd/lib/form/Form';

const { TextArea } = Input;

function Index() {
  const [selectedCategory, setSelectedCategory] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [files, setFiles] = useState([]);
  const [form] = useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const onFinish = async (values) => {
    const q = query(collection(db, 'products'), orderBy('id', 'desc'));
    const querySnapshot = await getDocs(q);

    const formData = values;
    formData.id =
      Array.isArray(querySnapshot?.docs) && querySnapshot?.docs.length !== 0
        ? querySnapshot.docs[0].data().id + 1
        : 0;
    formData.orderCount = 0;
    formData.gallery = files;
    if (selectedCategory === 'Sneakers')
      formData.sizes = [
        37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5,
      ];

    await addDoc(collection(db, 'products'), formData)
      .then((resp) => {
        form.resetFields();
        setFiles([]);
        message.success('Product has been added successfully.');
      })
      .catch((err) => message.error('An error occured!'));
  };

  const onFinishFailed = (errorInfo) => {
    for (let i = 0; i < errorInfo.errorFields.length; i++) {
      message.warn(errorInfo.errorFields[i].errors[0]);
    }
  };

  const handleFakeUpload = async ({ file, onSuccess }) => {
    const imageRef = await ref(storage, `${file.name + v4()}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFiles([...files, url]);
      });
    });
    setTimeout(() => {
      onSuccess('ok');
    }, 2000);
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
    <Container className='addProduct'>
      <Form
        style={{ marginTop: '3rem' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          label='Product Title'
          name='title'
          rules={[{ required: true, message: 'Please provide a title!' }]}
        >
          <Input placeholder='Alien Sneakers' />
        </Form.Item>

        <Form.Item
          label='Category'
          name='category'
          rules={[{ required: true, message: 'Please select a category.' }]}
        >
          <Select onChange={(value) => setSelectedCategory(value)}>
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
          <InputNumber placeholder='250 &#8378;' />
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
          <InputNumber placeholder='10' />
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
          <InputNumber placeholder='10' />
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
          <TextArea rows={6} />
        </Form.Item>

        <div className='buttonSection'>
          <Form.Item>
            <Button htmlType='submit'>Add Product</Button>
          </Form.Item>
        </div>
      </Form>
    </Container>
  );
}

export default Index;
