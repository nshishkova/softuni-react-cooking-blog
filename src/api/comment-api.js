import request from '../utils/request';

export const getAll = async (recipeId) => {
    return request(`/comments?recipe_id=eq.${recipeId}&order=created_at.desc`);
};

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