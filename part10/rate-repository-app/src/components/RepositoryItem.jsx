import { View, Image, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const fixCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
  },
  flexContainer2: {
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    marginTop: 5,
    marginBottom: 10,
  },
  descr: {
    marginBottom: 10,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: '#ffffff',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 40,
    paddingRight: 10,
    backgroundColor: '#ffffff',
  },
  stat: {
    alignItems: 'center',
    padding: 10,
  },
  statText: {
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
  },
  statLabel: {
    color: theme.colors.textSecondary,
    marginTop: 5,
  },
});

const RepositoryItem = ({ repository }) => {
  return (
    <View testID="repositoryItem">
    <View style={styles.flexContainer}>
      <Image
        source={{ uri: repository.ownerAvatarUrl }}
        style={styles.image}
      />
      <View style={styles.flexContainer2}>
        <Text
          fontSize="subheading"
          fontWeight="bold"
          color="textPrimary"
          style={styles.name}
        >
          {repository.fullName}
        </Text>
        <Text
          color="textSecondary"
          style={styles.descr}
        >
          {repository.description}
        </Text>
        <Text
          style={styles.language}
        >
          {repository.language}
        </Text>
      </View>
    </View>
    <View style={styles.statsContainer}>
    <View style={styles.stat}>
      <Text style={styles.statText}>{fixCount(repository.stargazersCount)}</Text>
      <Text style={styles.statLabel}>Stars</Text>
    </View>
    <View style={styles.stat}>
      <Text style={styles.statText}>{fixCount(repository.forksCount)}</Text>
      <Text style={styles.statLabel}>Forks</Text>
    </View>
    <View style={styles.stat}>
      <Text style={styles.statText}>{repository.reviewCount}</Text>
      <Text style={styles.statLabel}>Reviews</Text>
    </View>
    <View style={styles.stat}>
      <Text style={styles.statText}>{repository.ratingAverage}</Text>
      <Text style={styles.statLabel}>Rating</Text>
    </View>
  </View>
  </View>
  );
};

export default RepositoryItem;