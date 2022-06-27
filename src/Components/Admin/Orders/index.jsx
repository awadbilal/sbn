import React from 'react';
import { ORDERS } from '../../../Data/orders';
import { useState } from 'react';
import { Table } from 'antd';
import SingleOrder from './SingleOrder';

function Index() {
  const [dataToRender, setDataToRender] = useState(ORDERS);
  const [activeExpRow, setActiveExpRow] = React.useState();

  const modifiedData = dataToRender.map((item) => ({
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
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      width: '15%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '15%',
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
      width: '10%',
    },
    {
      title: 'Amount Discounted',
      dataIndex: 'totalDiscount',
      key: 'totalDiscount',
      render: (totalDiscount) => <span>{totalDiscount} &#8378;</span>,
      sorter: {
        compare: (a, b) => a.totalDiscount - b.totalDiscount,
      },
      width: '10%',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => <span>{date?.substring(0, 25)}</span>,
      width: '15%',
    },
    {
      title: 'Delivery Address',
      dataIndex: 'deliveryAddress',
      key: 'deliveryAddress',
      width: '20%',
    },
  ];

  return (
    <div id='productsList'>
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
          expandedRowRender: (item) => <SingleOrder item={item} />,
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
