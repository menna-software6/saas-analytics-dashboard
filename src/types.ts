export type NavPage = 
  | 'overview' 
  | 'analytics' 
  | 'revenue' 
  | 'customers' 
  | 'products' 
  | 'reports' 
  | 'workspace' 
  | 'team' 
  | 'integrations' 
  | 'settings'
  | 'landing';

export interface MetricData {
  title: string;
  value: string;
  rawValue: number;
  change: number; // percentage, positive or negative
  period: string;
  trend: 'up' | 'down';
  sparkline: number[];
  color: 'violet' | 'mint' | 'purple' | 'cyan';
  prefix?: string;
  suffix?: string;
}

export interface RevenueDataPoint {
  date: string;
  label: string;
  revenue: number;
  expenses: number;
  netRevenue: number;
  orders: number;
}

export interface CustomerGrowthPoint {
  date: string;
  label: string;
  newCustomers: number;
  returningCustomers: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
  color: string;
}

export type TransactionStatus = 'paid' | 'pending' | 'refunded';

export interface Transaction {
  id: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  plan: 'Starter' | 'Pro' | 'Business' | 'Enterprise';
  amount: number;
  status: TransactionStatus;
  date: string;
  invoiceId: string;
  paymentMethod: string;
}

export interface ActivityItem {
  id: string;
  type: 'upgrade' | 'workspace' | 'payment' | 'team' | 'export' | 'churn';
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  description: string;
  highlight: string;
  timestamp: string;
  amount?: string;
}

export interface PlanPerformance {
  name: 'Starter' | 'Pro' | 'Business' | 'Enterprise';
  price: number;
  revenue: number;
  customers: number;
  conversion: number;
  growth: number;
  color: string;
  activePct: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  plan: 'Starter' | 'Pro' | 'Business' | 'Enterprise';
  status: 'active' | 'trial' | 'churned' | 'at-risk';
  mrr: number;
  ltv: number;
  joinedDate: string;
  lastActive: string;
  location: string;
}

export interface FunnelStep {
  step: string;
  users: number;
  conversionRate: number;
  dropoffRate: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'alert' | 'success' | 'info';
}
