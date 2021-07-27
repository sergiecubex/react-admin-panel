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
        title: 'List',
        icon: <Circle size={12} />,
        navLink: '/apps/sales/list'
      },
      {
        id: 'invoicePreview',
        title: 'Preview',
        icon: <Circle size={12} />,
        navLink: '/apps/sales/preview'
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
        id: 'shop',
        title: 'Gigs',
        icon: <Circle size={12} />,
        navLink: '/apps/gigs-management/gigs'
      },
      // {
      //   id: 'detail',
      //   title: 'Gig Details',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/gigs-management/details'
      // },
      {
        id: 'fetured',
        title: 'Featured Gigs',
        icon: <Circle size={12} />,
        navLink: '/apps/gigs-management/featured'
      }
      // {
      //   id: 'wishList',
      //   title: 'Wish List',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/ecommerce/wishlist'
      // }
      // {
      //   id: 'checkout',
      //   title: 'Checkout',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/ecommerce/checkout'
      // }
    ]
  }
]
