import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery, gql} from '@apollo/client';

const GET_REVIEWS = gql`
query GetReviews {
  reviews {
    data {
      id
      attributes {
         title
         body
         rating
         createdAt
         slug
         categories {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
`


const Home = () => {

  const { loading, error, data } = useQuery(GET_REVIEWS)

  if(loading) return <>Loading...</>

  if(error) return <>Error: {error}</>

  return (
    <div>
      {
        data.reviews.data.map(review=> (
          <div key={review.id} className='review-card' id={review.id}>
            <div className="rating">
              {review.attributes.rating}
            </div>

              <h2>{review.attributes.title}</h2>
              {
              review.attributes.categories.data.map(category => <small key={category.id}>{category.attributes.name}</small>
              )
              }
            
              <p>{review.attributes.body.substring(0,200)}</p>
            <Link to={`/reviews/${review.attributes.slug}`} >
                Read more
              </Link>
            </div>
        ))
      }
    </div>
  )
}

export default Home