import { Menu } from 'antd';
import PropTypes from 'prop-types';

export default function Header ({handleLogOut}) {
    return(
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
          <Menu.Item key='1'>My Profile</Menu.Item>
          <Menu.Item key='2' onClick={handleLogOut}>
            Log Out
          </Menu.Item>
        </Menu>
    </Header>)
}

Header.propTypes = {
    handleLogOut: PropTypes.func,
};