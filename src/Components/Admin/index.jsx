import React, { useEffect } from 'react';
import { useState } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import EditLayout from './EditLayout';
import Products from './Products';
import AddProduct from './AddProduct';
import Order from './Orders';
import Users from './Users';
import { HiClipboardList } from 'react-icons/hi';
import { RiLayoutMasonryFill } from 'react-icons/ri';
import { FiPackage } from 'react-icons/fi';
import { BsPlusLg } from 'react-icons/bs';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Layout', '1', <RiLayoutMasonryFill />),
  getItem('Products', '2', <HiClipboardList />),
  getItem('Add Product', '3', <BsPlusLg />),
  getItem('Orders', '4', <FiPackage />),
  getItem('Users', '5', <TeamOutlined />),
];

function Index() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(1);
  const [componentToRender, setComponentToRender] = useState(<EditLayout />);

  useEffect(() => {
    switch (selectedKey) {
      case '1':
        setComponentToRender(<EditLayout />);
        break;
      case '2':
        setComponentToRender(<Products />);
        break;
      case '3':
        setComponentToRender(<AddProduct />);
        break;
      case '4':
        setComponentToRender(<Order />);
        break;
      case '5':
        setComponentToRender(<Users />);
        break;
      default:
        setComponentToRender(<EditLayout />);
    }
  }, [selectedKey]);

  return (
    <div id='admin'>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className='logo' />
          <Menu
            theme='dark'
            defaultSelectedKeys={['1']}
            mode='inline'
            items={items}
            onClick={(e) => setSelectedKey(e.key)}
          />
        </Sider>
        <Layout className='site-layout'>
          <Content>{componentToRender}</Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Index;
