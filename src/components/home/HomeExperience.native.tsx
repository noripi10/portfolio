import { ScrollView, StyleSheet, View } from 'react-native';

import { AnimatedText } from '@/components/AnimatedText';
import { MainVisual } from '@/components/MainVisual';
import { NativeText } from '@/components/Text';
import Develop from '@/constants/development/development.json';

import { CAPS } from './capabilities';

export const HomeExperience = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginHorizontal: 'auto' }}>
        <AnimatedText>I&apos;m Hironori Sugiyama</AnimatedText>
      </View>

      <MainVisual />

      <View style={styles.section}>
        <NativeText style={styles.eyebrow}>ABOUT</NativeText>
        <NativeText style={styles.heading}>Engineer with two hands</NativeText>
        <NativeText style={styles.body}>
          岐阜で社内SEとして働きながら、趣味でアプリ開発をしています。 .NET での業務アプリ開発、React / React
          Native(Expo)
          でのプロダクト開発WebGL・フロントエンドでの表現探求。堅さと遊びの両方を行き来できることが強みです。
        </NativeText>
      </View>

      <View style={styles.section}>
        <NativeText style={styles.eyebrow}>SELECTED WORKS</NativeText>
        <NativeText style={styles.heading}>Works</NativeText>
        <View style={{ rowGap: 12, marginTop: 16 }}>
          {Develop.map((item) => (
            <View key={item.name} style={styles.workRow}>
              <NativeText style={styles.workTitle}>{item.name}</NativeText>
              <NativeText style={styles.workTag}>{item.technology.slice(0, 3).join(' / ').toUpperCase()}</NativeText>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <NativeText style={styles.eyebrow}>CAPABILITIES</NativeText>
        <NativeText style={styles.heading}>What I do</NativeText>
        <View style={{ rowGap: 20, marginTop: 16 }}>
          {CAPS.map((cap) => (
            <View key={cap.key}>
              <NativeText style={styles.capKey}>{cap.key}</NativeText>
              <NativeText style={styles.body}>{cap.value}</NativeText>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  section: {
    padding: 24,
    rowGap: 8,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 4,
    opacity: 0.6,
    marginBottom: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  body: {
    fontSize: 14,
    lineHeight: 24,
    opacity: 0.8,
  },
  workRow: {
    rowGap: 4,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(238,241,247,0.16)',
  },
  workTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  workTag: {
    fontSize: 10,
    letterSpacing: 2,
    opacity: 0.6,
  },
  capKey: {
    fontSize: 10,
    letterSpacing: 3,
    color: '#ffd27a',
    marginBottom: 6,
  },
});
