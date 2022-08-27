import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown'

const GET_REVIEW = gql`
query GetReview($id: ID!) {
  review(id: $id) {
    data {
      id
      attributes {
         title
         body
         rating
         createdAt
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
`;

const ReviewDetails = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_REVIEW, { variables: { id } });

  if (loading) return <>Loading...</>;

  if (error) return <>Error: {error}</>;

  return (
    <div className='review-card'>
      <div className='rating'>{data.review.data.attributes.rating}</div>
      <h2>{data.review.data.attributes.title}</h2>
      {
        data.review.data.attributes.categories.data.map(category => <small key={category.id}>{category.attributes.name}</small>
        )
      }


      <ReactMarkdown>{data.review.data.attributes.body}</ReactMarkdown>
    </div>
  );
};

export default ReviewDetails;
