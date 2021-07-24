import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import { apiURL } from '../util/apiURL'

import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  },
  h1product: {
    width: '100vw',
    height: 'minmax(5%,8%)',
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
  },
  buttonsDiv: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  productshowB: {
    backgroundColor: '#eeeeee',
    width: '20%',
    margin: '10px 20px 0px 10px',
    borderRadius: '10px',
    '&:hover': {
      background: '#e0e0e0'
    }
  },
  fit: {
    width: '100%',
    height: '100%',
    padding: '30px'
  }
}))

const API = apiURL()

export default function EditItem ({ updateProduct }) {
  let { id } = useParams()
  const [product, setProduct] = useState({})
  const history = useHistory()
  const classes = useStyles()
  const [checked, setChecked] = useState(false)

  const [userEdited, setUserEdited] = useState({
    category: '',
    name: '',
    price: '',
    is_new: false
  })

  const handleTextChange = event => {
    setUserEdited({ ...userEdited, [event.target.id]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    updateProduct(id, userEdited)
    history.push(`/products/${id}`)
  }
  const handleChange = event => {
    setChecked(event.target.checked)
  }

  useEffect(() => {
    axios
      .get(`${API}/products/${id}`)
      .then(res => {
        setProduct(res.data[0])
        setUserEdited(res.data[0])
        setChecked(res.data[0].is_new)
      })
      .catch(e => {
        history.push('/not-found')
      })
  }, [])
  return (
    <>
      <Typography variant='h1' className={classes.h1product}>
        {product.name}
      </Typography>
      <div className='shGriDv2-TwoDivs'>
        <img src={product.image} alt={product.name} style={{transform: 'scale(0.8)'}}/>

        <CssBaseline />
        <Container
          maxWidth='sm'
          component={Paper}
          elevation={3}
          className={classes.fit}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              style={{ margin: 0, padding: 10 }}
              InputLabelProps={{ shrink: true }}
              onChange={handleTextChange}
              value={userEdited.category}
              placeholder='New category'
              label='Category'
              variant='outlined'
              id='category'
              fullWidth
              required
            />
            <TextField
              style={{ margin: 0, padding: 10 }}
              InputLabelProps={{ shrink: true }}
              onChange={handleTextChange}
              value={userEdited.name}
              placeholder='New Name'
              label='Name'
              variant='outlined'
              id='name'
              fullWidth
              required
            />
            <TextField
              style={{ margin: 0, padding: 10 }}
              InputLabelProps={{ shrink: true }}
              onChange={handleTextChange}
              value={userEdited.price}
              InputProps={{
                inputProps: {
                  max: 100,
                  min: 0
                }
              }}
              variant='outlined'
              placeholder='$'
              label='Price'
              type='number'
              id='price'
              fullWidth
              required
            />
            <List>
              <ListItem alignItems='center'>
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                  required
                />
                <TextField
                  fullWidth
                  disabled
                  placeholder='Is a New Product .?'
                />
              </ListItem>
            </List>

            <div style={{ margin: 0, padding: 14 }}>
              <Button
                variant='outlined'
                color='primary'
                type='submit'
                fullWidth
              >
                UpDate Product
              </Button>
              <div>&emsp;</div>
              <Button
                onClick={() => {
                  history.push(`/products/${id}`)
                }}
                variant='outlined'
                color='primary'
                type='button'
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </>
  )
}
