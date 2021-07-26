import React from 'react'
import { useHistory } from 'react-router-dom'

import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

export default function AlertDialog () {
  const [open, setOpen] = React.useState(false)
  const history = useHistory()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    history.push('/products')
  }

  return (
    <div style={{ display: 'grid', placeItems: 'center' }}>
      <Button
        variant='outlined'
        onClick={handleClickOpen}
        style={{ fontSize: '42px', textTransform: 'capitalize', width: '80%' }}
      >
        Continue Shopping
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'Continue Shopping ..? '}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Pop! Vinyl are highly stylized bobbleheads from Funko based on the
            Japanese style known as Chibi.
            <br />
            <br />
            Pop! Vinyl figures cover a range of licensed brands and popular
            culture such as video games, television, movies, and more.
            <br />
            <br />
            Pop! Vinyl are becoming increasingly popular with retailers, so much
            that Funko has increased its financial incentives to retailers
            twofold.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            SHOW ME THE PRODUCTS
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
