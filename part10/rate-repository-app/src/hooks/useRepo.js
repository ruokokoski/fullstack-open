import { useQuery } from '@apollo/client';
import { ONE_REPO } from '../graphql/queries';

const useRepo = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(ONE_REPO, { 
    variables,
    fetchPolicy: 'cache-and-network',
  });
  
  //console.log('Data:', data)

  const handleFetchMore = () => {
    const canFetchMore = !loading && data.repository.reviews.pageInfo.hasNextPage;

    if(!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      },
    });
  };

  return { 
    repository: data ? data.repository : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepo;