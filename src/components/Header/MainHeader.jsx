import { useEffect, useState } from 'react';
import { Badge, Menu } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageOutlined } from '@ant-design/icons';

import { getLocalStorage, removeFromLocalStorage } from '../../helpers/localStorage';
import styles from './MainHeader.module.less';
import './MainHeader.less';
import Logo from '../../assets/images/MentorlyLogo.png'

export default function MainHeader ({ inPublicPages }) {
    const [requestsQuantity, setRequestsQuantity] = useState(0);

    const { pathname } = useLocation()

    const navigate = useNavigate();

    useEffect(async () => {
      // const requests = await axiosInstance.get('requests/pending');
      // const reqCount = requests.lenght;
      // await setRequestsQuantity(reqCount);
      await setRequestsQuantity(20);
    }, []);

    async function handleLogOut() {
        await removeFromLocalStorage('accessToken');
        await removeFromLocalStorage('currentUserId');
        await removeFromLocalStorage('verified');
        navigate('/login');
    }

    const userId = getLocalStorage('currentUserId')
    const currentUserIdLink = `/${userId}`;
    const verified = getLocalStorage('verified');

    return(
      <Header className={styles.head} >
      <div className={styles.logoContainer}><Link to={verified === 'confirmed' ? `/users${currentUserIdLink}`
          : `/${userId || 'login'}`} >
          <img className={styles.logo} src={Logo} height={40} alt="Logo not loaded" />
        </Link>
      </div>
      {
        verified === 'verified' ?
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={`${pathname}`} className={styles.menu}>
          <Menu.Item key='/dashboard' ><Link to='/dashboard'>Dashboard</Link></Menu.Item>
          <Menu.Item key='/requests' ><Link to='/requests'> Message Requests </Link> 
            <Badge count={requestsQuantity} size='small' offset={[0, 0]} className={styles.badge}> 
              <MessageOutlined className={styles.icon} />
            </Badge>
          </Menu.Item>
          <Menu.Item key={currentUserIdLink} >
            <Link to={currentUserIdLink}>My Profile</Link>
          </Menu.Item>
          <Menu.Item key='4' onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu> : (!inPublicPages) ?
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']} className={styles.unverifiedMenu}>
          <Menu.Item key='1'><Link to={`/users${currentUserIdLink}`}>My Profile</Link></Menu.Item>
          <Menu.Item key='2' onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu> : 
        <Menu theme='dark' mode='horizontal'></Menu>
      }
    </Header>)
}

MainHeader.propTypes = {
    handleLogOut: PropTypes.func,
    verified: PropTypes.bool,
    inPublicPages: PropTypes.bool,
    requestsQuantity: PropTypes.number,
};