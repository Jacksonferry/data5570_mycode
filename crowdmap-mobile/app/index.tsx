import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useSelector } from 'react-redux';

import LocationCard from '../components/LocationCard';
import type { RootState } from '../store/store';

export default function Home() {
  const [search, setSearch] = useState('');

  const locations = useSelector(
    (state: RootState) => state.crowd.locations
  );

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Find a Location</Text>
      <Text style={styles.description}>
        Explore sample crowd levels: 1 is quiet and 5 is very busy.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Search locations..."
        accessibilityLabel="Search locations"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
      />

      {filteredLocations.map((location) => (
        <LocationCard key={location.id} location={location} />
      ))}

      {filteredLocations.length === 0 && (
        <Text>No locations match your search.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
});
