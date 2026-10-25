import request from '../utils/request';

export const getAll = () => request('/recipes?order=created_at.desc', 'GET');

export const getByOwner = (userId) => request(`/recipes?user_id=eq.${userId}&order=created_at.desc`);

export const create =(data) => request('/recipes', 'POST', data);

export const remove = async (recipeId) => request(`/recipes?id=eq.${recipeId}`, 'DELETE');

export const getOne = async (recipeId) => {
    const result = await request(`/recipes?id=eq.${recipeId}`);

    return result[0] ?? null;
};

export const update = async (recipeId, data) => request(`/recipes?id=eq.${recipeId}`, 'PATCH', data);
