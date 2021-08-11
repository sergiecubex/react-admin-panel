// ** React Imports
import { useState, useEffect, useCallback, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

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
    const value = event.target.value
    setItem(prev => ({
        ...prev,
        [event.target.name]: value
      }))
  }, [])
//   useEffect(handleInputChange, [])
  
  const handleSave = async () => {
    console.log(item)
    const payload = {...gig, ...item}
    await axios.post(`/apps/gigs/${id}`, payload)  
    history.push(`/apps/gigs/details`)
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
                    style={{height: '250px'}}
                    type='textarea'
                    name="description"
                    defaultValue={gig.longDescription}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <InputGroup className={classes.input}>
                  <h3>Main Category</h3>
                  <Input
                    style={{margin: '0 1rem'}}
                    type='text'
                    name="main-category"
                    defaultValue={gig.main_category}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <InputGroup className={classes.input}>
                  <h3>Parent subcategory</h3>
                  <Input
                    style={{margin: '0 1rem'}}
                    type='text'
                    name="parent-subcategory"
                    defaultValue={gig.parent_subcategory}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <InputGroup className={classes.input}>
                  <h3>Child subcategory</h3>
                  <Input
                    style={{margin: '0 1rem'}}
                    type='text'
                    name="child-subcategory"
                    defaultValue={gig.child_subcategory}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <h2>Search Tags</h2>
                <InputGroup className={classes.input}>
                {
                  gig.searchTags?.map((tag, index) => {
                    return (
                      <Input
                        style={{margin: '0 1rem'}}
                        key={tag}
                        type='text'
                        name={`tag${index}`}
                        defaultValue={tag}
                        onChange={handleInputChange}
                      />
                    )
                  })
                }
                </InputGroup>
                {
                  gig?.gigPackages?.map((pack, index) => {
                    return (
                      <InputGroup className={classes.input} key={pack.title}>
                        <span>{pack.priceCurrency}</span>
                        <Input
                          style={{margin: '0 1rem'}}
                          type='number'
                          name={`price${index}`}
                          defaultValue={pack.price}
                          onChange={handleInputChange}
                        />
                        <Input
                          style={{margin: '0 1rem'}}
                          type='number'
                          name={`turnAroundTimeInDays${index}`}
                          defaultValue={pack.turnAroundTimeInDays}
                          onChange={handleInputChange}
                        />
                        <Input
                          style={{margin: '0 1rem'}}
                          type='text'
                          name={`description${index}`}
                          defaultValue={pack.description}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    )
                  })
                }
                <h2>Requirements</h2>
                {
                  gig.requirements?.map((requirement, index) => {
                    return (
                      <InputGroup className={classes.input} key={requirement._id}>
                        <Input
                          type='text'
                          name={`requirement${index}`}
                          defaultValue={requirement.requirement}
                          onChange={handleInputChange}
                        />
                      </InputGroup>
                    )
                  })
                }

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