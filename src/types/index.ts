export interface UserCoin {
  id: string;
  name: string;
  symbol: string;
  description: string;
  totalSupply: number;
  currentSupply: number;
  color: string;
  coinType: 'small' | 'big' | 'angel' | 'standard';
  faceSize: 'small' | 'medium' | 'large';
  valueIntensity: number;
  creativeTeaching: boolean;
  seasonal: boolean;
  startDate?: Date;
  endDate?: Date;
  createdAt: Date;
  createdBy: string;
}

export interface Transaction {
  id: string;
  type: 'earned' | 'spent';
  amount: number;
  description: string;
  createdAt: Date;
  coinType: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: Date;
}

export interface AudioPost {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  user: User;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  createdAt: Date;
}