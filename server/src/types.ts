export interface Trip {
  userId: string;
  destination: string;
  duration: string;
  budget: number;
  travelers: number;
  itinerary: any; // You can make this more specific based on your needs
}

export interface User {
  sub: string; // Google's unique user ID
  email: string;
  name?: string;
  picture?: string;
}
