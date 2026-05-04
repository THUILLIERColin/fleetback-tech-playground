# Fleetback

Application mobile de gestion de flotte de véhicules, développée avec React Native (bare workflow) et Expo.

## Stack technique

| Catégorie        | Technologie                 |
| ---------------- | --------------------------- |
| Framework mobile | React Native 0.81 + Expo 54 |
| Langage          | TypeScript strict           |
| State management | MobX 6 + mobx-react-lite    |
| Navigation       | React Navigation 7          |
| HTTP             | Axios                       |
| Tests E2E        | Maestro                     |

## Fonctionnalités

- Liste des véhicules avec filtrage par statut
- Fiche détail avec informations client
- Gestion des états de chargement et d'erreur avec retry
- Navigation par onglets

## Ce que ce projet démontre

- **MobX** — store observable, actions, computed, pattern smart/dumb pour éviter les re-renders inutiles sur FlatList
- **Performance FlatList** — `getItemLayout`, `React.memo`, `useCallback`, `windowSize`
- **TypeScript strict** — types de navigation, discriminated unions pour les états async, utilitaires
  `Omit`/`Partial`/`Pick`
- **Tests E2E Maestro** — flows YAML, assertions par `testID`, rapport JUnit

## Installation

```bash
bun install
bun run ios # ou bun run android
```

## Tests

```bash
bun run test:e2e
```
