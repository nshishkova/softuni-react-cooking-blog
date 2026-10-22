import request from '../utils/request';

export const getAll = (recipeId) => {
    return request(`/comments?recipe_id=eq.${recipeId}&order=created_at.desc`);
};

export const create = async (data) => {
    return request('/comments', 'POST', data);
}

export const remove = (id) => {
    return request(`/comments?id=eq.${id}`, 'DELETE');
};