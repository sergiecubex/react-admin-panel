import { Mail, Home, FileText, Circle, ShoppingCart } from 'react-feather'

export default [
  // {
  //   id: 'home',
  //   title: 'Dashboard',
  //   icon: <Home size={20} />,
  //   navLink: '/home'
  // },
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    children: [
      {
        id: 'overall',
        title: 'Overall',
        icon: <Circle size={12} />,
        navLink: '/dashboard/analytics'
      },
      {
        id: 'supply',
        title: 'Supply (sellers)',
        icon: <Circle size={12} />,
        navLink: '/dashboard/sellers'
      },
      {
        id: 'demand',
        title: 'Demand (buyers)',
        icon: <Circle size={12} />,
        navLink: '/dashboard/buyers'
      }
    ]
  },
  {
    id: 'sales',
    title: 'Sales Management',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'payments',
        title: 'Payments',
        icon: <Circle size={12} />,
        navLink: '/apps/sales/payments'
      },
      {
        id: 'completedPayouts',
        title: 'Completed payouts',
        icon: <Circle size={12} />,
        navLink: '/apps/sales/completed'
      },
      {
        id: 'intendedPayouts',
        title: 'Intended payouts',
        icon: <Circle size={12} />,
        navLink: '/apps/sales/intended'
      }
    ]
  },
  {
    id: 'userManagement',
    title: 'User Management',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'users',
        title: 'Users',
        icon: <Circle size={12} />,
        navLink: '/apps/users'
      }
    ]
  },
  {
    id: 'gigs',
    title: 'Gig Management',
    icon: <ShoppingCart size={20} />,
    children: [
      {
        id: 'gigs',
        title: 'Gigs',
        icon: <Circle size={12} />,
        navLink: '/apps/gigs'
      }
    ]
  }
]
