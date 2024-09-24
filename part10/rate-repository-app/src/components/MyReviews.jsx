import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const MyReviews = () => {
  const { reviews } = useMe({ includeReviews: true});

  const reviewNodes = reviews
    ? reviews.reviews.edges.map(edge => edge.node)
    : [];

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;