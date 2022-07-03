import React, { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'antd';
import SingleOrder from './SingleOrder';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseconfig';

function Index() {
  const [dataToRender, setDataToRender] = useState();
  const [activeExpRow, setActiveExpRow] = React.useState();

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
      width: '5%',
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={image} style={{ maxWidth: '75px', maxHeight: '75px' }} />
      ),
      width: '8%',
    },
    {
      title: 'Order By',
      dataIndex: 'customer',
      key: 'customer',
      width: '13%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '13%',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      width: '30%',
    },
    {
      title: 'Date of Order',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <span>{date?.substring(0, 25)}</span>,
      width: '15%',
    },
    {
      title: 'Order id',
      dataIndex: 'docRef',
      key: 'docRef',
      width: '16%',
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
        }}
        scroll={{
          y: '82.5vh',
        }}
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
