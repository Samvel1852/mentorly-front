import { Outlet } from 'react-router';

import { getLocalStorage } from '../../helpers/localStorage';
import Login from '../../pages/Login/Login';

const useAuth = () => {
    const user = {accessToken: getLocalStorage('accessToken'), verified: getLocalStorage('verified')}
    return user && user.accessToken && user.verified === 'verified';
}

const PrivateRoute = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Login />
}

export default PrivateRoute

