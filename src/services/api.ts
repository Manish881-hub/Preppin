import axios from 'axios';
import {
  API_URL,
  USER_API_URL,
  POST_API_URL,
  COMPANY_API_URL,
  QUESTION_API_URL,
  COMMENT_API_URL,
  WALLET_API_URL,
  SUBSCRIPTION_API_URL
} from '@/config/env';

// Types based on database layout
export interface User {
  id: string;
  // Add other user fields from FastAPI
}

export interface Profile {
  userId: string;
  username: string;
}

export interface Post {
  postId: string;
  companyId: string;
  heading: string;
  summary: string;
  upvotes: number;
  shares: number;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewQuestion {
  questionId: string;
  postId: string;
  content: string;
  roundNumber: number;
  isOnsite: boolean;
  isTechnical: boolean;
  isVerified: boolean;
  hasQualityCheck: boolean;
}

export interface Company {
  companyId: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Following {
  userId: string;
  companyId: string;
}

export interface Comment {
  commentId: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  encryptedUserId: string;
  currentBalance: number;
  currency: string;
}

export interface Subscription {
  userId: string;
  endDate: string;
}

// Create a configured axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use((config) => {
  // Get token from localStorage or elsewhere
  const token = localStorage.getItem('auth_token');

  // If token exists, add to headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// API functions that can be used throughout the app
export const apiService = {
  // Auth related API calls
  auth: {
    login: async (credentials: any) => {
      return api.post('/auth/login', credentials);
    },
    register: async (userData: any) => {
      return api.post('/auth/register', userData);
    },
    refreshToken: async () => {
      return api.post('/auth/refresh');
    },
  },

  // User and Profile related API calls
  users: {
    getById: async (id: string) => {
      return api.get(`${USER_API_URL}/${id}`);
    },
    updateProfile: async (userId: string, profileData: Partial<Profile>) => {
      return api.put(`${USER_API_URL}/${userId}/profile`, profileData);
    },
    getProfile: async (userId: string) => {
      return api.get(`${USER_API_URL}/${userId}/profile`);
    },
  },

  // Posts related API calls
  posts: {
    getAll: async () => {
      return api.get(POST_API_URL);
    },
    getById: async (id: string) => {
      return api.get(`${POST_API_URL}/${id}`);
    },
    create: async (postData: Partial<Post>) => {
      return api.post(POST_API_URL, postData);
    },
    update: async (id: string, postData: Partial<Post>) => {
      return api.put(`${POST_API_URL}/${id}`, postData);
    },
    delete: async (id: string) => {
      return api.delete(`${POST_API_URL}/${id}`);
    },
    upvote: async (id: string) => {
      return api.post(`${POST_API_URL}/${id}/upvote`);
    },
    share: async (id: string) => {
      return api.post(`${POST_API_URL}/${id}/share`);
    },
    getByCompany: async (companyId: string) => {
      return api.get(`${POST_API_URL}/company/${companyId}`);
    },
  },

  // Questions related API calls
  questions: {
    getByPostId: async (postId: string) => {
      return api.get(`${QUESTION_API_URL}/post/${postId}`);
    },
    create: async (questionData: Partial<InterviewQuestion>) => {
      return api.post(QUESTION_API_URL, questionData);
    },
    update: async (id: string, questionData: Partial<InterviewQuestion>) => {
      return api.put(`${QUESTION_API_URL}/${id}`, questionData);
    },
    delete: async (id: string) => {
      return api.delete(`${QUESTION_API_URL}/${id}`);
    },
    verify: async (id: string) => {
      return api.post(`${QUESTION_API_URL}/${id}/verify`);
    },
  },

  // Companies related API calls
  companies: {
    getAll: async () => {
      return api.get(COMPANY_API_URL);
    },
    getById: async (id: string) => {
      return api.get(`${COMPANY_API_URL}/${id}`);
    },
    create: async (companyData: Partial<Company>) => {
      return api.post(COMPANY_API_URL, companyData);
    },
    update: async (id: string, companyData: Partial<Company>) => {
      return api.put(`${COMPANY_API_URL}/${id}`, companyData);
    },
    follow: async (companyId: string, userId: string) => {
      return api.post(`${COMPANY_API_URL}/${companyId}/follow`, { userId });
    },
    unfollow: async (companyId: string, userId: string) => {
      return api.delete(`${COMPANY_API_URL}/${companyId}/follow/${userId}`);
    },
    getFollowers: async (companyId: string) => {
      return api.get(`${COMPANY_API_URL}/${companyId}/followers`);
    },
  },

  // Comments related API calls
  comments: {
    getByPostId: async (postId: string) => {
      return api.get(`${COMMENT_API_URL}/post/${postId}`);
    },
    create: async (commentData: Partial<Comment>) => {
      return api.post(COMMENT_API_URL, commentData);
    },
    update: async (id: string, commentData: Partial<Comment>) => {
      return api.put(`${COMMENT_API_URL}/${id}`, commentData);
    },
    delete: async (id: string) => {
      return api.delete(`${COMMENT_API_URL}/${id}`);
    },
  },

  // Wallet related API calls
  wallet: {
    getBalance: async (userId: string) => {
      return api.get(`${WALLET_API_URL}/${userId}`);
    },
    addFunds: async (userId: string, amount: number) => {
      return api.post(`${WALLET_API_URL}/${userId}/add`, { amount });
    },
    withdraw: async (userId: string, amount: number) => {
      return api.post(`${WALLET_API_URL}/${userId}/withdraw`, { amount });
    },
  },

  // Subscription related API calls
  subscription: {
    getStatus: async (userId: string) => {
      return api.get(`${SUBSCRIPTION_API_URL}/${userId}`);
    },
    subscribe: async (userId: string, planId: string) => {
      return api.post(`${SUBSCRIPTION_API_URL}/${userId}`, { planId });
    },
    cancel: async (userId: string) => {
      return api.delete(`${SUBSCRIPTION_API_URL}/${userId}`);
    },
  },
};

export default api;