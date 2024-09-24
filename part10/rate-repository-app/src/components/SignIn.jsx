import * as yup from 'yup';
import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Button from './Button';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const initialValues = {
    username: '',
    password: '',
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
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

const SignInForm = ({ onSubmit }) => {
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
        <Button onPress={onSubmit}>Sign in</Button>
      </View>
    );
};

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/', { replace: true })
    } catch (e) {
      console.log('Error in mutation:', e);
    }
  };

  return (
    <SignInContainer onSubmit={onSubmit} />
  )
};

export default SignIn;