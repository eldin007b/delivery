
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RidesContext } from '../context/RidesContext';

import glsLogo from '../assets/logo.png'; // stavi ovdje svoj GLS logo

const PRICE_TABLE = {
  stops: {
    20: 120, 21: 120, 22: 120, 23: 120, 24: 120, 25: 120, 26: 120, 27: 120, 28: 120, 29: 120,
    30: 150, 31: 150, 32: 150, 33: 150, 34: 150, 35: 150, 36: 150, 37: 150, 38: 150, 39: 150,
    40: 185, 41: 185, 42: 185, 43: 185, 44: 185, 45: 185, 46: 185, 47: 185, 48: 185, 49: 185,
    50: 200, 51: 200, 52: 200, 53: 200, 54: 200, 55: 200, 56: 200, 57: 200, 58: 200, 59: 200,
    60: 225, 61: 225, 62: 225, 63: 225, 64: 225, 65: 225, 66: 225, 67: 225, 68: 225, 69: 225,
    70: 250, 71: 250, 72: 250, 73: 250, 74: 250, 75: 250, 76: 250, 77: 250, 78: 250, 79: 250,
    80: 275, 81: 275, 82: 275, 83: 275, 84: 275, 85: 275, 86: 275, 87: 275, 88: 275, 89: 275,
    90: 300, 91: 300, 92: 300, 93: 300, 94: 300, 95: 300, 96: 300, 97: 300, 98: 300, 99: 300,
    100: 320
  },
  plz: {
    9020:25,9061:30,9062:35,9063:40,9064:45,9065:50,9071:25,9072:30,9073:35,9074:40,
    9081:45,9082:50,9100:25,9102:30,9103:35,9104:40,9111:45,9112:50,9121:25,9122:30,
    9123:35,9124:40,9125:45,9130:50,9131:25,9132:30,9133:35,9135:40,9141:45,9142:50,
    9143:25,9150:30,9155:35,9161:40,9162:45,9163:50,9170:25,9173:30,9181:35,9182:40,
    9183:45,9184:50,9201:25,9210:30,9212:35,9220:40,9231:45,9232:50,9241:25,9300:30,
    9311:35,9312:40,9313:45,9314:50,9321:25,9322:30,9323:35,9330:40,9333:45,9334:50,
    9335:25,9341:30,9342:35,9343:40,9344:45,9345:50,9346:25,9360:30,9361:35,9362:40,
    9363:45,9364:50,9371:25,9372:30,9373:35,9374:40,9375:45,9376:50,9473:25,9500:30,
    9504:35,9520:40,9521:45,9523:50,9524:25,9530:30,9531:35,9535:40,9536:45,9541:50,
    9542:25,9543:30,9544:35,9545:40,9546:45,9551:50,9552:25,9555:30,9556:35,9560:40,
    9562:45,9563:50,9564:25,9565:30,9570:35,9571:40,9572:45,9580:50,9581:25,9582:30,
    9583:35,9584:40,9585:45,9586:50,9587:25,9601:30,9602:35,9611:40,9612:45,9613:50,
    9614:25,9615:30,9620:35,9622:40,9623:45,9624:50,9631:25,9632:30,9633:35,9634:40,
    9635:45,9640:50,9651:25,9652:30,9653:35,9654:40,9655:45,9701:50,9702:25,9710:30,
    9711:35,9712:40,9713:45,9714:50,9721:25,9722:30,9751:35,9752:40,9753:45,9754:50,
    9761:25,9762:30,9771:35,9772:40,9773:45,9781:50,9782:25,9800:30,9805:35,9811:40,
    9812:45,9813:50,9814:25,9815:30,9816:35,9821:40,9822:45,9831:50,9832:25,9833:30,
    9841:35,9842:40,9843:45,9844:50,9851:25,9852:30,9853:35,9854:40,9861:45,9862:50,
    9863:25,9871:30,9872:35,9873:40,9900:45,9903:50,9905:25,9906:30,9907:35,9908:40,
    9909:25,9911:30,9912:35,9913:40,9918:45,9919:50,9920:25,9931:30,9932:35,9941:40,
    9942:45,9943:50,9951:25,9952:30,9953:35,9954:40,9961:45,9962:50,9963:25,9971:30,
    9972:35,9974:40,9981:45,9990:50,9991:25,9992:30
  }
};

export default function HomeScreen() {
  const { rides, addRide, removeRide } = useContext(RidesContext);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [driver, setDriver] = useState('');
  const [tour, setTour] = useState('');
  const [plz, setPlz] = useState('');
  const [stops, setStops] = useState('');
  const [calculatedPrice, setCalculatedPrice] = useState(null);

  useEffect(() => {
    const stopsInt = parseInt(stops);
    const plzInt = parseInt(plz);
    let price = 0;

    if (!isNaN(stopsInt) && PRICE_TABLE.stops[stopsInt]) {
      price += PRICE_TABLE.stops[stopsInt];
    }

    if (!isNaN(plzInt) && PRICE_TABLE.plz[plzInt]) {
      price += PRICE_TABLE.plz[plzInt];
    }

    setCalculatedPrice(price > 0 ? price : null);
  }, [stops, plz]);

  const handleAddRide = () => {
    if (!driver || !plz || !stops) return;
    const newRide = {
      id: Date.now().toString(),
      date: date.toLocaleDateString('de-DE'),
      driver,
      tour,
      plz,
      stops: parseInt(stops),
      price: calculatedPrice,
    };
    addRide(newRide);
    setDriver('');
    setTour('');
    setPlz('');
    setStops('');
  };

  return (
    <ImageBackground source={glsLogo} resizeMode="contain" style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>📅 {date.toLocaleDateString('de-DE')}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <TextInput placeholder="Vozač" style={styles.input} value={driver} onChangeText={setDriver} />
        <TextInput placeholder="Tura" style={styles.input} value={tour} onChangeText={setTour} />
        <TextInput placeholder="PLZ" style={styles.input} value={plz} onChangeText={setPlz} keyboardType="numeric" />
        <TextInput placeholder="Broj stopova" style={styles.input} value={stops} onChangeText={setStops} keyboardType="numeric" />

        <Text style={styles.priceText}>Cijena: {calculatedPrice ? `${calculatedPrice} €` : '---'}</Text>

        <Button title="Dodaj vožnju" onPress={handleAddRide} />

        <FlatList
          data={rides.slice(-5).reverse()}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.rideItem}>
              <Text>{item.date} | {item.driver} | {item.stops} stopa | {item.price} €</Text>
              <Button title="Obriši" onPress={() => removeRide(item.id)} />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#ffffffaa',
    justifyContent: 'center',
  },
  container: {
    padding: 16,
    backgroundColor: '#ffffffcc',
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    padding: 8,
    borderRadius: 6,
  },
  priceText: {
    fontSize: 18,
    marginBottom: 8,
    color: '#003366',
  },
  rideItem: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#e0f0ff',
    borderRadius: 5,
  },
});
