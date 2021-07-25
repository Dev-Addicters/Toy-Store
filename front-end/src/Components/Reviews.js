import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../util/apiURL.js'
import ReviewsForm from './ReviewsForm'
import Paper from '@material-ui/core/Paper'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Rating from '@material-ui/lab/Rating'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56
    }
  },
  content: {
    '&$expanded': {
      margin: '12px 0'
    }
  },
  expanded: {}
})(MuiAccordionSummary)

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiAccordionDetails)

const useStyles = makeStyles({
  reviewDiv: {
    display: 'grid',
    gridTemplateRows: 'auto auto'
  },
  h1product: {
    width: '100vw',
    display: 'grid',
    gridArea: '1 / 1 / 2 / 1',
    padding: '10px',
    textAlign: 'center',
    backgroundColor: '#a29684',
    color: '#292723',
    fontSize: '52px'
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
  txt: {
    color: 'black',
    fontSize: '1em'
  },
  reviewEdit: {
    marginTop: '20px'
  },
  fit: {
    width: '100%',
    height: '100%',
    padding: '20px'
  }
})

const API = apiURL()

export default function Reviews ({ productId }) {
  const [allReviews, setAllReviews] = useState([])
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState('panel1')
  const [editReview, setEditReview] = useState(false)

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  useEffect(() => {
    axios
      .get(`${API}/products/${productId}/itemreviews`)
      .then(res => {
        if (res.data === 'error') throw Error('Invalid data was sent.')

        setAllReviews(res.data.reverse())
      })
      .catch(e => console.log(e))
  }, [productId])

  const createReview = review => {
    axios
      .post(`${API}/products/${productId}/itemreviews`, review)
      .then(res => {
        if (res.data === 'error') throw Error('Invalid data was sent.')

        setAllReviews([res.data, ...allReviews])
      })
      .catch(e => console.log(e))
  }

  const updateReview = updatedReview => {
    axios
      .put(
        `${API}/products/${productId}/itemreviews/${updatedReview.id}`,
        updatedReview
      )
      .then(res => {
        const updated = res.data
        if (updated === 'error') throw Error('Invalid data was sent.')

        const copy = [...allReviews]
        const index = copy.findIndex(review => review.id === updated.id)
        copy[index] = updated
        setAllReviews(copy)
      })
      .catch(e => console.log(e))
  }

  const deleteReview = reviewId => {
    axios
      .delete(`${API}/products/${productId}/itemreviews/${reviewId}`)
      .then(res => {
        const deleted = res.data
        if (deleted === 'error') throw Error('Invalid data was sent.')

        const copy = [...allReviews]
        const index = copy.findIndex(review => review.id === deleted.id)
        copy.splice(index, 1)
        setAllReviews(copy)
      })
      .catch(e => console.log(e))
  }

  return (
    <div className={classes.reviewDiv}>
      <h1 className={classes.h1product} id='reviewsBlock'>
        REVIEWS
      </h1>
      <div>
        {allReviews.map((review, idx) => {
          return (
            <Accordion
              square
              expanded={expanded === `panel${idx + 1}`}
              onChange={handleChange(`panel${idx + 1}`)}
            >
              <AccordionSummary
                aria-controls='panel1d-content'
                id={`panel${idx + 1}d-header`}
              >
                <Typography variant='h4'>{review.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CssBaseline />
                <Container maxWidth='sm'>
                  <Typography gutterBottom>
                    <b>{review.reviewer}</b>
                  </Typography>

                  <Typography gutterBottom>{review.content}</Typography>
                  <Rating
                    name='read-only'
                    value={Number(review.rating)}
                    readOnly
                  />

                  <div className={classes.buttonsDiv}>
                    <Button
                      onClick={() => setEditReview(!editReview)}
                      variant='outlined'
                      className={classes.productshowB}
                    >
                      <Typography
                        variant='h6'
                        component='h2'
                        className={classes.txt}
                      >
                        {editReview ? 'Cancel' : 'Edit'}
                      </Typography>
                    </Button>
                    <Button
                      onClick={() => deleteReview(review.id)}
                      variant='outlined'
                      className={classes.productshowB}
                    >
                      <Typography
                        variant='h6'
                        component='h2'
                        className={classes.txt}
                      >
                        Delete
                      </Typography>
                    </Button>
                  </div>

                  <div className={classes.reviewEdit}>
                    {editReview && (
                      <ReviewsForm
                        newForm={false}
                        editReview={editReview}
                        setEditReview={setEditReview}
                        updateReview={updateReview}
                        reviewDetails={review}
                      />
                    )}
                  </div>
                </Container>
              </AccordionDetails>
            </Accordion>
          )
        })}
        <Accordion
          square
          expanded={expanded === `panel${allReviews.length + 1}`}
          onChange={handleChange(`panel${allReviews.length + 1}`)}
        >
          <AccordionSummary
            aria-controls='panel1d-content'
            id={`panel${allReviews.length}d-header`}
          >
            <Typography
              color='textSecondary'
              style={{ fontSize: '30px' }}
              gutterBottom
            >
              <b>Make a New Review</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CssBaseline />
            <Container maxWidth='xl' component={Paper} elevation={3}>
              <div className={classes.fit}>
                <ReviewsForm newForm={true} createReview={createReview} />
              </div>
            </Container>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}
