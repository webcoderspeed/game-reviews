import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

const CATEGORIES = gql`
  query GetCategory {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

const Header = () => {

  const { loading, error, data } = useQuery(CATEGORIES);

  if (loading) return <>Loading...</>

  if (error) return <>Error: {error}</>

  return (
    <div className='site-header'>
      <Link to='/'>
        <h1>Game Reviews</h1>

        <nav
        className='categories'
        > 
        <span>Filter reviews by category:</span>
          {
            data.categories.data.map(
              category => (
                <Link to={`/category/${category.id}`}>
                  {category.attributes.name}
                </Link>
              )
            )
          }
        </nav>
      </Link>
    </div>
  );
};

export default Header;
