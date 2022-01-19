import { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

import './ViewMyProfile.less';
import 'antd/dist/antd.css';

import { removeFromLocalStorage } from '../../helpers/localstorage';

const { Header, Content, Footer } = Layout;

export default function ViewMyProfile({ accessToken }) {
  const navigate = useNavigate();

  console.log(accessToken);

  useEffect(() => {
    if (!accessToken) navigate('/login');
  }, []);

  function handleLogOut() {
    removeFromLocalStorage('accessToken');
    navigate('/login');
  }

  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className='logo'>LOGO</div>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
          <Menu.Item key='1'>Dashboard</Menu.Item>
          <Menu.Item key='2'>Message Requests</Menu.Item>
          <Menu.Item key='3'>My Profile</Menu.Item>
          <Menu.Item key='4' onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu>
      </Header>

      <Content
        className='site-layout'
        style={{ padding: '50px', marginTop: 64 }}
      ></Content>
      <Footer style={{ textAlign: 'center' }}>
        Simply Technologies ©2022 Created with Pleasure
      </Footer>
    </Layout>
  );
}

ViewMyProfile.propTypes = {
  accessToken: PropTypes.string,
};
