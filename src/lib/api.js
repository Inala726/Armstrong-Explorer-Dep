const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://amelie-aerogenic-contractibly.ngrok-free.dev/api';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

const parseResponse = async (response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

const getErrorMessage = (data, fallback) => {
  if (!data) return fallback;
  if (typeof data === 'string') return data;
  if (data.error) return data.error;
  if (data.detail) return data.detail;
  if (data.message) return data.message;
  if (data.non_field_errors) return data.non_field_errors.join(' ');

  const firstFieldError = Object.entries(data)[0];
  if (firstFieldError) {
    const [field, value] = firstFieldError;
    return `${field}: ${Array.isArray(value) ? value.join(' ') : value}`;
  }

  return fallback;
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getAccessToken());

export const setAuthSession = ({ access, refresh, user }) => {
  if (access) localStorage.setItem(ACCESS_TOKEN_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const updateStoredUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  const data = await parseResponse(response);
  if (!response.ok || !data?.access) {
    clearAuthSession();
    return null;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
  return data.access;
};

export const apiRequest = async (endpoint, options = {}, hasRetried = false) => {
  const { method = 'GET', body, auth = true, headers = {} } = options;
  const token = getAccessToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const data = await parseResponse(response);

  if (response.status === 401 && auth && !hasRetried) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      return apiRequest(endpoint, options, true);
    }
  }

  if (!response.ok) {
    throw new ApiError(getErrorMessage(data, 'Something went wrong.'), response.status);
  }

  return data;
};

export const api = {
  register: (payload) => apiRequest('/auth/register/', { method: 'POST', body: payload, auth: false }),
  login: (payload) => apiRequest('/auth/login/', { method: 'POST', body: payload, auth: false }),
  refreshToken: (refresh) => apiRequest('/auth/token/refresh/', { method: 'POST', body: { refresh }, auth: false }),
  getProfile: () => apiRequest('/profile/'),
  updateProfile: (payload) => apiRequest('/profile/', { method: 'PUT', body: payload }),
  deleteProfile: () => apiRequest('/profile/', { method: 'DELETE' }),
  addAddress: (payload) => apiRequest('/profile/address/', { method: 'POST', body: payload }),
  checkArmstrong: (number) => apiRequest('/armstrong/check/', { method: 'POST', body: { number } }),
  findArmstrongInRange: (min, max) => apiRequest('/armstrong/range/', { method: 'POST', body: { min, max } }),
  getAttempts: () => apiRequest('/attempts/'),
  submitFeedback: (payload) => apiRequest('/feedback/', { method: 'POST', body: payload, auth: false }),
  getContact: () => apiRequest('/contact/', { auth: false }),
};

export const getDisplayName = (user) => {
  if (!user) return 'Student';
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
  return fullName || user.name || user.username || 'Student';
};
