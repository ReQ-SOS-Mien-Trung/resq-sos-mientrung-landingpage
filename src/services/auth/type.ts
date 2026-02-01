// Request types
export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleLoginRequest {
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

export interface AuthError {
  message: string;
  errors?: {
    [key: string]: string[];
  };
  statusCode?: number;
}