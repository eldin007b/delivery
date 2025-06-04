import React, { createContext, useState } from 'react';

export const RidesContext = createContext({
  rides: [], // Eksplicitno postavite prazan niz
  addRide: () => console.warn('addRide nije implementiran'),
  removeRide: () => console.warn('removeRide nije implementiran'),
});

export const RidesProvider = ({ children }) => {
  const [rides, setRides] = useState([]);

  const addRide = (newRide) => {
    if (!newRide?.id) {
      console.error('Nevažeća vožnja:', newRide);
      return;
    }
    setRides(prev => [...prev, newRide]);
  };

  const removeRide = (id) => {
    setRides(prev => prev.filter(ride => ride.id !== id));
  };

  return (
    <RidesContext.Provider value={{ rides, addRide, removeRide }}>
      {children}
    </RidesContext.Provider>
  );
};