import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const GET_CATEGORY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      data {
        attributes {
          reviews {
            data {
              id
              attributes {
                title
                body
                rating
                categories {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const ReviewDetails = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { id },
  });

  if (loading) return <>Loading...</>;

  if (error) return <>Error: {error}</>;

  return (
    <div>
      {data.category.data.attributes.reviews.data.map((review) => (
        <div key={review.id} className='review-card' id={review.id}>
          <div className='rating'>{review.attributes.rating}</div>

          <h2>{review.attributes.title}</h2>
          {review.attributes.categories.data.map((category) => (
            <small key={category.id}>{category.attributes.name}</small>
          ))}
          <p>{review.attributes.body.substring(0, 200)}</p>
          <Link to={`/reviews/${review.id}`}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default ReviewDetails;
