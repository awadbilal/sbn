import React, { useEffect } from 'react';
import { useState } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import EditLayout from './EditLayout';
import Products from './Products';
import AddProduct from './AddProduct';
import Order from './Orders';
import Users from './Users';
import Logout from './Logout';
import { HiClipboardList } from 'react-icons/hi';
import { RiLayoutMasonryFill, RiLogoutCircleRLine } from 'react-icons/ri';
import { FiPackage } from 'react-icons/fi';
import { BsPlusLg } from 'react-icons/bs';

const { Content, Sider } = Layout;

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
  getItem('Add Product', '2', <BsPlusLg />),
  getItem('Products', '3', <HiClipboardList />),
  getItem('Orders', '4', <FiPackage />),
  getItem('Users', '5', <TeamOutlined />),
  getItem('Logout', '6', <RiLogoutCircleRLine />),
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
        setComponentToRender(<AddProduct />);
        break;
      case '3':
        setComponentToRender(<Products />);
        break;
      case '4':
        setComponentToRender(<Order />);
        break;
      case '5':
        setComponentToRender(<Users />);
        break;
      case '6':
        setComponentToRender(<Logout />);
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
          className='navigationPanel'
        >
          <Menu
            theme='dark'
            defaultSelectedKeys={['1']}
            mode='inline'
            items={items}
            onClick={(e) => setSelectedKey(e.key)}
            className='navigationPanelMenu'
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
