import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import SortRepositories from './SortRepositories';
import { useDebounce } from 'use-debounce';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, onRepositoryPress, selectedSort, setSort, searchKeyword, setSearch, onEndReach  }) => {
  
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const rItem = ({ item }) => {
    return (
      <Pressable onPress={() => {onRepositoryPress(item.id)}}>
        <RepositoryItem repository={item} />
      </Pressable>
    );
  };
  return (
    <>
    <Searchbar
      placeholder="Search repositories"
      onChangeText={setSearch}
      value={searchKeyword}
    />
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={rItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <SortRepositories selectedSort={selectedSort} setSort={setSort} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
    </>
  );
};

const RepositoryList = () => {
  const limit = 8;
  const [selectedSort, setSort] = useState("latest");
  const [searchKeyword, setSearch] = useState('');
  const [search] = useDebounce(searchKeyword, 1000)
  const { repositories, fetchMore } = useRepositories(limit, selectedSort, search);
  const navigate = useNavigate();

  const openRepo = (id) => {
    navigate(`/repository/${id}`, { replace: true });
  };

  const onEndReach = () => {
    //console.log('You have reached the end of the list');
    fetchMore();
  };

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      onRepositoryPress={openRepo}
      selectedSort={selectedSort}
      setSort={setSort}
      searchKeyword={searchKeyword}
      setSearch={setSearch}
      onEndReach={onEndReach}
    />

  )
};

export default RepositoryList;