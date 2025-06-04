import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RidesContext } from '../context/RidesContext';

export default function StatsScreen() {
  // Dodajte podrazumevanu vrednost prazan niz
  const { rides = [] } = useContext(RidesContext);

  // Dodajte dodatnu proveru
  if (!Array.isArray(rides)) {
    console.error('Rides nije niz:', rides);
    return (
      <View style={styles.container}>
        <Text>Greška pri učitavanju podataka</Text>
      </View>
    );
  }

  // Bezbedno koristite reduce sa praznim nizom kao početnom vrednošću
  const stats = rides.reduce((acc, ride) => {
    const driver = ride?.driver?.trim()?.toLowerCase() || 'nepoznato';
    if (!acc[driver]) {
      acc[driver] = { 
        name: ride.driver || 'Nepoznat vozač', 
        totalEarnings: 0, 
        totalRides: 0 
      };
    }
    acc[driver].totalEarnings += Number(ride.price) || 0;
    acc[driver].totalRides += 1;
    return acc;
  }, {});

  const data = Object.values(stats);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistika po vozaču</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Ukupno vožnji: {item.totalRides}</Text>
            <Text>Zarada: €{item.totalEarnings.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Ostavite styles objekat isti