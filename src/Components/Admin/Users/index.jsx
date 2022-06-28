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
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
      title: 'Full Name',
      children: [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '10%',
        },
        {
          title: 'Surname',
          dataIndex: 'surname',
          key: 'surname',
          width: '10%',
        },
      ],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: 'Address',
      dataIndex: 'activeAddress',
      key: 'activeAddress',
      render: (address) => <span>{address?.full}</span>,
      width: '30%',
    },
    {
      title: 'Orders Count',
      dataIndex: 'orders',
      key: 'ordersCount',
      render: (_orders, item) => <span>{item.orders?.length}</span>,
      width: '5%',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        {
          text: 'Admin',
          value: 'admin',
        },
        {
          text: 'Customer',
          value: 'customer',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, item) => item.role === value,
      width: '10%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'Active',
          value: 'active',
        },
        {
          text: 'Inactive',
          value: 'inactive',
        },
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, item) => item.status === value,
      width: '10%',
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
