import { Link } from 'react-router-native';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  tab: {
    color: '#ffffff',
    paddingTop: 50,
    padding: 10,
  },
});

const Tab = ({ to, name }) => {
  return (
    <Link to={to} underlayColor={theme.colors.textWhite} style={styles.tab}>
      <View>
        <Text fontSize="subheading" fontWeight="bold" style={styles.tab}>
          {name}
        </Text>
      </View>
    </Link>
  );
};

export default Tab;