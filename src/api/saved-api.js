import request from '../utils/request';

export const getAll = async (userId) => {
    const result = await request(`/saved_recipes?user_id=eq.${userId}&select=recipe_id,recipes(*)&order=created_at.desc`);

    return result.map(saved => saved.recipes).filter(Boolean);
};

export const isSaved = async (recipeId, userId) => {
    const result = await request(`/saved_recipes?recipe_id=eq.${recipeId}&user_id=eq.${userId}&select=id`);

    return result.length > 0;
};

export const save = (recipeId, userId) => {
    return request('/saved_recipes', 'POST', { recipe_id: recipeId, user_id: userId });
};

export const unsave = (recipeId, userId) => {
    return request(`/saved_recipes?recipe_id=eq.${recipeId}&user_id=eq.${userId}`, 'DELETE');
};
