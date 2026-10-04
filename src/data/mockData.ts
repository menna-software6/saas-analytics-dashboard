import { 
  MetricData, 
  RevenueDataPoint, 
  CustomerGrowthPoint, 
  TrafficSource, 
  Transaction, 
  ActivityItem, 
  PlanPerformance,
  Customer,
  FunnelStep,
  NotificationItem
} from '../types';

export const KPI_METRICS: MetricData[] = [
  {
    title: 'MRR',
    value: '$84,240',
    rawValue: 84240,
    change: 18.6,
    period: 'vs last month',
    trend: 'up',
    sparkline: [62000, 65000, 68000, 71000, 74500, 78900, 84240],
    color: 'violet',
    prefix: '$',
  },
  {
    title: 'Active Users',
    value: '24,892',
    rawValue: 24892,
    change: 12.4,
    period: 'vs last month',
    trend: 'up',
    sparkline: [19400, 20100, 21200, 22000, 23100, 24000, 24892],
    color: 'mint',
  },
  {
    title: 'Conversion Rate',
    value: '8.42%',
    rawValue: 8.42,
    change: 2.8,
    period: 'vs last month',
    trend: 'up',
    sparkline: [6.8, 7.1, 7.0, 7.4, 7.9, 8.1, 8.42],
    color: 'purple',
    suffix: '%',
  },
  {
    title: 'Churn Rate',
    value: '1.24%',
    rawValue: 1.24,
    change: -0.6,
    period: 'vs last month',
    trend: 'down',
    sparkline: [2.1, 1.9, 1.8, 1.6, 1.5, 1.35, 1.24],
    color: 'cyan',
    suffix: '%',
  }
];

export const REVENUE_DATA_30D: RevenueDataPoint[] = [
  { date: 'Oct 01', label: 'Oct 1', revenue: 2650, expenses: 720, netRevenue: 1930, orders: 42 },
  { date: 'Oct 03', label: 'Oct 3', revenue: 2890, expenses: 750, netRevenue: 2140, orders: 48 },
  { date: 'Oct 05', label: 'Oct 5', revenue: 2420, expenses: 680, netRevenue: 1740, orders: 39 },
  { date: 'Oct 08', label: 'Oct 8', revenue: 3120, expenses: 810, netRevenue: 2310, orders: 54 },
  { date: 'Oct 10', label: 'Oct 10', revenue: 3450, expenses: 860, netRevenue: 2590, orders: 59 },
  { date: 'Oct 12', label: 'Oct 12', revenue: 2980, expenses: 790, netRevenue: 2190, orders: 47 },
  { date: 'Oct 15', label: 'Oct 15', revenue: 3820, expenses: 920, netRevenue: 2900, orders: 66 },
  { date: 'Oct 17', label: 'Oct 17', revenue: 4100, expenses: 950, netRevenue: 3150, orders: 71 },
  { date: 'Oct 20', label: 'Oct 20', revenue: 3650, expenses: 880, netRevenue: 2770, orders: 60 },
  { date: 'Oct 22', label: 'Oct 22', revenue: 4420, expenses: 1020, netRevenue: 3400, orders: 78 },
  { date: 'Oct 25', label: 'Oct 25', revenue: 4890, expenses: 1110, netRevenue: 3780, orders: 84 },
  { date: 'Oct 27', label: 'Oct 27', revenue: 4350, expenses: 1040, netRevenue: 3310, orders: 74 },
  { date: 'Oct 29', label: 'Oct 29', revenue: 5210, expenses: 1180, netRevenue: 4030, orders: 92 },
  { date: 'Oct 31', label: 'Oct 31', revenue: 5640, expenses: 1250, netRevenue: 4390, orders: 99 },
];

export const REVENUE_DATA_7D: RevenueDataPoint[] = [
  { date: 'Mon', label: 'Monday', revenue: 3850, expenses: 890, netRevenue: 2960, orders: 64 },
  { date: 'Tue', label: 'Tuesday', revenue: 4120, expenses: 940, netRevenue: 3180, orders: 70 },
  { date: 'Wed', label: 'Wednesday', revenue: 3950, expenses: 910, netRevenue: 3040, orders: 67 },
  { date: 'Thu', label: 'Thursday', revenue: 4620, expenses: 1050, netRevenue: 3570, orders: 80 },
  { date: 'Fri', label: 'Friday', revenue: 5240, expenses: 1190, netRevenue: 4050, orders: 91 },
  { date: 'Sat', label: 'Saturday', revenue: 4780, expenses: 1080, netRevenue: 3700, orders: 82 },
  { date: 'Sun', label: 'Sunday', revenue: 5640, expenses: 1250, netRevenue: 4390, orders: 99 },
];

