import { Picker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.mainBackground,
    },
    picker: {
      height: 50,
      padding: 15,
      backgroundColor: theme.colors.mainBackground,
      color: theme.colors.textPrimary,
      fontWeight: theme.fontWeights.bold,
      width: '100%',
    },
  });

const SortRepositories = ({ selectedSort, setSort }) => {
  return (
    <View style={styles.container}>
    <Picker
      selectedValue={selectedSort}
      onValueChange={(itemValue) => setSort(itemValue)}
      style={styles.picker}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="ratingHigh" />
      <Picker.Item label="Lowest rated repositories" value="ratingLow" />
    </Picker>
    </View>
  );
};

export default SortRepositories;