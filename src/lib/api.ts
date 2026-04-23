import axios from 'axios';
import type { LoginRequest, LoginResponse, ProductAPI, ProductFiltersAPI } from '@/types';

const BASE_URL = 'https://apihomolog.innovationbrindes.com.br';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:logout'));
      }
    }
    return Promise.reject(error);
  }
);

export async function loginApi(body: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    '/api/innova-dinamica/login/acessar',
    body
  );
  return data;
}

export async function fetchProductsApi(token: string): Promise<ProductAPI[]> {
  const { data } = await api.get<ProductAPI[]>(
    '/api/innova-dinamica/produtos/listar',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}

export async function fetchProductsWithFiltersApi(
  token: string,
  filters: ProductFiltersAPI
): Promise<ProductAPI[]> {
  const { data } = await api.post<ProductAPI[]>(
    '/api/innova-dinamica/produtos/listar',
    {
      nome_produto: filters.nome_produto ?? '',
      codigo_produto: filters.codigo_produto ?? '',
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}