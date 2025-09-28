
import { create } from 'zustand';
import axios from 'axios';

// Types
export interface Post {
  id: string;
  title: string;
  content: string;
  company: string;
  questions: string[];
  isPremium: boolean;
  upvotes: number;
  comments: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  tags: string[];
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  followersCount: number;
  postsCount: number;
  isFollowing: boolean;
}

export interface Notification {
  id: string;
  type: 'comment' | 'upvote' | 'interview' | 'system';
  message: string;
  read: boolean;
  createdAt: string;
  relatedPostId?: string;
}

// Store interface
interface AppState {
  // Posts
  posts: Post[];
  filteredPosts: Post[];
  selectedPost: Post | null;
  postsLoading: boolean;
  postsError: string | null;

  // Companies
  companies: Company[];
  followedCompanies: Company[];
  selectedCompany: Company | null;
  companiesLoading: boolean;

  // Search
  searchQuery: string;
  searchResults: any[];
  searchLoading: boolean;

  // Notifications
  notifications: Notification[];
  unreadNotificationsCount: number;

  // Actions
  fetchPosts: () => Promise<void>;
  fetchCompanies: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
  followCompany: (id: string) => Promise<void>;
  unfollowCompany: (id: string) => Promise<void>;
  upvotePost: (id: string) => Promise<void>;
  searchPosts: (query: string) => Promise<void>;
  searchCompanies: (query: string) => Promise<void>;
  selectPost: (id: string) => void;
  selectCompany: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  setSearchQuery: (query: string) => void;
  filterPostsByCompany: (companyId: string) => void;
  resetFilters: () => void;
}

// Sample data
const samplePosts: Post[] = [
  {
    id: '1',
    title: 'My Google SWE Interview Experience',
    content: 'I recently interviewed at Google for a Software Engineering position. Here\'s my experience and the questions I was asked...',
    company: 'Google',
    questions: [
      'Implement a function to check if a binary tree is balanced.',
      'Design a system that counts unique visitors to a website in the last 5 minutes.',
      'Describe the architecture of a recent project you worked on.'
    ],
    isPremium: true,
    upvotes: 245,
    comments: 32,
    createdAt: '2023-09-15T10:30:00Z',
    author: {
      id: 'user1',
      name: 'Alex Chen',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=0D8ABC&color=fff',
    },
    tags: ['Software Engineering', 'Algorithms', 'System Design']
  },
  {
    id: '2',
    title: 'Apple Product Manager Interview Questions',
    content: 'Just finished my interview loop for a PM role at Apple. I wanted to share the types of questions they asked...',
    company: 'Apple',
    questions: [
      'How would you improve AirPods?',
      'How would you measure the success of Apple Maps?',
      'Describe a product you admire and why.'
    ],
    isPremium: true,
    upvotes: 187,
    comments: 19,
    createdAt: '2023-09-10T14:20:00Z',
    author: {
      id: 'user2',
      name: 'Sarah Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=FF5722&color=fff',
    },
    tags: ['Product Management', 'Product Design', 'Strategy']
  },
  {
    id: '3',
    title: 'Microsoft Azure Cloud Architect Interview',
    content: 'I interviewed for a Cloud Solutions Architect role focused on Azure. These are the questions that came up...',
    company: 'Microsoft',
    questions: [
      'Design a scalable microservices architecture for a e-commerce platform.',
      'How would you migrate a legacy system to Azure?',
      'Explain the difference between Azure Storage options.'
    ],
    isPremium: false,
    upvotes: 132,
    comments: 24,
    createdAt: '2023-09-05T09:45:00Z',
    author: {
      id: 'user3',
      name: 'Miguel Rodriguez',
      avatar: 'https://ui-avatars.com/api/?name=Miguel+Rodriguez&background=4CAF50&color=fff',
    },
    tags: ['Cloud', 'Azure', 'Architecture']
  },
  {
    id: '4',
    title: 'Meta (Facebook) Data Science Interview Questions',
    content: 'I recently went through the data science interview process at Meta. Here are the questions and my takeaways...',
    company: 'Meta',
    questions: [
      'Given a table of user activities, how would you measure engagement?',
      'Design an experiment to test the impact of a new feature.',
      'Write a SQL query to find the top 10 most active users.'
    ],
    isPremium: true,
    upvotes: 204,
    comments: 27,
    createdAt: '2023-09-01T11:15:00Z',
    author: {
      id: 'user4',
      name: 'Priya Patel',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=9C27B0&color=fff',
    },
    tags: ['Data Science', 'SQL', 'Experimentation']
  },
  {
    id: '5',
    title: 'Amazon Software Development Manager Interview',
    content: 'Interviewed for an SDM position at Amazon. These were the behavioral and technical questions they focused on...',
    company: 'Amazon',
    questions: [
      'Tell me about a time when you had to make a difficult decision without all the information you needed.',
      'How do you prioritize features in your roadmap?',
      'Design a distributed cache system.'
    ],
    isPremium: false,
    upvotes: 156,
    comments: 21,
    createdAt: '2023-08-25T15:30:00Z',
    author: {
      id: 'user5',
      name: 'David Kim',
      avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=F44336&color=fff',
    },
    tags: ['Leadership', 'System Design', 'Behavioral']
  }
];

