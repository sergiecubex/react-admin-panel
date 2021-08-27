import { lazy } from 'react'
import { Redirect } from 'react-router-dom'
import { isUserLoggedIn } from '@utils'

// ** Document title
const TemplateTitle = 'HumanWorks - admin dashboard'

// ** Default Route
const DefaultRoute = '/home'

const userData = JSON.parse(localStorage.getItem('userData'))
console.log(userData)
let userStatus
if (userData) {
  userStatus = userData.status
  console.log('Status: ', userStatus) 
} else {
  userStatus = ''
}


// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/dashboard/analytics',
    component: lazy(() => import('../../views/dashboard/analytics'))
  },
  {
    path: '/dashboard/sellers',
    component: lazy(() => import('../../views/dashboard/sellers')),
    exact: true
  },
  {
    path: '/dashboard/buyers',
    component: lazy(() => import('../../views/dashboard/buyers')),
    exact: true
  },
  {
    path: '/apps/users',
    exact: true,
    component: lazy(() => {
      if (userStatus === 'superadmin') {
        return import('../../views/apps/users/list')
      } else {
        return import('../../views/Error')
      }
    })
  },
  {
    path: '/apps/user-details/:user',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => {
      if (userStatus === 'superadmin') {
        return import('../../views/apps/ecommerce/userDetail')
      } else {
        return import('../../views/Error')
      }
    }),
    meta: {
      navLink: '/apps/user-details'
    }
  },
  // {
  //   path: '/apps/user-form/:user',
  //   exact: true,
  //   className: 'ecommerce-application',
  //   component: lazy(() => import('../../views/apps/ecommerce/userForm')),
  //   meta: {
  //     navLink: '/apps/user-details/form'
  //   }
  // },
  {
    path: '/apps/gigs',
    component: lazy(() => {
      if (userStatus === 'superadmin' || userStatus === 'admin') {
        return import('../../views/apps/gigs/list')
      } else {
        return import('../../views/Error')
      }
    })
  },
  {
    path: '/apps/gigs-management/featured',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/wishlist'))
  },
  {
    path: '/apps/gigs-management/form/:id',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => {
      if (userStatus === 'superadmin') {
        return import('../../views/apps/ecommerce/form')
      } else {
        return import('../../views/Error')
      }
    }),
    meta: {
      navLink: '/apps/gigs-management/form'
    }
  },
  {
    path: '/apps/gigs-management/details/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => {
      if (userStatus === 'superadmin' || userStatus === 'admin') {
        return import('../../views/apps/ecommerce/detail')
      } else {
        return import('../../views/Error')
      }
    }),
    meta: {
      navLink: '/apps/gigs-management/details'
    }
  },
  {
    path: '/apps/sales/completed',
    exact: true,
    component: lazy(() => {
      if (userStatus === 'superadmin') {
        return import('../../views/apps/invoice/list')
      } else {
        return import('../../views/Error')
      }
    })
  },
  {
    path: '/apps/sales/preview/:id',
    exact: true,
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/apps/sales/preview'
    }
  },
  {
    path: '/apps/sales/intended',
    exact: true,
    component: lazy(() => {
      if (userStatus === 'superadmin') {
        return import('../../views/apps/invoice/intended')
      } else {
        return import('../../views/Error')
      }
    })
  },
  {
    path: '/apps/sales/intended/:id',
    exact: true,
    component: lazy(() => {
      if (userStatus === 'superadmin') {
        return import('../../views/apps/invoice/preview')
      } else {
        return import('../../views/Error')
      }
    }),
    meta: {
      navLink: '/apps/sales/intended'
    }
  },
  // {
  //   path: '/apps/gigs-management/gigs',
  //   className: 'ecommerce-application',
  //   component: lazy(() => import('../../views/apps/ecommerce/shop'))
  // },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/admin-list',
    component: lazy(() => {
      if (userStatus === 'superadmin') {
        return import('../../views/AllAdmins')
      } else {
        return import('../../views/Error')
      }
    }),
    meta: {
      navLink: '/admin-list'
    }
  },
  {
    path: '/register',
    component: lazy(() => import('../../views/Register')),
    layout: 'BlankLayout'
  },
  {
    path: '/recovery',
    component: lazy(() => import('../../views/ForgotPassword')),
    layout: 'BlankLayout'
  },
  {
    path: '/pages/profile',
    component: lazy(() => import('../../views/pages/profile'))
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }
]

export { DefaultRoute, TemplateTitle, Routes }
