// Request types
export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleAuthRequest {
  idToken: string;
}

// Response types
export interface RegisterResponse {
  userId: string;
  email: string;
  fullName: string | null;
  roleId: number;
  isEmailVerified: boolean;
  message: string;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

// Unified Google Auth Response
export interface GoogleAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    isOnboarded: boolean;
  };
}

export interface AuthError {
  message: string;
  errors?: {
    [key: string]: string[];
  };
  statusCode?: number;
}