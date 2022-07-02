import React, { useEffect } from 'react';
import { useState } from 'react';
import { TeamOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import EditLayout from './EditLayout';
import Products from './Products';
import AddProduct from './AddProduct';
import Orders from './Orders';
import CustomOrders from './CustomOrders';
import Users from './Users';
import Messages from './Messages';
import Logout from './Logout';
import { HiClipboardList } from 'react-icons/hi';
import { RiLayoutMasonryFill, RiLogoutCircleRLine } from 'react-icons/ri';
import { FiPackage } from 'react-icons/fi';
import { BsPlusLg } from 'react-icons/bs';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { MdOutlineStyle } from 'react-icons/md';

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
  getItem('Add Product', '1', <BsPlusLg />),
  getItem('Products', '2', <HiClipboardList />),
  getItem('Orders', '3', <FiPackage />),
  getItem('Customs', '4', <MdOutlineStyle />),
  getItem('Users', '5', <TeamOutlined />),
  getItem('Messages', '6', <BiMessageSquareDetail />),
  getItem('Edit Layout', '7', <RiLayoutMasonryFill />),
  getItem('Logout', '8', <RiLogoutCircleRLine />),
];

function Index() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(1);
  const [componentToRender, setComponentToRender] = useState(<EditLayout />);

  useEffect(() => {
    switch (selectedKey) {
      case '1':
        setComponentToRender(<AddProduct />);
        break;
      case '2':
        setComponentToRender(<Products />);
        break;
      case '3':
        setComponentToRender(<Orders />);
        break;
      case '4':
        setComponentToRender(<CustomOrders />);
        break;
      case '5':
        setComponentToRender(<Users />);
        break;
      case '6':
        setComponentToRender(<Messages />);
        break;
      case '7':
        setComponentToRender(<EditLayout />);
        break;
      case '8':
        setComponentToRender(<Logout />);
        break;
      default:
        setComponentToRender(<AddProduct />);
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
