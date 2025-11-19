import { StyleSheet, View, Switch, Pressable, ScrollView } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { Colors } from '@/constants/theme'
import { Link } from 'expo-router'

export default function SettingsScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title">Einstellungen</ThemedText>
        </View>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Darstellung
          </ThemedText>
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <ThemedText style={styles.settingLabel}>Dark Mode</ThemedText>
              <ThemedText style={styles.settingDescription}>
                {isDark ? 'Dunkles Design aktiv' : 'Helles Design aktiv'}
              </ThemedText>
            </View>
            <Switch
              value={isDark}
              onValueChange={() => {
                // Dark mode toggling will be implemented with proper state management
                // For now, this is controlled by system settings
              }}
              trackColor={{
                false: Colors.light.tabIconDefault,
                true: Colors.dark.tint
              }}
              thumbColor={isDark ? Colors.dark.background : Colors.light.background}
            />
          </View>
          <ThemedText style={styles.note}>
            Hinweis: Das Dark Mode-Design passt sich derzeit an deine Systemeinstellungen an.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Rechtliches
          </ThemedText>

          <Link href="/legal/impressum" asChild>
            <Pressable style={styles.linkItem}>
              <ThemedText style={styles.linkText}>Impressum</ThemedText>
            </Pressable>
          </Link>

          <Link href="/legal/datenschutz" asChild>
            <Pressable style={styles.linkItem}>
              <ThemedText style={styles.linkText}>Datenschutzerklärung</ThemedText>
            </Pressable>
          </Link>

          <Link href="/legal/disclaimer" asChild>
            <Pressable style={styles.linkItem}>
              <ThemedText style={styles.linkText}>Haftungsausschluss</ThemedText>
            </Pressable>
          </Link>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  section: {
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    borderRadius: 12,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    opacity: 0.7,
  },
  note: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 12,
    paddingHorizontal: 16,
  },
  linkItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    borderRadius: 12,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 16,
  },
})
