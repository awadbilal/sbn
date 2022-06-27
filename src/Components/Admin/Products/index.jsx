import React from 'react';
import { DATA } from '../../../Data/products';
import { useState } from 'react';
import { Table } from 'antd';
import SingleProduct from './SingleProduct';

function Index() {
  const [dataToRender, setDataToRender] = useState(DATA);
  const [activeExpRow, setActiveExpRow] = React.useState();

  const modifiedData = dataToRender.map((item) => ({
    ...item,
    key: item.id,
  }));

  const handleDelete = (item) => {
    console.log('🚀 ~ e', item);
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
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={image} style={{ maxWidth: '75px', maxHeight: '75px' }} />
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
          onClick={() => handleDelete(item)}
        >
          X
        </span>
      ),
      width: '8%',
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