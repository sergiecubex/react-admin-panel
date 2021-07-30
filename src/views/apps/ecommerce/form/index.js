// ** React Imports
import { useState, useEffect, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

// ** Third Party Components
import { InputGroup, InputGroupAddon, Input, Button, Card, CardBody } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../store/actions'

import '@styles/base/pages/app-ecommerce-details.scss'
import classes from './form.module.css'

const Form = () => {
  // ** Vars
  const {id} = useParams()
  const history = useHistory()

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
  const gig = store.productDetail
  console.log(gig)
  // ** ComponentDidMount : Get product
  useEffect(() => {
    dispatch(getProduct(id))
  }, [])
  
  const handleSave = () => {
      alert('Gig saved')
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
                        value={gig.title}
                        // disabled={disabled}
                        // onChange={handleInputChange}
                    />
                </InputGroup>
                <h2>Description</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='textarea'
                        value={gig.description}
                        // disabled={disabled}
                        // onChange={handleInputChange}
                    />
                </InputGroup>
                <h2>Categories</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='text'
                        value={gig.category}
                        // disabled={disabled}
                        // onChange={handleInputChange}
                    />
                </InputGroup>
                <h2>Search Tags</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='text'
                        value={gig.searchTags}
                        // disabled={disabled}
                        // onChange={handleInputChange}
                    />
                </InputGroup>
                <h2>Amount</h2>
                <InputGroup className={classes.input}>
                    <Input
                        type='number'
                        value={gig.price}
                        // disabled={disabled}
                        // onChange={handleInputChange}
                    />
                </InputGroup>
                <Button color='success' onClick={handleSave}>Save Gig</Button>
            </CardBody>
        </Card>
      </div>
    </Fragment>
  )
}

export default Form