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
      // {
      //   id: 'invoiceEdit',
      //   title: 'Edit',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/invoice/edit'
      // }
      // {
      //   id: 'invoiceAdd',
      //   title: 'Add',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/invoice/add'
      // }
    ]
  },
  {
    id: 'gigs',
    title: 'Gigs Management',
    icon: <ShoppingCart size={20} />,
    children: [
      {
        id: 'gigs',
        title: 'Gigs',
        icon: <Circle size={12} />,
        navLink: '/apps/gigs'
      },
      // {
      //   id: 'shop',
      //   title: 'Gigs',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/gigs-management/gigs'
      // },
      {
        id: 'fetured',
        title: 'Featured Gigs',
        icon: <Circle size={12} />,
        navLink: '/apps/gigs-management/featured'
      }
    ]
  }
]
