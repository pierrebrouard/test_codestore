import axios, {AxiosInstance, AxiosRequestConfig } from 'axios';

import dotenv from 'dotenv';
import env from 'env-var';

// Load ENV var from .env
dotenv.config();

const base_url = env.get('MOVIE_BASE_URL').required().asUrlString();
const api_key = env.get('MOVIE_API_KEY').required().asString();
const access_token = env.get('MOVIE_ACCESS_TOKEN').required().asString();

const api: AxiosInstance = axios.create({
    baseURL: base_url,
    headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
    },
});

export const getData = async (endpoint: string): Promise<any> => {
    try {
        const response = await api.get(endpoint);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Error making API request:', error.response?.data || error.message);
          throw error;
        } else {
          throw new Error('Unexpected error: ' + error);
        }
      }
};

export default {api, getData};