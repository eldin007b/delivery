import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O aplikaciji</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Naziv:</Text>
        <Text style={styles.text}>GLS Cijene</Text>

        <Text style={styles.label}>Verzija:</Text>
        <Text style={styles.text}>1.0.0</Text>

        <Text style={styles.label}>Autor:</Text>
        <Text style={styles.text}>Eldin Begić</Text>

        <Text style={styles.label}>Firma:</Text>
        <Text style={styles.text}>B&D Kleintransporte KG</Text>

        <Text style={styles.label}>Adresa:</Text>
        <Text style={styles.text}>Adolf Tschabbusnig Straße 19/3, 9020 Klagenfurt</Text>

        <Text style={styles.label}>Telefon:</Text>
        <Text style={styles.text}>06641741783</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>transportklagenfurt@gmail.com</Text>
      </View>

      <Text style={styles.footer}>
        Aplikacija razvijena za internu upotrebu firme radi efikasnijeg obračuna i praćenja Sonderfahrt GLS vožnji.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#f0f0f0', padding: 16, borderRadius: 10 },
  label: { fontWeight: 'bold', marginTop: 10 },
  text: { marginBottom: 5 },
  footer: { marginTop: 30, fontStyle: 'italic', textAlign: 'center', color: '#555' }
});
