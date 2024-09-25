import axios from 'axios';
import { API_KEY, API_URL } from '../constants/constants';

export const searchModules = async (query: string, page: number, perPage: number, sortOrder?: string) => {
  const url = `${API_URL}/search/?platforms=Bower&api_key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}&sort=${sortOrder}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};
