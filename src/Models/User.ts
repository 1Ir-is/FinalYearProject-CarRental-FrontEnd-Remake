export type UserProfileToken = {
  userId: number; // Adjust the data type as needed
  email: string;
  name: string; // Added name property
  address: string;
  phone: string;
  token: string;
};

export interface UserProfile {
  userId?: number;
  name?: string;
  email?: string;
  phone?: string; // Define phone as an optional property
  address?: string; // Define address as an optional property
  // Other properties...
}

