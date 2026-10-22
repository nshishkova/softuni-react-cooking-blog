import request from '../utils/request';

export const getAll = () => request('/recipes?order=created_at.desc', 'GET');

export const create = (data) => request('/recipes', 'POST', data);

export const remove = async (recipeId) => request(`/recipes?id=eq.${recipeId}`, 'DELETE');

export const update = async (recipeId, data) => request(`/recipes?id=eq.${recipeId}`, 'PUT', data);
