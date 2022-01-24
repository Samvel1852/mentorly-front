import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './MainHeader.module.less'

export default function MainHeader ({handleLogOut, verified}) {
    return(
      <Header className={styles.head} >
      <div className={styles.logo}><Link to='/' >Mentorly</Link></div>
      {
        verified ?
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} className={styles.menu}>
          <Menu.Item key='1'>Dashboard</Menu.Item>
          <Menu.Item key='2'>Message Requests</Menu.Item>
          <Menu.Item key='3'><Link to='/' >My Profile</Link></Menu.Item>
          <Menu.Item key='4' onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu> : 
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
          <Menu.Item key='1'>My Profile</Menu.Item>
          <Menu.Item key='2' onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu>
      }
    </Header>)
}

MainHeader.propTypes = {
    handleLogOut: PropTypes.func,
    verified: PropTypes.bool,
};