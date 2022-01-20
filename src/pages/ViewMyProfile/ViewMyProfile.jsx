import { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Col, Layout, List, Menu, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from './ViewMyProfile.module.less';
import 'antd/dist/antd.css';

import { removeFromLocalStorage } from '../../helpers/localStorage';
import Skill from '../../components/Skill/Skill';

const { Header, Content, Footer } = Layout;

const { Title } = Typography;

export default function ViewMyProfile({ accessToken }) {
  const navigate = useNavigate();

  console.log(accessToken);

  const personalData = [
    ['First Name:', 'John'], 
    ['Last Name:', 'Doe'],
    ['Email:', 'john@gmail.com'],
    ['Role:', 'Mentor'], 
    ['Position:', 'Engineer'], 
    ['Field:', 'IT'],
  ];

  const skills = [
    'HTML', 'CSS', 'JS', 'React'
  ];

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
        <div className='logo'>Mentorly</div>
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
        className={styles.site_layout}
        style={{ padding: '20px', marginTop: 64 }}
      >
          <Row style={{width: '100%', height: '100%'}}>
            <Col flex="300px">
              <Title level={3}>Personal Info</Title>
              <List
                size="small"
                dataSource={personalData}
                renderItem={item => <List.Item>{item[0]} {item[1]}</List.Item>}
              />
              <Title level={3}>Skills</Title>
              <List
                size="small"
                dataSource={skills}
                renderItem={item => <Skill name={item}></Skill>}
              />
            </Col>
            <Col flex="auto">Fill Rest</Col>
          </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Simply Technologies ©2022 Created with Pleasure
      </Footer>
    </Layout>
  );
}

ViewMyProfile.propTypes = {
  accessToken: PropTypes.string,
};
