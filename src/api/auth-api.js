import { authRequest } from '../utils/request';

export const register = async ({name, email, password}) => {
    // The name of the user must go in the "data" field as Supabase stores it in user.user_metadata
    return authRequest('/signup', 'POST', {email, password, data: {name}});
};

export const login = async ({email, password}) => {
    return authRequest('/token?grant_type=password', 'POST', {email, password});
};

export const logout = async () => {
    return authRequest('/logout', 'POST');
};