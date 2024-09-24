import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  
  const createReview = async ({ owner, repo, rating, review }) => {
    return mutate({
      variables: {
        owner,
        repo,
        rating: Number(rating),
        review
      }
    })
  };
  
  return [createReview, result];
};
  
export default useReview;