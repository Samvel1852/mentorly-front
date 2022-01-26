import { Outlet } from 'react-router';
import { Navigate } from 'react-router-dom';

import { getLocalStorage } from '../../helpers/localStorage';
import FillMyProfile from '../../pages/FillMyProfile/FillMyProfile';
import Login from '../../pages/Login/Login';

const useAuth = () => {
    const user = {accessToken: getLocalStorage('accessToken'), verified: getLocalStorage('verified')};
    return user && user.accessToken && (user.verified === 'verified');
}

const useLogged = () => {
    const user = {accessToken: getLocalStorage('accessToken'), verified: getLocalStorage('verified')};
    return user && user.accessToken && user.verified === 'confirmed';
}

export const PrivateRoute = () => {
    const isAuth = useAuth();
    const isLogged = useLogged();
    return isAuth ? <Outlet /> : isLogged ? <FillMyProfile /> : <Login />
}

export const PublicRoute = () => {
    const isAuth = useAuth();
    return !isAuth ? <Outlet /> : <Navigate to='/' />
}

export const SemiPrivateRoute = () => {
    const isAuth = useAuth();
    const isLogged = useLogged();
    return isLogged || isAuth ? <Outlet /> : <Login />
}