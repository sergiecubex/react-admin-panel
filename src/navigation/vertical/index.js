import { Mail, Home, FileText, Circle, ShoppingCart } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'sales',
    title: 'Sales Management',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'invoiceList',
        title: 'Completed payouts',
        icon: <Circle size={12} />,
        navLink: '/apps/sales/completed'
      },
      {
        id: 'invoicePreview',
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
      },
      {
        id: 'fetured',
        title: 'Featured Gigs',
        icon: <Circle size={12} />,
        navLink: '/apps/gigs-management/featured'
      }
    ]
  }
]
