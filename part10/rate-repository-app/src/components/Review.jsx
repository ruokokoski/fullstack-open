import * as yup from 'yup';
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Button from './Button';
import FormikTextInput from './FormikTextInput';
import useReview from '../hooks/useReview';
import { useNavigate } from 'react-router-native';

const initialValues = {
    owner: '',
    repo: '',
    rating: '',
    review: '',
  };

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    margin: 20,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  fieldContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorInput: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textWhite,
  },
});

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Owner name is required'),
  repo: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number('A number between 0 and 100 is required')
    .min(0, 'A number between 0 and 100 is required')
    .max(100, 'A number between 0 and 100 is required')
    .required('Rating is required'),
  review: yup
    .string()
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="owner" placeholder="Repository owner name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="repo" placeholder="Repository name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="rating" placeholder="Rating" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput multiline={true} name="review" placeholder="Review" />
      </View>
      <Button onPress={onSubmit}>Create a review</Button>
    </View>
  );
};

export const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const Review = () => {
  const [createReview] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { owner, repo, rating, review } = values;

    try {
      await createReview({ owner, repo, rating, review });
        navigate('/', { replace: true })
    } catch (e) {
        console.log('Error:', e);
    }
  };

  return (
    <ReviewContainer onSubmit={onSubmit} />
  )
}

export default Review;