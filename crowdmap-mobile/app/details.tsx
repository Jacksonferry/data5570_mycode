import { useLocalSearchParams } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { updateCrowdLevel } from '../store/store';
import type { AppDispatch, RootState } from '../store/store';

export default function Details() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const location = useSelector((state: RootState) =>
    state.crowd.locations.find((item) => item.id === id)
  );

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Location not found. Go back and select a location.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{location.name}</Text>
      <Text style={styles.category}>{location.category}</Text>

      <Text style={styles.level}>
        Crowd level: {location.crowdLevel}/5
      </Text>

      <Text style={styles.description}>
        1 = Quiet | 3 = Moderate | 5 = Very busy
      </Text>

      <View style={styles.button}>
        <Button
          title="Increase Crowd Level"
          disabled={location.crowdLevel >= 5}
          onPress={() =>
            dispatch(
              updateCrowdLevel({
                id: location.id,
                crowdLevel: location.crowdLevel + 1,
              })
            )
          }
        />
      </View>

      <View style={styles.button}>
        <Button
          title="Decrease Crowd Level"
          disabled={location.crowdLevel <= 1}
          onPress={() =>
            dispatch(
              updateCrowdLevel({
                id: location.id,
                crowdLevel: location.crowdLevel - 1,
              })
            )
          }
        />
      </View>

      <Text style={styles.note}>
        These are sample ratings. Changes stay in memory while the app
        is running and reset when it reloads.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 18,
    color: '#555',
  },
  level: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    marginBottom: 16,
  },
  note: {
    marginTop: 20,
    color: '#555',
    fontSize: 14,
  },
});