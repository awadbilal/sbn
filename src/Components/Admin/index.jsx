import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  TeamOutlined,
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import EditLayout from './EditLayout';
import Products from './Products';
import AddProduct from './AddProduct';
import Order from './Orders';
import Users from './Users';

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
  getItem('Layout', '1', <PieChartOutlined />),
  getItem('Products', '2', <DesktopOutlined />),
  getItem('Add Product', '3', <UserOutlined />),
  getItem('Orders', '4', <UserOutlined />),
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
          <Content>
            {componentToRender}
            {/* <div
              className='site-layout-background'
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              Bill is a cat.
            </div> */}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Index;
