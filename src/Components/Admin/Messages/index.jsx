import React from 'react';
import { useState } from 'react';
import { Table } from 'antd';
import { useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebaseconfig';

function Index() {
  const [dataToRender, setDataToRender] = useState();

  // The following listens for the data live and print it.
  useEffect(() => {
    const q = query(collection(db, 'messages'));
    onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setDataToRender(users);
    });
  }, []);

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
      title: 'Sender Name',
      dataIndex: 'name',
      key: 'name',
      width: '12%',
    },
    {
      title: 'Sender Email',
      dataIndex: 'email',
      key: 'email',
      width: '15%',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: '15%',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: '38%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <span>{date?.substring(0, 25)}</span>,
      width: '15%',
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
        scroll={{
          y: '82.5vh',
        }}
        style={{ padding: '1.5rem 1.5rem 1.5rem 1.5rem' }}
      />
    </div>
  );
}

export default Index;
