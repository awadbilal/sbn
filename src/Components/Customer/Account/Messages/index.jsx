import React from 'react';
import { useState } from 'react';
import { Table } from 'antd';
import { useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseconfig';

function Index() {
  const [dataToRender, setDataToRender] = useState();
  const [scroll, setScroll] = useState();

  // The following listens for the data live and print it.
  useEffect(() => {
    (async () => {
      const userInfo = JSON.parse(localStorage.getItem('user'));
      const q = query(
        collection(db, 'messages'),
        where('email', '==', userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length !== 0) {
        const messages = [];
        querySnapshot.forEach((doc) => {
          messages.push({ ...doc.data(), docRef: doc.id });
        });
        setDataToRender(messages.sort((a, b) => a.id - b.id));
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: 100,
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: 150,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <span>{date?.substring(0, 25)}</span>,
      width: 100,
    },
  ];

  return (
    <div id='productsList'>
      <Table
        loading={dataToRender ? false : true}
        columns={columns}
        dataSource={dataToRender}
        bordered
        pagination={{
          pageSize: 10,
          hideOnSinglePage: true,
          position: ['none', 'bottomCenter'],
        }}
        scroll={scroll}
        style={{ padding: '1.5rem 1.5rem 1.5rem 1.5rem' }}
      />
    </div>
  );
}

export default Index;
