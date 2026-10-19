import { authRequest } from '../../utils/request';

export const register = async ({email, password}) => {
    return authRequest('/signup', 'POST', {email, password});
};