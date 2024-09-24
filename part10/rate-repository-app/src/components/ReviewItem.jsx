import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from './Text';
import theme from '../theme';
import Button from './Button'
import useDelReview from '../hooks/useDelReview';
import useMe from '../hooks/useMe'

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
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: theme.colors.error,
  },
});

const fixDate = (wrongFormat) => {
  const date = new Date(wrongFormat);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

const ReviewItem = ({ review }) => {
    const navigate = useNavigate();
    const [deleteReview] = useDelReview();
    const { refetch } = useMe({includeReviews: true});

    const handleViewRepository = () => {
      navigate(`/repository/${review.repository.id}`);
    };
    
    const handleDeleteReview = () => {
        Alert.alert(
          'Delete review',
          'Are you sure you want to delete this review?',
          [
            {
              text: 'Cancel',
              style: "cancel"
            },
            {
              text: 'Delete',
              onPress: async () => {
                console.log("Delete button pressed");
                await deleteReview({id: review.id});
                await refetch();
              }
            },
          ],
          { cancelable: true }
        );
      };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{review.rating}</Text>
      <View style={styles.content}>
        <Text style={styles.name}>{review.repository.fullName}</Text>
        <Text style={styles.date}>{fixDate(review.createdAt)}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={handleViewRepository}>
            View repository
          </Button>
          <Button style={[styles.button, styles.deleteButton]} onPress={handleDeleteReview}>
            Delete review
          </Button>
        </View>
      </View>
    </View>  
  );
};

export default ReviewItem;