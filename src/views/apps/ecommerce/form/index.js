// ** React Imports
import { useState, useEffect, useCallback, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { InputGroup, InputGroupAddon, Input, Button, Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, saveGig } from '../store/actions'

import '@styles/base/pages/app-ecommerce-details.scss'
import classes from './form.module.css'

const Form = () => {
  // ** Vars
  const {id} = useParams()
  const history = useHistory()
  const [item, setItem] = useState()
  

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
  const gig = store.productDetail

  const getItem = useCallback(() => {
    dispatch(getProduct(id))
  }, [])
  
  // ** ComponentDidMount : Get product
  useEffect(() => {
    getItem()
  }, [])

  const handleInputChange = useCallback((event) => {
    setItem(prev => ({
        ...prev,
        title : event.target.value,
        description : event.target.value,
        category : event.target.value,
        searchTags : event.target.value,
        price : event.target.value
      }))
  }, [])
  
//   useEffect(handleInputChange, [])
  
  const handleSave = () => {
      alert('Gig saved')
      dispatch(saveGig(id, item))
      history.push(`/apps/gigs-management/details/${id}`)
  }
  
  const handleCancel = () => {
    history.push(`/apps/gigs-management/details/${id}`)
}

  return (
    <Fragment>
      <BreadCrumbs breadCrumbTitle={`Gig #${id} edit form`} breadCrumbParent='Gigs Management' breadCrumbActive='Edit Form' />
      <div className='app-ecommerce-details'>
        <Card>
            <CardBody>
                <h2>Title</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='text'
                        name="title"
                        defaultValue={gig.title}
                        onChange={handleInputChange}
                    />
                </InputGroup>
                <h2>Description</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='textarea'
                        name="description"
                        defaultValue={gig.description || ''}
                        onChange={handleInputChange}
                    />
                </InputGroup>
                <h2>Categories</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='text'
                        name="category"
                        defaultValue={gig.category || ''}
                        onChange={handleInputChange}
                    />
                </InputGroup>
                <h2>Search Tags</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='text'
                        name="searchTags"
                        defaultValue={gig.searchTags || ''}
                        onChange={handleInputChange}
                    />
                </InputGroup>
                <h2>Amount</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='number'
                        name="price"
                        defaultValue={gig.price || ''}
                        onChange={handleInputChange}
                    />
                </InputGroup>
                <InputGroup className={classes.buttons}>
                    <Button color='danger' onClick={handleCancel}>Cancel</Button>
                    <Button color='success' onClick={handleSave}>Save Gig</Button>
                </InputGroup>
            </CardBody>
        </Card>
      </div>
    </Fragment>
  )
}

export default Form