const sampleCompanies: Company[] = [
  {
    id: 'company1',
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
    followersCount: 15420,
    postsCount: 532,
    isFollowing: true
  },
  {
    id: 'company2',
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/800px-Apple_logo_black.svg.png',
    followersCount: 12310,
    postsCount: 421,
    isFollowing: true
  },
  {
    id: 'company3',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/800px-Microsoft_logo.svg.png',
    followersCount: 9870,
    postsCount: 387,
    isFollowing: false
  },
  {
    id: 'company4',
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/800px-Meta_Platforms_Inc._logo.svg.png',
    followersCount: 8650,
    postsCount: 298,
    isFollowing: true
  },
  {
    id: 'company5',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/800px-Amazon_logo.svg.png',
    followersCount: 10250,
    postsCount: 412,
    isFollowing: false
  }
];

const sampleNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'comment',
    message: 'Alex Chen commented on your post "My Google SWE Interview Experience"',
    read: false,
    createdAt: '2023-09-16T10:30:00Z',
    relatedPostId: '1'
  },
  {
    id: 'notif2',
    type: 'upvote',
    message: 'Your post "Apple Product Manager Interview Questions" received 50 upvotes',
    read: true,
    createdAt: '2023-09-15T08:45:00Z',
    relatedPostId: '2'
  },
  {
    id: 'notif3',
    type: 'interview',
    message: 'Reminder: You have a practice interview scheduled tomorrow at 3 PM',
    read: false,
    createdAt: '2023-09-14T16:20:00Z'
  },
  {
    id: 'notif4',
    type: 'system',
    message: 'Your subscription has been renewed successfully',
    read: false,
    createdAt: '2023-09-10T12:15:00Z'
  }
];

