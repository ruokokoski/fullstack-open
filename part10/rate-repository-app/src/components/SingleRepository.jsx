import { FlatList, View, StyleSheet, Dimensions } from 'react-native';
import RepositoryInfo from './RepositoryInfo';
import Text from './Text';
import useRepo from '../hooks/useRepo';
import { useParams } from 'react-router-native';
import theme from '../theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    paddingLeft: 15,
  },
  separator: {
    height: 10
  },
  score: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    height: 50,
    width: 50,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    textAlign: "center",
    lineHeight: 50,
  },
  name: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 5,
  },
  date:{
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  reviewText: {
    color: theme.colors.textPrimary,
    lineHeight: 20,
    flexWrap: 'wrap',
    maxWidth: width - 85,
  }
});

const fixDate = (wrongFormat) => {
  const date = new Date(wrongFormat);
  
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

const ReviewItem = ({ review }) => {
  console.log(review.createdAt)
  return (
    <View style={styles.container}>
      <Text style={styles.score}>{review.rating}</Text>
      <View style={styles.content}>
        <Text style={styles.name}>{review.user.username}</Text>
        <Text style={styles.date}>{fixDate(review.createdAt)}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>  
  );
};

const SingleRepository = () => {
  limit = 8
  const { id } = useParams();
  //const { repository, loading, error } = useRepo(id);
  const { repository, fetchMore } = useRepo({ first: limit, id: id });

  const onEndReach = () => {
    //console.log('Testing end of list')
    fetchMore();
  };

  if (!repository) return <Text>Repository not found</Text>;

  const ItemSeparator = () => <View style={styles.separator} />;
  
  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};
  
export default SingleRepository;