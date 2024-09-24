import { useMutation} from '@apollo/client';
import { DEL_REVIEW } from '../graphql/mutations';


const useDelReview = () => {
  const [mutate, result] = useMutation(DEL_REVIEW);

  const deleteReview = async ({ id }) => {
    console.log("Attempting to delete review with id:", id);
    return mutate({
      variables: {
        id
      }
    })
  };

  return [deleteReview, result];
};

export default useDelReview;