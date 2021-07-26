import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import ListItem from '@material-ui/core/ListItem'
import Checkbox from '@material-ui/core/Checkbox'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'

import ImageListItemBar from '@material-ui/core/ImageListItemBar'
import ImageListItem from '@material-ui/core/ImageListItem'
import IconButton from '@material-ui/core/IconButton'
import ImageList from '@material-ui/core/ImageList'
import GamesIcon from '@material-ui/icons/Games'
import itemData from './images/itemData'

const useStyles = makeStyles(theme => ({
  root: {
    height: 'fit-content',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  imageList: {
    padding: '20px 0px 0px 50px',
    backgroundColor: 'blanchedalmond',
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    height: '600px'
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: 'bolder',
    color: '#181817'
  },
  titleBar: {
    borderRadius: '20px',
    background:
      'linear-gradient(to top, rgba(24,24,23,0.3) 0%, rgba(24,24,23,0.2) 70%, rgba(24,24,23,0) 100%)'
  },
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
    height: '100%',
    padding: '30px'
  }
}))
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

export default function NewItem (props) {
  const classes = useStyles()
  const history = useHistory()
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    quantity: '',
    is_new: true
  })
  const [category, setCategory] = useState('Exclusive')

  const handleCatChange = event => {
    setCategory(event.target.value)
  }
  const handleInput = e => {
    const { id, value } = e.target
    setNewProduct({
      ...newProduct,
      [id]: id === 'quantity' ? Number(value) : value
    })
  }
  const handleCheck = () => {
    setNewProduct({ ...newProduct, is_new: !newProduct.is_new })
  }
  const handleSubmit = e => {
    e.preventDefault()
    props.addNewCard(newProduct)
    history.push('/products')
  }
  const populateForm = item => {
    setNewProduct({
      ...newProduct,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      quantity: Number(item.quantity)
    })
  }

  return (
    <>
      <Typography variant='h4' className={classes.h1product}>
        Fill the form to add a new product
      </Typography>
      <div className='shGriDv2-TwoDivs'>
        <div className={classes.root}>
          <ImageList
            className={classes.imageList}
            cols={1}
            rowHeight='auto'
            gap={10}
          >
            {itemData.map(item => (
              <ImageListItem key={item.img}>
                <img
                  src={item.img}
                  alt={item.title}
                  className={classes.imagen}
                />
                <ImageListItemBar
                  title={item.name}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  actionIcon={
                    <IconButton
                      aria-label={`star ${item.title}`}
                      onClick={() => populateForm(item)}
                    >
                      <GamesIcon className={classes.title} />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </div>

        <div className='itemDetails'>
          <br />
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
                onChange={handleInput}
                value={newProduct.name}
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
                onChange={handleInput}
                value={newProduct.quantity}
                InputProps={{
                  inputProps: {
                    max: 10000,
                    min: 0
                  }
                }}
                variant='outlined'
                placeholder='10'
                label='Quantity'
                type='number'
                id='quantity'
                fullWidth
                required
              />
              <TextField
                style={{ margin: 0, padding: 10 }}
                InputLabelProps={{ shrink: true }}
                onChange={handleInput}
                value={newProduct.price}
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
                value={newProduct.category}
                label='Category'
                id='category'
                fullWidth
                required
                select
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <br />
              <br />

              <TextField
                style={{ margin: 0, padding: 10 }}
                InputLabelProps={{ shrink: true }}
                onChange={handleInput}
                value={newProduct.image}
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
                    checked={newProduct.is_new}
                    onChange={handleCheck}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    color='black'
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
                <Button variant='outlined' type='submit' fullWidth>
                  Create Product
                </Button>
                <div>&emsp;</div>
                <Button
                  onClick={() => {
                    history.push(`/products`)
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
          <br />
        </div>
      </div>
    </>
  )
}
