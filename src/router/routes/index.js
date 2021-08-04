import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

// ** Document title
const TemplateTitle = 'HumanWorks - admin dashboard'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/apps/users',
    component: lazy(() => import('../../views/apps/users/list'))
  },
  {
    path: '/apps/user-details/:user',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/userDetail')),
    meta: {
      navLink: '/apps/user-details'
    }
  },
  {
    path: '/apps/user-form/:user',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/userForm')),
    meta: {
      navLink: '/apps/user-details/form'
    }
  },
  {
    path: '/apps/gigs',
    component: lazy(() => import('../../views/apps/gigs/list'))
  },
  {
    path: '/apps/gigs-management/form/:id',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/form')),
    meta: {
      navLink: '/apps/gigs-management/form'
    }
  },
  {
    path: '/apps/gigs-management/details/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/detail')),
    meta: {
      navLink: '/apps/gigs-management/details'
    }
  },
  {
    path: '/apps/sales/completed',
    component: lazy(() => import('../../views/apps/invoice/list'))
  },
  {
    path: '/apps/sales/preview/:id',
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/apps/sales/preview'
    }
  },
  {
    path: '/apps/sales/intended',
    component: lazy(() => import('../../views/apps/invoice/intended'))
  },
  {
    path: '/apps/sales/intended/:id',
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/apps/sales/intended'
    }
  },
  {
    path: '/apps/gigs-management/gigs',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/shop'))
  },
  {
    path: '/apps/gigs-management/featured',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/wishlist'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
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
