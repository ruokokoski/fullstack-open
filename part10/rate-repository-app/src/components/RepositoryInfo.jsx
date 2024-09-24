import React from 'react';
import { View, Image, StyleSheet, Pressable, Text } from 'react-native';
import { useParams } from 'react-router-native';
import { openURL } from 'expo-linking';
import useRepo from '../hooks/useRepo';
import theme from '../theme';

const fixCount = (count) => {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k';
  }
  return count.toString();
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
  },
  flexContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'flex-start',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  flexContainer2: {
    flex: 1,
  },
  name: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  descr: {
    marginBottom: 10,
    color: theme.colors.textSecondary,
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
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: theme.colors.textWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const RepositoryInfo = ({ repository }) => {
  if (!repository) return null;

  const handlePress = async () => {
    if (repository.url) {
      await openURL(repository.url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Image
          source={{ uri: repository.ownerAvatarUrl }}
          style={styles.image}
        />
        <View style={styles.flexContainer2}>
          <Text style={styles.name}>{repository.fullName}</Text>
          <Text style={styles.descr}>{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
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
      <Pressable onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};

export default RepositoryInfo;