export const REVENUE_DATA_90D: RevenueDataPoint[] = [
  { date: 'W1 Aug', label: 'Aug W1', revenue: 18400, expenses: 4300, netRevenue: 14100, orders: 310 },
  { date: 'W3 Aug', label: 'Aug W3', revenue: 20100, expenses: 4600, netRevenue: 15500, orders: 345 },
  { date: 'W1 Sep', label: 'Sep W1', revenue: 22600, expenses: 5100, netRevenue: 17500, orders: 390 },
  { date: 'W3 Sep', label: 'Sep W3', revenue: 25200, expenses: 5600, netRevenue: 19600, orders: 430 },
  { date: 'W1 Oct', label: 'Oct W1', revenue: 27900, expenses: 6200, netRevenue: 21700, orders: 485 },
  { date: 'W3 Oct', label: 'Oct W3', revenue: 31800, expenses: 6900, netRevenue: 24900, orders: 550 },
];

export const REVENUE_DATA_12M: RevenueDataPoint[] = [
  { date: 'Nov', label: 'Nov 2025', revenue: 42000, expenses: 11200, netRevenue: 30800, orders: 740 },
  { date: 'Dec', label: 'Dec 2025', revenue: 46500, expenses: 12100, netRevenue: 34400, orders: 810 },
  { date: 'Jan', label: 'Jan 2026', revenue: 51200, expenses: 13000, netRevenue: 38200, orders: 900 },
  { date: 'Feb', label: 'Feb 2026', revenue: 55800, expenses: 13900, netRevenue: 41900, orders: 975 },
  { date: 'Mar', label: 'Mar 2026', revenue: 61400, expenses: 14800, netRevenue: 46600, orders: 1080 },
  { date: 'Apr', label: 'Apr 2026', revenue: 66200, expenses: 15600, netRevenue: 50600, orders: 1160 },
  { date: 'May', label: 'May 2026', revenue: 70800, expenses: 16400, netRevenue: 54400, orders: 1240 },
  { date: 'Jun', label: 'Jun 2026', revenue: 74500, expenses: 17100, netRevenue: 57400, orders: 1310 },
  { date: 'Jul', label: 'Jul 2026', revenue: 77200, expenses: 17600, netRevenue: 59600, orders: 1360 },
  { date: 'Aug', label: 'Aug 2026', revenue: 80100, expenses: 18100, netRevenue: 62000, orders: 1410 },
  { date: 'Sep', label: 'Sep 2026', revenue: 82500, expenses: 18400, netRevenue: 64100, orders: 1460 },
  { date: 'Oct', label: 'Oct 2026', revenue: 84240, expenses: 18700, netRevenue: 65540, orders: 1495 },
];

export const CUSTOMER_GROWTH_DATA: CustomerGrowthPoint[] = [
  { date: 'Week 1', label: 'Week 1', newCustomers: 340, returningCustomers: 1280 },
  { date: 'Week 2', label: 'Week 2', newCustomers: 415, returningCustomers: 1420 },
  { date: 'Week 3', label: 'Week 3', newCustomers: 390, returningCustomers: 1580 },
  { date: 'Week 4', label: 'Week 4', newCustomers: 485, returningCustomers: 1750 },
  { date: 'Week 5', label: 'Week 5', newCustomers: 530, returningCustomers: 1940 },
  { date: 'Week 6', label: 'Week 6', newCustomers: 610, returningCustomers: 2160 },
];

export const TRAFFIC_SOURCES: TrafficSource[] = [
  { source: 'Organic Search', visitors: 14820, percentage: 42, color: '#7C5CFF' },
  { source: 'Direct', visitors: 8820, percentage: 25, color: '#20D9A6' },
  { source: 'Social', visitors: 5640, percentage: 16, color: '#A78BFA' },
  { source: 'Referral', visitors: 3520, percentage: 10, color: '#38BDF8' },
  { source: 'Paid', visitors: 2470, percentage: 7, color: '#F43F5E' },
];

