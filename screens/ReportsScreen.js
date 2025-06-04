import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { RidesContext } from '../context/RidesContext';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function ReportsScreen() {
  const ridesContext = useContext(RidesContext);
  const rides = Array.isArray(ridesContext?.rides) ? ridesContext.rides : [];

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // 1-12

  const filteredRides = rides.filter((ride) => {
    const rideMonth = new Date(ride.date).getMonth() + 1;
    return rideMonth === selectedMonth;
  });

  const totalEarned = filteredRides.reduce((sum, ride) => sum + (ride.price || 0), 0);

  const exportCSV = async () => {
    const header = 'Datum,Vozač,PLZ,Stopovi,Cijena\n';
    const rows = filteredRides.map(r =>
      `${r.date},${r.driver},${r.plz},${r.stops},${r.price}`
    ).join('\n');
    const csv = header + rows;

    const fileUri = FileSystem.documentDirectory + `Izvjestaj_${selectedMonth}_2025.csv`;
    await FileSystem.writeAsStringAsync(fileUri, csv, { encoding: FileSystem.EncodingType.UTF8 });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      Alert.alert('Greška', 'Dijeljenje nije podržano na ovom uređaju.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mjesečni izvještaj za {selectedMonth}. mjesec</Text>
      <Text>Ukupno vožnji: {filteredRides.length}</Text>
      <Text>Zarada: {totalEarned.toFixed(2)}€</Text>

      <FlatList
        data={filteredRides}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.rideItem}>
            <Text>{item.date} - {item.driver} - {item.stops} stopova - {item.price}€</Text>
          </View>
        )}
      />

      <View style={styles.buttonRow}>
        <Button title="Export CSV" onPress={exportCSV} />
        <Button title="Export PDF" onPress={() => Alert.alert('PDF Export', 'U pripremi...')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  rideItem: { paddingVertical: 5 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
});
