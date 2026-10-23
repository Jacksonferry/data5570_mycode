import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import type { Location } from '../store/store';

type Props = {
  location: Location;
};

export default function LocationCard({ location }: Props) {
  return (
    <Link
      href={{
        pathname: '/details',
        params: { id: location.id },
      }}
      asChild
    >
      <Pressable style={styles.card}>
        <Text style={styles.name}>{location.name}</Text>
        <Text>{location.category}</Text>
        <Text style={styles.crowd}>
          Crowd level: {location.crowdLevel}/5
        </Text>
        <Text style={styles.link}>View location →</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f4f8',
    padding: 20,
    marginBottom: 12,
    borderRadius: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  crowd: {
    marginTop: 10,
    fontSize: 16,
  },
  link: {
    marginTop: 12,
    color: '#2563eb',
  },
});