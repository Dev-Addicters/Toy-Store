import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { apiURL } from '../util/apiURL.js'
import ReviewsForm from './ReviewsForm'
import Review from './Review.js'

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
    gridTemplateRows: 'auto 1fr'
  },
  h1product: {
    display: 'grid',
    placeItems: 'center'
  }
})

const API = apiURL()

export default function Reviews ({ productId }) {
  const [allReviews, setAllReviews] = useState([])
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState('panel1')

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
      <h1 className={classes.h1product}>REVIEWS</h1>
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
                id='panel1d-header'
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
                </Container>
              </AccordionDetails>
            </Accordion>
          )
        })}

        <ReviewsForm newForm={true} createReview={createReview} />
      </div>
    </div>
  )
}
