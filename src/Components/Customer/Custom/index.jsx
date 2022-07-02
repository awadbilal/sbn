import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { HiUpload } from 'react-icons/hi';
import { BsArrowRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Banner from '../../Shared/Banner';
import {
  doc,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  writeBatch,
} from 'firebase/firestore';
import { db, storage } from '../../../firebaseconfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { message } from 'antd';

function Index() {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState();
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState();

  const handleImage = (e) => {
    setImage(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener('load', (img) => {
      setImagePreview(img.target.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!productInfo || !image)
      return message.error('Please complete the form then try again!');
    const imageRef = ref(storage, `${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        handleUpdate(url);
      });
    });
  };

  const handleUpdate = async (url) => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const q = query(collection(db, 'customOrders'), orderBy('id', 'desc'));
    const querySnapshot = await getDocs(q);
    await addDoc(collection(db, 'customOrders'), {
      id:
        Array.isArray(querySnapshot?.docs) && querySnapshot?.docs.length !== 0
          ? querySnapshot.docs[0].data().id + 1
          : 0,
      image: url,
      message: productInfo,
      customer: `${userInfo.name} ${userInfo.surname}`,
      email: userInfo.email,
      date: `${new Date()}`,
    })
      .then((doc) => handleUpdateProfile(doc.id))
      .catch((err) =>
        message.error(
          'There was an error processing your order, please try again.'
        )
      );
  };

  const handleUpdateProfile = async (docRef) => {
    const batch = await writeBatch(db);
    const userInfo = JSON.parse(localStorage.getItem('user'));
    userInfo.custom.push(docRef);

    const sfRef = await doc(db, 'users', userInfo.docRef);
    await batch.update(sfRef, userInfo);
    await batch.commit().then(() => {
      localStorage.setItem('user', JSON.stringify(userInfo));
      message.success('Your message has been received, please wait...');
      navigate('/thank-you', { state: docRef });
    });
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
            <div className='uploadImage'>
              {imagePreview ? (
                <img src={imagePreview} alt='Custom Image' />
              ) : (
                'Upload an image to be viewd here.'
              )}
            </div>
            <p>
              <button>
                <HiUpload size={30} className='uploadIcon' />
                <input
                  type='file'
                  accept='image/*'
                  className='uploadInput'
                  onChange={handleImage}
                />
              </button>
              Upload Image
            </p>
          </Col>
          <Col md={6} lg={6} xxl={6}>
            <div className='formInfo'>
              <p>Description</p>
              <textarea
                placeholder='I would like a size 41 shoes similar to the one in the photo...'
                value={productInfo}
                onChange={(e) => setProductInfo(e.target.value)}
              />
              <span>
                <button onClick={handleUpload}>
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
