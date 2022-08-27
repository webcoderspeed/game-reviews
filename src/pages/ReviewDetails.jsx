import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown'

const GET_REVIEW = gql`
query GetReview($slug: String!) {
  reviews(
	filters: {
    slug: {
      eq: $slug
    }
  }
  ) {
    data {
      id
      attributes {
         title
        slug
         rating
         body
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
  const { slug } = useParams();

  const { loading, error, data } = useQuery(GET_REVIEW, { variables: { slug } });

  if (loading) return <>Loading...</>;

  if (error) return <>Error: {error}</>;

  return (
    <div className='review-card'>
      <div className='rating'>{data.reviews.data[0].attributes.rating}</div>
      <h2>{data.reviews.data[0].attributes.title}</h2>
      {
        data.reviews.data[0].attributes.categories.data.map(category => <small key={category.id}>{category.attributes.name}</small>
        )
      }


      <p>{data.reviews.data[0].attributes.body}</p>
    </div>
  );
};

export default ReviewDetails;
