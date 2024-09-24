import { useQuery } from '@apollo/client';
import { GET_REPOS } from '../graphql/queries';

const useRepositories = (first, selectedSort, searchKeyword) => {
  let orderBy, orderDirection;

  switch (selectedSort) {
    case 'ratingHigh':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'DESC';
      break;
    case 'ratingLow':
      orderBy = 'RATING_AVERAGE';
      orderDirection = 'ASC';
      break;
    case 'latest':
    default:
      orderBy = 'CREATED_AT';
      orderDirection = 'DESC';
  }
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOS, {
    variables: { first, orderBy, orderDirection, searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }
    //console.log('Before fetchMore')
    fetchMore({
      variables: {
        first,
        orderBy,
        orderDirection,
        searchKeyword,
        after: data.repositories.pageInfo.endCursor,
      },
    });
    //console.log('After fetchMore')
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
