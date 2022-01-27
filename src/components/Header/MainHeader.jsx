import { Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { getLocalStorage, removeFromLocalStorage } from '../../helpers/localStorage';
import styles from './MainHeader.module.less';
import './MainHeader.less';
import Logo from '../../assets/images/MentorlyLogo.png'

export default function MainHeader ({ verified }) {
    const { pathname } = useLocation()

    const navigate = useNavigate();

    async function handleLogOut() {
        await removeFromLocalStorage('accessToken');
        await removeFromLocalStorage('currentUserId');
        await removeFromLocalStorage('verified');
        navigate('/login');
    }

    const currentUserId = `/${getLocalStorage('currentUserId')}`;

    return(
      <Header className={styles.head} >
      <div className={styles.logoContainer}><Link to={currentUserId}>
          <img className={styles.logo} src={Logo} height={40} alt="Logo not loaded" />
        </Link>
      </div>
      {
        verified ?
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={`${pathname}`} className={styles.menu}>
          <Menu.Item key='/dashboard' ><Link to='/dashboard'>Dashboard</Link></Menu.Item>
          <Menu.Item key='/requests' ><Link to='/requests'>Message Requests</Link></Menu.Item>
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
};