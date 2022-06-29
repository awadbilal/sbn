/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { message, Modal, Table } from 'antd';
import SingleProduct from './SingleProduct';
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../../firebaseconfig';

function Index() {
  const [dataToRender, setDataToRender] = useState();
  const [activeExpRow, setActiveExpRow] = useState();
  const [itemToDelete, setItemToDelete] = useState();
  const [openModal, setOpenModal] = useState(false);

  // The following listens for the data live and print it.
  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('id'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({
          ...doc.data(),
          docRef: doc.id,
        });
      });
      setDataToRender(products);
    });
  }, []);

  const modifiedData = dataToRender?.map((item) => ({
    ...item,
    key: item.id,
  }));

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'products', itemToDelete.docRef))
      .then((resp) => {
        message.success(`Product with id ${itemToDelete.id} has been deleted`);
        setItemToDelete(null);
      })
      .catch((err) => message.error(err.message));
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: 'Image',
      dataIndex: 'gallery',
      key: 'gallery',
      render: (gallery) => (
        <img src={gallery[0]} style={{ maxWidth: '75px', maxHeight: '75px' }} />
      ),
      width: '10%',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title) => <a>{title}</a>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: [
        {
          text: 'Sneakers',
          value: 'Sneakers',
        },
        {
          text: 'Bags',
          value: 'Bags',
        },
        {
          text: 'Hats',
          value: 'Hats',
        },
        {
          text: 'Accessories',
          value: 'Accessories',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, item) => item.category === value,
      width: '10%',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <span>{price} &#8378;</span>,
      sorter: {
        compare: (a, b) => a.price - b.price,
      },
      width: '10%',
    },
    {
      title: 'After Discount',
      dataIndex: 'discount',
      key: 'discountedPrice',
      render: (discount, item) => (
        <span>{(item.price * (100 - discount)) / 100} &#8378;</span>
      ),
      sorter: {
        compare: (a, b) =>
          (a.price * (100 - a.discount)) / 100 -
          (b.price * (100 - b.discount)) / 100,
      },
      width: '10%',
    },
    {
      title: 'Disocunt',
      dataIndex: 'discount',
      key: 'disount',
      render: (discount) => <span>{discount} %</span>,
      sorter: {
        compare: (a, b) => a.discount - b.discount,
      },
      width: '10%',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: {
        compare: (a, b) => a.quantity - b.quantity,
      },
      width: '10%',
    },
    {
      title: 'Order Count',
      dataIndex: 'orderCount',
      key: 'orderCount',
      sorter: {
        compare: (a, b) => a.orderCount - b.orderCount,
      },
      width: '10%',
    },
    {
      title: 'Delete',
      dataIndex: '',
      key: 'x',
      render: (item) => (
        <span
          style={{
            cursor: 'pointer',
            color: '#ee3364',
            fontSize: '1.5rem',
            textAlign: 'center',
          }}
          onClick={() => {
            setOpenModal(true);
            setItemToDelete(item);
          }}
        >
          X
        </span>
      ),
      width: '8%',
    },
  ];

  return (
    <div id='productsList'>
      <Modal
        title='Delete Confirmation'
        centered
        visible={openModal}
        closable={false}
        okText='Delete'
        cancelText='Cancel'
        onOk={() => {
          handleDelete();
          setOpenModal(false);
        }}
        onCancel={() => {
          setItemToDelete(null);
          setOpenModal(false);
        }}
      >
        Are you sure you want to delete "{itemToDelete?.title}" ?
      </Modal>
      <Table
        loading={dataToRender ? false : true}
        columns={columns}
        dataSource={modifiedData}
        bordered
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
        }}
        scroll={{
          y: '82.5vh',
        }}
        style={{ padding: '1.5rem 1.5rem 1.5rem 1.5rem' }}
        expandable={{
          expandedRowRender: (item) => <SingleProduct item={item} />,
          rowExpandable: (item) => true,
          expandedRowKeys: activeExpRow,
          onExpand: (expanded, item) => {
            const keys = [];
            if (expanded) keys.push(item.id);
            setActiveExpRow(keys);
          },
        }}
      />
    </div>
  );
}

export default Index;