export const RECENT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx_01',
    customerName: 'Sarah Chen',
    customerEmail: 'sarah.c@stripeflow.io',
    customerAvatar: 'SC',
    plan: 'Enterprise',
    amount: 2400,
    status: 'paid',
    date: 'Today, 2:45 PM',
    invoiceId: 'INV-2026-0891',
    paymentMethod: 'Mastercard •••• 4242',
  },
  {
    id: 'tx_02',
    customerName: 'Alex Thorne',
    customerEmail: 'a.thorne@hyperbase.co',
    customerAvatar: 'AT',
    plan: 'Pro',
    amount: 280,
    status: 'paid',
    date: 'Today, 1:12 PM',
    invoiceId: 'INV-2026-0890',
    paymentMethod: 'Visa •••• 8821',
  },
  {
    id: 'tx_03',
    customerName: 'Marcus Vance',
    customerEmail: 'm.vance@lineartech.dev',
    customerAvatar: 'MV',
    plan: 'Business',
    amount: 850,
    status: 'pending',
    date: 'Today, 11:30 AM',
    invoiceId: 'INV-2026-0889',
    paymentMethod: 'ACH Transfer •••• 9012',
  },
  {
    id: 'tx_04',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@solardata.ai',
    customerAvatar: 'ER',
    plan: 'Enterprise',
    amount: 3200,
    status: 'paid',
    date: 'Yesterday, 6:15 PM',
    invoiceId: 'INV-2026-0888',
    paymentMethod: 'Amex •••• 1004',
  },
  {
    id: 'tx_05',
    customerName: 'David Kalu',
    customerEmail: 'david@vertexmesh.org',
    customerAvatar: 'DK',
    plan: 'Starter',
    amount: 99,
    status: 'refunded',
    date: 'Yesterday, 3:20 PM',
    invoiceId: 'INV-2026-0887',
    paymentMethod: 'Visa •••• 3110',
  },
  {
    id: 'tx_06',
    customerName: 'Amara Lindqvist',
    customerEmail: 'amara@nordicpulse.se',
    customerAvatar: 'AL',
    plan: 'Pro',
    amount: 280,
    status: 'paid',
    date: 'Oct 02, 10:45 AM',
    invoiceId: 'INV-2026-0886',
    paymentMethod: 'Mastercard •••• 5590',
  },
  {
    id: 'tx_07',
    customerName: 'Julian Sterling',
    customerEmail: 'j.sterling@aethercloud.net',
    customerAvatar: 'JS',
    plan: 'Business',
    amount: 850,
    status: 'paid',
    date: 'Oct 01, 4:05 PM',
    invoiceId: 'INV-2026-0885',
    paymentMethod: 'Visa •••• 7712',
  }
];

export const ACTIVITY_FEED: ActivityItem[] = [
  {
    id: 'act_1',
    type: 'upgrade',
    user: {
      name: 'Sarah Chen',
      email: 'sarah.c@stripeflow.io',
      avatar: 'SC',
    },
    description: 'upgraded subscription from Pro to',
    highlight: 'Enterprise Tier ($2,400/mo)',
    timestamp: '14 minutes ago',
    amount: '+$2,400',
  },
  {
    id: 'act_2',
    type: 'workspace',
    user: {
      name: 'Michael Reed',
      email: 'm.reed@zenithscale.io',
      avatar: 'MR',
    },
    description: 'created a new production workspace',
    highlight: 'Zenith Production Cluster',
    timestamp: '42 minutes ago',
  },
  {
    id: 'act_3',
    type: 'payment',
    user: {
      name: 'Elena Rostova',
      email: 'elena@solardata.ai',
      avatar: 'ER',
    },
    description: 'settled annual contract invoice',
    highlight: 'NOVA received a $3,200 payment',
    timestamp: '2 hours ago',
    amount: '+$3,200',
  },
  {
    id: 'act_4',
    type: 'team',
    user: {
      name: 'Emma Wilson',
      email: 'emma@prismdynamics.com',
      avatar: 'EW',
    },
    description: 'invited 4 teammates to',
    highlight: 'Core Analytics Team',
    timestamp: '3 hours ago',
  },
  {
    id: 'act_5',
    type: 'export',
    user: {
      name: 'Julian Sterling',
      email: 'j.sterling@aethercloud.net',
      avatar: 'JS',
    },
    description: 'exported quarterly summary',
    highlight: 'Q3 Financial Audit (PDF)',
    timestamp: '5 hours ago',
  },
  {
    id: 'act_6',
    type: 'upgrade',
    user: {
      name: 'Liam Zhang',
      email: 'liam@quantumvector.ai',
      avatar: 'LZ',
    },
    description: 'activated add-on pipeline',
    highlight: 'Real-time Webhook Streaming',
    timestamp: '7 hours ago',
    amount: '+$450',
  }
];

