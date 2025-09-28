

// API URLs
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const USER_API_URL = `${API_URL}/users`;
export const POST_API_URL = `${API_URL}/posts`;
export const COMPANY_API_URL = `${API_URL}/companies`;
export const QUESTION_API_URL = `${API_URL}/questions`;
export const COMMENT_API_URL = `${API_URL}/comments`;
export const WALLET_API_URL = `${API_URL}/wallet`;
export const SUBSCRIPTION_API_URL = `${API_URL}/subscription`;

// Auth related configurations
export const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN || '';
export const AUTH_CLIENT_ID = import.meta.env.VITE_AUTH_CLIENT_ID || '';

// Feature flags
export const ENABLE_PREMIUM_FEATURES = import.meta.env.VITE_ENABLE_PREMIUM_FEATURES === 'true';

// Other configuration
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Preppin';
export const APP_DESCRIPTION = import.meta.env.VITE_APP_DESCRIPTION || 'Share and discover interview experiences';

// Environment detection
export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;