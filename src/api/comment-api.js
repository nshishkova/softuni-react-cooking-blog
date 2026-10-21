import request from '../utils/request';

export const create = async (data, accessToken) => {
    return request('/comments', 'POST', data, {
        headers: {
            ...getAuthHeaders(accessToken)
        }
    });
}

function getAuthHeaders(accessToken) {
    return {
        ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {})
    };
}