export type UserProfileToken = {
  userId: number; // Adjust the data type as needed
  email: string;
  name: string; // Added name property
  address: string;
  phone: string;
  token: string;
  role: number; // Add role property
  avatar: string; // Add avatar property
  trustPoint: number; // Add trustScore property
};

export interface UserProfile {
  userId?: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: number; // Add role property
  avatar?: string; // Add avatar property
  trustPoint?: number; // Add trustScore property
}
