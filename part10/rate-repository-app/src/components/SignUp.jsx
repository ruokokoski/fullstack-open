import * as yup from 'yup';
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Button from './Button';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';

const initialValues = {
    username: '',
    password: '',
    confirmation: '',
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
    username: yup
      .string()
      .min(5, 'Username must be at least 5 characters')
      .max(30, 'Username must be between 5 and 30 characters')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Password must be at least 5 characters')
      .max(30, 'Password must be between 5 and 30 characters')
      .required('Password is required'),
    confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords do not match')
      .required('Password confirmation is required')
});

const SignUpForm = ({ onSubmit }) => {
    return (
      <View style={styles.container}>
        <View style={styles.fieldContainer}>
          <FormikTextInput name="username" placeholder="Username" />
        </View>
        <View style={styles.fieldContainer}>
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
        </View>
        <View style={styles.fieldContainer}>
          <FormikTextInput
            name="confirmation"
            placeholder="Password confirmation"
            secureTextEntry
          />
        </View>
        <Button onPress={onSubmit}>Sign up</Button>
      </View>
    );
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/', { replace: true })
    } catch (e) {
      console.log('Error in mutation:', e);
    }
  };

  return (
    <SignUpContainer onSubmit={onSubmit} />
  )
};

export default SignUp;