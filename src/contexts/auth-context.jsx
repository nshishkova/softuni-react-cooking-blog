import { createContext } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { authApi } from '../api';
import usePersistedState from '../hooks/usePersistedState';

const AuthContext = createContext({
    accessToken: '',
    user: {},
    isAuthenticated: false,
    register() { },
    login() { },
    logout() { }
});

export function AuthProvider({ children }) {

    const navigate = useNavigate();

    const [auth, setAuth] = usePersistedState("auth", null);

    const register = async (userData) => {
        try {
            const result = await authApi.register(userData);

            setAuth(result);

            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const login = async (userData) => {
        try {
            const result = await authApi.login(userData);

            setAuth(result);

            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    };

    const logoutAction = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            toast.error(error.message);
        }

        // Clear the local session even if the server request failed
        setAuth(null);
    };


    const contextValue = {
        accessToken: auth?.access_token,
        user: auth?.user,
        isAuthenticated: !!auth,
        register,
        login,
        logout: logoutAction
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;