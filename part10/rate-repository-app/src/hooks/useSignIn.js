import { useMutation, useApolloClient  } from '@apollo/client';
import { USER_SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(USER_SIGN_IN);
  
  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: {
          username,
          password
        }
      }
    });
    // console.log('Mutation response data:', data.authenticate.accessToken);
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
  };
  
  return [signIn, result];
};

export default useSignIn;