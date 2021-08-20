import { Home, Circle, ShoppingCart } from 'react-feather'

export default [
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