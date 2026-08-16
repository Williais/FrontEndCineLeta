
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const api = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.status === 401) {
      console.warn("Sessão expirada ou não autorizada. O usuário precisa fazer login.");

      window.dispatchEvent(new CustomEvent('auth-error'));
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no Fetch:", error);
    throw error;
  }
};