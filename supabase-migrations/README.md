# Supabase Migrations

Diese Migrations-Dateien enthalten SQL-Skripte für die BrassIO-Suite Datenbank.

## Setup

### 1. SQL im Supabase Dashboard ausführen

1. Gehe zu deinem Supabase-Projekt: https://supabase.com/dashboard
2. Navigiere zu **SQL Editor**
3. Öffne die Datei `001_create_news_table.sql`
4. Kopiere den gesamten Inhalt
5. Füge ihn im SQL Editor ein
6. Klicke auf **Run** (oder drücke Cmd/Ctrl + Enter)

### 2. Überprüfung

Nach dem Ausführen solltest du:

1. Eine neue Tabelle `news` in deiner Datenbank haben
2. 3 Beispiel-News-Einträge sehen
3. Row Level Security (RLS) aktiviert haben

### 3. Testen

Um zu überprüfen, ob alles funktioniert:

```sql
-- Zeige alle News an
SELECT * FROM news;

-- Sollte 3 Einträge zurückgeben
```

## Migrationen

### 001_create_news_table.sql

Erstellt die `news` Tabelle mit folgenden Feldern:

- `id` (uuid) - Primärschlüssel
- `title` (text) - Titel der News
- `description` (text) - Kurzbeschreibung
- `slug` (text) - Eindeutiger URL-Slug
- `content` (text) - Vollständiger Inhalt (optional)
- `published` (boolean) - Veröffentlichungsstatus
- `created_at` (timestamp) - Erstellungsdatum
- `updated_at` (timestamp) - Aktualisierungsdatum

**Row Level Security Policies:**

- Jeder kann veröffentlichte News lesen (kein Login erforderlich)
- Nur authentifizierte Benutzer können News erstellen, bearbeiten und löschen

## Beispieldaten

Die Migration fügt automatisch 3 Beispiel-News hinzu:

1. Willkommen bei BrassIO-Suite!
2. Neues Feature: Interval Trainer kommt bald!
3. Update: Metronom App v1.1

## Neue News hinzufügen

Du kannst neue News über den Supabase Table Editor oder mit SQL hinzufügen:

```sql
INSERT INTO news (title, description, slug, content, published)
VALUES (
  'Deine News Überschrift',
  'Kurze Beschreibung',
  'deine-news-ueberschrift',
  'Vollständiger Inhalt hier...',
  true
);
```

**Wichtig:** Der `slug` muss eindeutig sein!
