import request from '../utils/request';

export const getAll = (accessToken) => {
    return request('/recipes?order=created_at.desc', 'GET', null, {
        headers: {
            ...getAuthHeader(accessToken)
        }
    });
}

export const create = (data, accessToken) => {
    return request('/recipes', 'POST', data, {
        headers: {
            ...getAuthHeader(accessToken)
        }
    });
}

function getAuthHeader(accessToken) {
    return {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {} )
    };
}