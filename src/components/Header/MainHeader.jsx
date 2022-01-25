import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import { removeFromLocalStorage } from '../../helpers/localStorage';
import styles from './MainHeader.module.less'

export default function MainHeader ({ verified }) {
    const navigate = useNavigate();

    async function handleLogOut() {
        await removeFromLocalStorage('accessToken');
        await removeFromLocalStorage('currentUserId');
        await removeFromLocalStorage('verified');
        navigate('/login');
      }

    return(
      <Header className={styles.head} >
      <div className={styles.logo}><Link to='/'>Mentorly</Link></div>
      {
        verified ?
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['3']} className={styles.menu}>
          <Menu.Item key='1' className={styles['ant-menu-item']}><Link to='dashboard'>Dashboard</Link></Menu.Item>
          <Menu.Item key='2' className={styles['ant-menu-item']}><Link to='requests'>Message Requests</Link></Menu.Item>
          <Menu.Item key='3' className={styles['ant-menu-item-selected']}><Link to='/'>My Profile</Link></Menu.Item>
          <Menu.Item key='4' className={styles['ant-menu-item']} onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu> : 
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} className={styles.unverifiedMenu}>
          <Menu.Item key='1'><Link to='/'>My Profile</Link></Menu.Item>
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