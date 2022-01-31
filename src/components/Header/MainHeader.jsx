import { useEffect, useState } from 'react';
import { Menu, Badge } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { MessageOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getLocalStorage, removeFromLocalStorage } from '../../helpers/localStorage';
import styles from './MainHeader.module.less'
import axiosInstance from '../../helpers/axiosInstance';

export default function MainHeader ({ verified }) {
    const [pendingsCount, setPendingsCount] = useState(0);
    const { pathname } = useLocation();

    const navigate = useNavigate();

    useEffect(async () => {
      const result =  await axiosInstance.get(`connections/pending`);
      setPendingsCount(result.data.data.length);
    }, [])

    async function handleLogOut() {
        await removeFromLocalStorage('accessToken');
        await removeFromLocalStorage('currentUserId');
        await removeFromLocalStorage('verified');
        navigate('/login');
    }

    const currentUserId = `/${getLocalStorage('currentUserId')}`;

    return(
      <Header className={styles.head} >
      <div className={styles.logo}><Link to={currentUserId}>Mentorly</Link></div>
      {
        verified ?
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={`${pathname}`} className={styles.menu}
           >
          <Menu.Item key='/dashboard' ><Link to='/dashboard'>Dashboard</Link></Menu.Item>
          <Menu.Item key='/requests' ><Link to='/requests'>
          Message Requests
          <Badge count={pendingsCount} offset={[0, 0]}  size='small' style={{ fontSize: '12px'}} >
            <MessageOutlined  className={styles.messageIcon} />
          </Badge>  <br />
          </Link></Menu.Item>
          <Menu.Item key={currentUserId} >
            <Link to={currentUserId}>My Profile</Link>
          </Menu.Item>
          <Menu.Item key='4' onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu> : 
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} className={styles.unverifiedMenu}>
          <Menu.Item key='1'><Link to={`/users/${currentUserId}`}>My Profile</Link></Menu.Item>
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
    pendingsCount: PropTypes.number
};