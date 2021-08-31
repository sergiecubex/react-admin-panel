import axios from 'axios'

// ** GET GIGs
export const getProducts = params => {
  return dispatch => {
    return axios.get('/apps/gigs-management/gigs', { params }).then(res => {
      dispatch({ type: 'GET_PRODUCTS', data: res.data, params })
    })
  }
}

export const getGig = id => {
  return dispatch => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/gigs/all/${id}`).then(res => {
      console.log(res.data)
      dispatch({ type: 'GET_GIG', data: res.data })
    })
  }
}

// ** SAVE GIG
export const saveGig = (id, item) => {
  return dispatch => {
    return axios.post(`/apps/gigs/${id}`).then((req, res) => {
      console.log(item)
      dispatch({ type: 'SAVE_GIG_ITEM', data: item})
    })
  }
}
// router.patch('/:id', auth, authz, async (ctx) => {
//   try {
//    await Company.findByIdAndUpdate(ctx.params.id, ctx.request.body, { runValidators: true });
//    ctx.status = 200;
//   } catch (error) {
//    ctx.throw(400, error.message);
//   }
//  });

// ** DELETE GIG
export const deleteGig = id => {
  return dispatch => {
    return axios.delete(`/apps/gigs/${id}`).then(res => {
      dispatch({ type: 'DELETE_GIG_ITEM', data: res.data })
    })
  }
}

// ** GET User
export const getUser = id => {
  return dispatch => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/users/all/${id}`).then(res => {
      dispatch({ type: 'GET_USER', data: res.data })
    })
  }
}

// ** DELETE User
export const deleteUser = id => {
  return dispatch => {
    return axios.delete(`/apps/users/${id}`).then(res => {
      dispatch({ type: 'DELETE_USER', data: res.data })
    })
  }
}

export const saveUser = (id, user) => {
  return dispatch => {
    return axios.post(`/apps/users/${id}`).then(() => {
      dispatch({ type: 'SAVE_USER', data: user})
    })
  }
}