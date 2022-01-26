import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { getLocalStorage, removeFromLocalStorage } from '../../helpers/localStorage';
import styles from './MainHeader.module.less'

export default function MainHeader ({ verified }) {
    const { pathname } = useLocation()

    const navigate = useNavigate();

    async function handleLogOut() {
        await removeFromLocalStorage('accessToken');
        await removeFromLocalStorage('currentUserId');
        await removeFromLocalStorage('verified');
        navigate('/login');
    }

    return(
      <Header className={styles.head} >
      <div className={styles.logo}><Link to={`/${getLocalStorage('currentUserId')}`}>Mentorly</Link></div>
      {
        verified ?
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={`${pathname}`} className={styles.menu}
           >
          <Menu.Item key='/dashboard' ><Link to='/dashboard'>Dashboard</Link></Menu.Item>
          <Menu.Item key='/requests' ><Link to='/requests'>Message Requests</Link></Menu.Item>
          <Menu.Item key={`/${getLocalStorage('currentUserId')}`} >
            <Link to={`/${getLocalStorage('currentUserId')}`}>My Profile</Link>
          </Menu.Item>
          <Menu.Item key='4' onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu> : 
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} className={styles.unverifiedMenu}>
          <Menu.Item key='1'><Link to={`/users/${getLocalStorage('currentUserId')}`}>My Profile</Link></Menu.Item>
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