import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import Settings from './Settings';
import Orders from './Orders';
import CustomOrders from './CustomOrders';
import Messages from './Messages';
import Logout from './Logout';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { FiPackage } from 'react-icons/fi';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { MdOutlineStyle } from 'react-icons/md';
import { IoSettingsOutline } from 'react-icons/io5';

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
  getItem('Settings', '1', <IoSettingsOutline />),
  getItem('Orders', '2', <FiPackage />),
  getItem('Customs', '3', <MdOutlineStyle />),
  getItem('Messages', '4', <BiMessageSquareDetail />),
  getItem('Logout', '5', <RiLogoutCircleRLine />),
];

function Index() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState(1);
  const [componentToRender, setComponentToRender] = useState(<Settings />);

  useEffect(() => {
    switch (selectedKey) {
      case '1':
        setComponentToRender(<Settings />);
        break;
      case '2':
        setComponentToRender(<Orders />);
        break;
      case '3':
        setComponentToRender(<CustomOrders />);
        break;
      case '4':
        setComponentToRender(<Messages />);
        break;
      case '5':
        setComponentToRender(<Logout />);
        break;
      default:
        setComponentToRender(<Settings />);
    }
  }, [selectedKey]);

  return (
    <div id='accountPage'>
      <Layout
        style={{
          minHeight: '87vh',
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
