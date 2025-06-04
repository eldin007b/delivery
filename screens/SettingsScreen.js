import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, Switch, TextInput } from 'react-native';

export default function SettingsScreen() {
  const [language, setLanguage] = useState('bs');
  const [theme, setTheme] = useState('light');
  const [email, setEmail] = useState('transportklagenfurt@gmail.com');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Postavke</Text>

      <Text style={styles.label}>Jezik</Text>
      <Picker
        selectedValue={language}
        onValueChange={(itemValue) => setLanguage(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Bosanski" value="bs" />
        <Picker.Item label="Deutsch" value="de" />
        <Picker.Item label="English" value="en" />
      </Picker>

      <Text style={styles.label}>Tema</Text>
      <Picker
        selectedValue={theme}
        onValueChange={(itemValue) => setTheme(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Bijela" value="light" />
        <Picker.Item label="Tamna" value="dark" />
        <Picker.Item label="GLS stil" value="gls" />
      </Picker>

      <Text style={styles.label}>Email za izvještaje</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 16, marginTop: 10 },
  picker: { height: 50, width: '100%' },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
});
