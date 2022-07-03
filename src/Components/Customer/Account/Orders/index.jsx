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
        collection(db, 'orders'),
        where('email', '==', userInfo.email)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length !== 0) {
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({ ...doc.data(), docRef: doc.id });
        });
        setDataToRender(orders.sort((a, b) => a.id - b.id));
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
      title: 'Order by',
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
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      width: '10%',
    },
    {
      title: 'Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => <span>{price} &#8378;</span>,
      sorter: {
        compare: (a, b) => a.totalPrice - b.totalPrice,
      },
      width: '8%',
    },
    {
      title: 'Delivery Address',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
      width: '20%',
    },
    {
      title: 'Date of Purchase',
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
          y: '74vh',
        }}
        style={{ padding: '1.5rem 1.5rem 1.5rem 1.5rem' }}
        expandable={{
          expandedRowRender: (item) => <SingleOrder item={item.products} />,
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
