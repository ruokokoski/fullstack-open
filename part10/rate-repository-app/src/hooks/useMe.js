import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const useMe = (variables) => {
  const { data, loading, error } = useQuery(ME, { 
    variables,
    fetchPolicy: 'cache-and-network'
  });

  return { 
    reviews: data ? data.me : undefined,
    loading,
    error
  };
};

export default useMe;