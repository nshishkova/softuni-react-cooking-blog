import { createContext } from 'react';

const AuthContext = createContext({
    accessToken: '',
    user: {},
    isAuthenticated: false,
    register() { },
    login() { },
    //logout: () => {}
});

export default AuthContext;