import { useMutation} from '@apollo/client';
import { USER_SIGN_UP } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(USER_SIGN_UP);

  const signUp = async ({ username, password }) => {

    return mutate({
      variables: {
        user: {
          username,
          password
        }
      }
    });
  };

  return [signUp, result];
};

export default useSignUp;