// src/screens/ProfileScreen.tsx
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.role}>Technicien · Fleetback</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  name: { fontSize: 20, fontWeight: '600', marginBottom: 4 },
  role: { fontSize: 14, color: '#666' },
});