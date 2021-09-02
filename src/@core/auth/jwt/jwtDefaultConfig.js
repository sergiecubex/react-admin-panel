// ** Auth Endpoints
export default {
  loginEndpoint: `${process.env.REACT_APP_BASE_URL}/admin/login`,
  registerEndpoint: `${process.env.REACT_APP_BASE_URL}/admin/register`,
  refreshEndpoint: '/jwt/refresh-token',
  logoutEndpoint: '/jwt/logout',
  verifyEndpoint: `${process.env.REACT_APP_BASE_URL}/admin/verify`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
