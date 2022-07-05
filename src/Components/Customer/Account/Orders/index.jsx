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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 100,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      width: 100,
    },
    {
      title: 'Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => <span>{price} &#8378;</span>,
      sorter: {
        compare: (a, b) => a.totalPrice - b.totalPrice,
      },
      width: 100,
    },
    {
      title: 'Delivery Address',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
      width: 200,
    },
    {
      title: 'Date of Purchase',
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
