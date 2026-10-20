import request from '../../utils/request';

export const getAll = (accessToken) => {
    return request('/recipes?order=created_at.desc', 'GET', null, {
        headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {} )
        }
    });
}