export const TOP_PERFORMING_PLANS: PlanPerformance[] = [
  {
    name: 'Enterprise',
    price: 2400,
    revenue: 38400,
    customers: 16,
    conversion: 18.2,
    growth: 24.5,
    color: '#7C5CFF',
    activePct: 45.6,
  },
  {
    name: 'Business',
    price: 850,
    revenue: 27200,
    customers: 32,
    conversion: 14.8,
    growth: 16.2,
    color: '#20D9A6',
    activePct: 32.3,
  },
  {
    name: 'Pro',
    price: 280,
    revenue: 14560,
    customers: 52,
    conversion: 9.4,
    growth: 11.8,
    color: '#A78BFA',
    activePct: 17.3,
  },
  {
    name: 'Starter',
    price: 99,
    revenue: 4080,
    customers: 41,
    conversion: 4.6,
    growth: 5.1,
    color: '#38BDF8',
    activePct: 4.8,
  }
];

export const ALL_CUSTOMERS: Customer[] = [
  {
    id: 'cust_01',
    name: 'Sarah Chen',
    email: 'sarah.c@stripeflow.io',
    avatar: 'SC',
    company: 'StripeFlow Inc.',
    plan: 'Enterprise',
    status: 'active',
    mrr: 2400,
    ltv: 48000,
    joinedDate: 'Jan 14, 2025',
    lastActive: '5 mins ago',
    location: 'San Francisco, US'
  },
  {
    id: 'cust_02',
    name: 'Michael Reed',
    email: 'm.reed@zenithscale.io',
    avatar: 'MR',
    company: 'Zenith Scale Labs',
    plan: 'Business',
    status: 'active',
    mrr: 850,
    ltv: 11900,
    joinedDate: 'Mar 22, 2025',
    lastActive: '12 mins ago',
    location: 'Austin, US'
  },
  {
    id: 'cust_03',
    name: 'Emma Wilson',
    email: 'emma@prismdynamics.com',
    avatar: 'EW',
    company: 'Prism Dynamics',
    plan: 'Enterprise',
    status: 'active',
    mrr: 2400,
    ltv: 36000,
    joinedDate: 'Nov 02, 2024',
    lastActive: '1 hour ago',
    location: 'London, UK'
  },
  {
    id: 'cust_04',
    name: 'Alex Thorne',
    email: 'a.thorne@hyperbase.co',
    avatar: 'AT',
    company: 'Hyperbase Technologies',
    plan: 'Pro',
    status: 'active',
    mrr: 280,
    ltv: 2520,
    joinedDate: 'May 18, 2025',
    lastActive: '3 hours ago',
    location: 'Berlin, DE'
  },
  {
    id: 'cust_05',
    name: 'Marcus Vance',
    email: 'm.vance@lineartech.dev',
    avatar: 'MV',
    company: 'LinearTech Dev',
    plan: 'Business',
    status: 'trial',
    mrr: 850,
    ltv: 1700,
    joinedDate: 'Sep 25, 2026',
    lastActive: 'Yesterday',
    location: 'Toronto, CA'
  },
  {
    id: 'cust_06',
    name: 'Elena Rostova',
    email: 'elena@solardata.ai',
    avatar: 'ER',
    company: 'SolarData AI',
    plan: 'Enterprise',
    status: 'active',
    mrr: 3200,
    ltv: 64000,
    joinedDate: 'Aug 10, 2024',
    lastActive: '30 mins ago',
    location: 'Stockholm, SE'
  },
  {
    id: 'cust_07',
    name: 'David Kalu',
    email: 'david@vertexmesh.org',
    avatar: 'DK',
    company: 'VertexMesh Open Cloud',
    plan: 'Starter',
    status: 'churned',
    mrr: 99,
    ltv: 396,
    joinedDate: 'Jun 05, 2025',
    lastActive: '2 weeks ago',
    location: 'Amsterdam, NL'
  },
  {
    id: 'cust_08',
    name: 'Amara Lindqvist',
    email: 'amara@nordicpulse.se',
    avatar: 'AL',
    company: 'NordicPulse Media',
    plan: 'Pro',
    status: 'active',
    mrr: 280,
    ltv: 3360,
    joinedDate: 'Apr 11, 2025',
    lastActive: '4 hours ago',
    location: 'Copenhagen, DK'
  },
  {
    id: 'cust_09',
    name: 'Julian Sterling',
    email: 'j.sterling@aethercloud.net',
    avatar: 'JS',
    company: 'AetherCloud Systems',
    plan: 'Business',
    status: 'active',
    mrr: 850,
    ltv: 12750,
    joinedDate: 'Feb 01, 2025',
    lastActive: 'Just now',
    location: 'New York, US'
  },
  {
    id: 'cust_10',
    name: 'Chloe Monet',
    email: 'chloe@atelierlumiere.fr',
    avatar: 'CM',
    company: 'Atelier Lumiere',
    plan: 'Pro',
    status: 'at-risk',
    mrr: 280,
    ltv: 1960,
    joinedDate: 'Jul 20, 2025',
    lastActive: '5 days ago',
    location: 'Paris, FR'
  }
];

