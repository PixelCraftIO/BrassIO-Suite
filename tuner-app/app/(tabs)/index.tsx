import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { NewsList } from '@/components/news-list';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">BrassIO Tuner</ThemedText>
        <ThemedText style={styles.subtitle}>
          Dein präziser Tuner für Blechblasinstrumente
        </ThemedText>
      </View>

      <ThemedView style={styles.newsSection}>
        <ThemedText type="subtitle" style={styles.newsTitle}>
          Neuigkeiten
        </ThemedText>
        <NewsList />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
  newsSection: {
    flex: 1,
    marginTop: 20,
  },
  newsTitle: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
});