// Create store
const useStore = create<AppState>((set, get) => ({
  // Initial state
  posts: [],
  filteredPosts: [],
  selectedPost: null,
  postsLoading: false,
  postsError: null,

  companies: [],
  followedCompanies: [],
  selectedCompany: null,
  companiesLoading: false,

  searchQuery: '',
  searchResults: [],
  searchLoading: false,

  notifications: [],
  unreadNotificationsCount: 0,

  // Actions
  fetchPosts: async () => {
    set({ postsLoading: true, postsError: null });
    try {
      // In a real app, you would fetch from an API
      // For now, we'll just use the sample data
      await new Promise(resolve => setTimeout(resolve, 1000));

      set({
        posts: samplePosts,
        filteredPosts: samplePosts,
        postsLoading: false
      });
    } catch (error) {
      set({
        postsError: 'Failed to fetch posts',
        postsLoading: false
      });
    }
  },

  fetchCompanies: async () => {
    set({ companiesLoading: true });
    try {
      // In a real app, you would fetch from an API
      await new Promise(resolve => setTimeout(resolve, 800));

      const companies = sampleCompanies;
      const followedCompanies = companies.filter(company => company.isFollowing);

      set({
        companies,
        followedCompanies,
        companiesLoading: false
      });
    } catch (error) {
      set({ companiesLoading: false });
    }
  },

  fetchNotifications: async () => {
    try {
      // In a real app, you would fetch from an API
      await new Promise(resolve => setTimeout(resolve, 600));

      const notifications = sampleNotifications;
      const unreadCount = notifications.filter(notif => !notif.read).length;

      set({
        notifications,
        unreadNotificationsCount: unreadCount
      });
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    }
  },

  followCompany: async (id: string) => {
    try {
      // In a real app, you would call an API
      await new Promise(resolve => setTimeout(resolve, 300));

      set(state => ({
        companies: state.companies.map(company =>
          company.id === id
            ? { ...company, isFollowing: true, followersCount: company.followersCount + 1 }
            : company
        ),
        followedCompanies: [
          ...state.followedCompanies,
          state.companies.find(company => company.id === id)!
        ].filter(Boolean) as Company[]
      }));
    } catch (error) {
      console.error('Failed to follow company', error);
    }
  },

  unfollowCompany: async (id: string) => {
    try {
      // In a real app, you would call an API
      await new Promise(resolve => setTimeout(resolve, 300));

      set(state => ({
        companies: state.companies.map(company =>
          company.id === id
            ? { ...company, isFollowing: false, followersCount: company.followersCount - 1 }
            : company
        ),
        followedCompanies: state.followedCompanies.filter(company => company.id !== id)
      }));
    } catch (error) {
      console.error('Failed to unfollow company', error);
    }
  },

  upvotePost: async (id: string) => {
    try {
      // In a real app, you would call an API
      await new Promise(resolve => setTimeout(resolve, 200));

      set(state => ({
        posts: state.posts.map(post =>
          post.id === id
            ? { ...post, upvotes: post.upvotes + 1 }
            : post
        ),
        filteredPosts: state.filteredPosts.map(post =>
          post.id === id
            ? { ...post, upvotes: post.upvotes + 1 }
            : post
        ),
        selectedPost: state.selectedPost?.id === id
          ? { ...state.selectedPost, upvotes: state.selectedPost.upvotes + 1 }
          : state.selectedPost
      }));
    } catch (error) {
      console.error('Failed to upvote post', error);
    }
  },

  searchPosts: async (query: string) => {
    set({ searchLoading: true, searchQuery: query });
    try {
      // In a real app, you would call an API
      await new Promise(resolve => setTimeout(resolve, 500));

      const results = get().posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.company.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      set({
        searchResults: results,
        searchLoading: false
      });
    } catch (error) {
      set({ searchLoading: false });
    }
  },

  searchCompanies: async (query: string) => {
    set({ searchLoading: true, searchQuery: query });
    try {
      // In a real app, you would call an API
      await new Promise(resolve => setTimeout(resolve, 500));

      const results = get().companies.filter(company =>
        company.name.toLowerCase().includes(query.toLowerCase())
      );

      set({
        searchResults: results,
        searchLoading: false
      });
    } catch (error) {
      set({ searchLoading: false });
    }
  },

  selectPost: (id: string) => {
    const post = get().posts.find(post => post.id === id) || null;
    set({ selectedPost: post });
  },

  selectCompany: (id: string) => {
    const company = get().companies.find(company => company.id === id) || null;
    set({ selectedCompany: company });
  },

  markNotificationAsRead: (id: string) => {
    set(state => {
      const updatedNotifications = state.notifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      );

      const unreadCount = updatedNotifications.filter(notif => !notif.read).length;

      return {
        notifications: updatedNotifications,
        unreadNotificationsCount: unreadCount
      };
    });
  },

  markAllNotificationsAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(notification => ({ ...notification, read: true })),
      unreadNotificationsCount: 0
    }));
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  filterPostsByCompany: (companyId: string) => {
    const company = get().companies.find(c => c.id === companyId);
    if (company) {
      const filtered = get().posts.filter(post => post.company === company.name);
      set({
        filteredPosts: filtered,
        selectedCompany: company
      });
    }
  },

  resetFilters: () => {
    set({
      filteredPosts: get().posts,
      selectedCompany: null
    });
  }
}));

export default useStore;