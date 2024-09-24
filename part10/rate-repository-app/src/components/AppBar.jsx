import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import theme from '../theme';
import Text from './Text';
import Tab from './Tab';
import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-native'
import useAuthStorage from '../hooks/useAuthStorage'
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 10,
  },
  tab: {
    color: '#ffffff',
    paddingTop: 50,
    padding: 10,
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const navigate = useNavigate();
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network'
  });  
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  
  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/signin', { replace: true })
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollView}
      >
        <Tab to="/" name="Repositories"></Tab>
        {(data && data.me) === null
          ? null
          : (
            <>
            <Tab to="/review" name="Create a review"></Tab>
            <Tab to="/myreviews" name="My reviews"></Tab>
            </>
          )
        }
        {data && data.me ? (
          <Pressable onPress={signOut} style={styles.tab}>
            <Text
              fontSize="subheading"
              fontWeight="bold"
              style={styles.tab}
            >
              Sign out
            </Text>
          </Pressable>
        ) : <Tab to="/signin" name="Sign in"></Tab>
        }
        {data && data.me 
          ? null
          : <Tab to="/signup" name="Sign up"></Tab>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;