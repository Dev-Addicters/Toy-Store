import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { apiURL } from '../util/apiURL'
import axios from 'axios'

import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import MenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  },
  h1product: {
    width: '100vw',
    display: 'grid',
    gridArea: '1 / 1 / 2 / 1',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#a29684',
    color: '#292723'
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
    height: 'auto',
    padding: '30px'
  },
  check: { transform: 'translate(10px, -10px)', width: '52%' }
}))

const API = apiURL()
const categories = [
  { value: 'Disney', label: 'Disney' },
  { value: 'Game of Thrones', label: 'Game of Thrones' },
  { value: 'Harry Potter', label: 'Harry Potter' },
  { value: 'Marvel', label: 'Marvel' },
  { value: 'Movies', label: 'Movies' },
  { value: 'Cartoons', label: 'Cartoons' },
  { value: 'Exclusive', label: 'Exclusive' },
  { value: 'Coming Soon', label: 'Coming Soon' }
]

export default function EditItem ({ updateProduct }) {
  let { id } = useParams()
  const [product, setProduct] = useState({})
  const history = useHistory()
  const classes = useStyles()
  const [checked, setChecked] = useState(false)

  const [userEdited, setUserEdited] = useState({
    category: product.category,
    name: '',
    price: '',
    image: '',
    is_new: false
  })

  const handleCatChange = event => {
    setUserEdited({...userEdited, category: event.target.value})
  }

  const handleTextChange = event => {
    setUserEdited({ ...userEdited, [event.target.id]: event.target.value })
  }

  const handleSubmit = () => {
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
      <Typography variant='h3' className={classes.h1product}>
        {product.name}
      </Typography>
      <div className='shGriDv2-TwoDivs'>
        <img
          src={product.image}
          alt={product.name}
          style={{ transform: 'scale(0.9)' }}
        />
        <div className='itemDetails'>
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
                value={userEdited.name}
                placeholder='New Name'
                variant='outlined'
                label='Name'
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
              <TextField
                style={{ margin: 0, padding: 10 }}
                InputLabelProps={{ shrink: true }}
                helperText='Please select your category'
                onChange={handleCatChange}
                variant='outlined'
                value={product.category}
                label='Category'
                id='category'
                fullWidth
                required
                select
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value} >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <br />
              <TextField
                style={{ margin: 0, padding: 10 }}
                InputLabelProps={{ shrink: true }}
                onChange={handleTextChange}
                value={product.image}
                placeholder='http://'
                label='Image URL'
                variant='outlined'
                id='image'
                fullWidth
                required
              />
              <List>
                <ListItem alignItems='center'>
                  <Checkbox
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    onChange={handleChange}
                    checked={checked}
                    color='black'
                  />
                  <TextField
                    label='Is a New Product .?'
                    className={classes.check}
                    fullWidth
                    disabled
                  />
                </ListItem>
              </List>

              <div style={{ margin: 0, padding: 14 }}>
                <Button variant='outlined' type='submit' fullWidth>
                  UpDate Product
                </Button>
                <div>&emsp;</div>
                <Button
                  onClick={() => {
                    history.goBack()
                  }}
                  variant='outlined'
                  type='button'
                  fullWidth
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Container>
        </div>
      </div>
    </>
  )
}
