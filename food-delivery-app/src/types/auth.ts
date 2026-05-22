export type RegisterResponse = {
  data: {
    user: {
      _id: string;
      email: string;
      username: string;
    };
  } | null;
  errors?: string[];
  message: string;
  statusCode: number;
  success: boolean;
};

export type LoginResponse = {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      _id: string;
      email: string;
      username: string;
    };
  } | null;
  errors?: string[];
  message: string;
  statusCode: number;
  success: boolean;
};
