import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'antd';
import SingleOrder from './SingleOrder';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseconfig';

function Index() {
  const [dataToRender, setDataToRender] = useState();
  const [activeExpRow, setActiveExpRow] = React.useState();
  const [scroll, setScroll] = useState();

  useEffect(() => {
    (async () => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const q = query(
        collection(db, 'customOrders'),
        where('email', '==', userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length !== 0) {
        const customOrders = [];
        querySnapshot.forEach((doc) => {
          customOrders.push({ ...doc.data(), docRef: doc.id });
        });
        setDataToRender(customOrders.sort((a, b) => a.id - b.id));
      } else {
        setDataToRender([]);
      }
    })();

    if (window.innerWidth < 992)
      setScroll({
        x: '100vw',
        y: '74vh',
      });
    else {
      setScroll({
        y: '74vh',
      });
    }
  }, []);

  const modifiedData = dataToRender?.map((item) => ({
    ...item,
    key: item.id,
  }));

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img
          src={image}
          alt='image preview'
          style={{ maxWidth: '75px', maxHeight: '75px' }}
        />
      ),
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: 150,
    },
    {
      title: 'Date of Order',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <span>{date?.substring(0, 25)}</span>,
      width: 100,
    },
    {
      title: 'Order id',
      dataIndex: 'docRef',
      key: 'docRef',
      width: 100,
    },
  ];

  return (
    <div id='ordersList'>
      <Table
        loading={dataToRender ? false : true}
        columns={columns}
        dataSource={modifiedData}
        bordered
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          position: ['none', 'bottomCenter'],
        }}
        scroll={scroll}
        style={{ padding: '1.5rem 1.5rem 1.5rem 1.5rem' }}
        expandable={{
          expandedRowRender: (item) => <SingleOrder item={item.image} />,
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