export const FUNNEL_STEPS: FunnelStep[] = [
  { step: 'Landing Views', users: 124800, conversionRate: 100, dropoffRate: 0 },
  { step: 'Signups Created', users: 28400, conversionRate: 22.8, dropoffRate: 77.2 },
  { step: 'Workspace Onboarded', users: 16200, conversionRate: 57.0, dropoffRate: 43.0 },
  { step: 'Feature Activated', users: 11400, conversionRate: 70.4, dropoffRate: 29.6 },
  { step: 'Paid Subscription', users: 2480, conversionRate: 21.8, dropoffRate: 78.2 }
];

export const COHORT_DATA = [
  { cohort: 'May 2026', users: 480, m0: 100, m1: 88, m2: 82, m3: 79, m4: 76, m5: 74 },
  { cohort: 'Jun 2026', users: 540, m0: 100, m1: 89, m2: 84, m3: 81, m4: 78, m5: 0 },
  { cohort: 'Jul 2026', users: 620, m0: 100, m1: 91, m2: 86, m3: 83, m4: 0, m5: 0 },
  { cohort: 'Aug 2026', users: 710, m0: 100, m1: 93, m2: 89, m3: 0, m4: 0, m5: 0 },
  { cohort: 'Sep 2026', users: 840, m0: 100, m1: 94, m2: 0, m3: 0, m4: 0, m5: 0 },
  { cohort: 'Oct 2026', users: 950, m0: 100, m1: 0, m2: 0, m3: 0, m4: 0, m5: 0 },
];

export const NOTIFICATIONS_DATA: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Enterprise Upgrade',
    message: 'Sarah Chen upgraded StripeFlow Inc to Enterprise Tier ($2,400/mo).',
    time: '14m ago',
    read: false,
    type: 'success'
  },
  {
    id: 'notif_2',
    title: 'High Growth Alert',
    message: 'Active users surpassed 24,000 threshold (+12.4% MoM).',
    time: '2h ago',
    read: false,
    type: 'info'
  },
  {
    id: 'notif_3',
    title: 'Payment Processed',
    message: 'NOVA received a $3,200 annual settlement from SolarData AI.',
    time: '5h ago',
    read: true,
    type: 'success'
  },
  {
    id: 'notif_4',
    title: 'Churn Prevention',
    message: 'Chloe Monet from Atelier Lumiere has been inactive for 5 days.',
    time: '1d ago',
    read: true,
    type: 'alert'
  }
];
