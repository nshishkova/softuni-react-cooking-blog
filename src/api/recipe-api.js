import request from '../utils/request';

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const getAll = () => request('/recipes?order=created_at.desc', 'GET');

export const getByOwner = (userId) => request(`/recipes?user_id=eq.${userId}&order=created_at.desc`);

export const create =(data) => request('/recipes', 'POST', data);

export const remove = async (recipeId) => request(`/recipes?id=eq.${recipeId}`, 'DELETE');

export const getOne = async (recipeId) => {
    // Recipe ids are UUIDs, so anything else can't match a recipe
    if (!uuidPattern.test(recipeId)) {
        return null;
    }

    const result = await request(`/recipes?id=eq.${recipeId}`);

    return result[0] ?? null;
};

export const update = async (recipeId, data) => request(`/recipes?id=eq.${recipeId}`, 'PATCH', data);
