import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RidesContext } from '../context/RidesContext';

export default function AllRidesScreen() {
  const { rides } = useContext(RidesContext);

  if (!rides || rides.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nema unesenih vožnji.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sve vožnje</Text>
      <FlatList
        data={rides}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.date} | {item.driver} | {item.plz} | {item.stops} stopa | {item.price} €</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    backgroundColor: '#e9f0ff',
    borderRadius: 6,
    marginBottom: 6,
  },
});
