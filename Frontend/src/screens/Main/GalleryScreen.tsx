import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { INCHEON_BLUE, INCHEON_BLUE_LIGHT, INCHEON_GRAY } from '../../styles/fonts';

const { width } = Dimensions.get('window');

const MISSION_DATA = [
  { id: 1, title: '과거 찾기 미션 1', image: 'https://cdn.ggilbo.com/news/photo/202210/953273_905995_3932.jpg', completed: true },
  { id: 2, title: '과거 찾기 미션 2', image: 'https://cdn.ggilbo.com/news/photo/202210/953273_905995_3932.jpg', completed: true },
  { id: 3, title: '과거 찾기 미션 3', image: '', completed: false },
  { id: 4, title: '과거 찾기 미션 4', image: '', completed: false },
  { id: 5, title: '과거 찾기 미션 5', image: '', completed: false },
  { id: 6, title: '과거 찾기 미션 6', image: '', completed: false },
];

const TOTAL_COURSE = 52;
const FOUND_COUNT = 8;

export default function GalleryScreen() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>현재까지 진행하신 미션 사진</Text>
        <View style={styles.underline} />
        <Text style={styles.subtitle}>전체 코스 {TOTAL_COURSE}개 중 {FOUND_COUNT}개의 과거를 찾았어요</Text>
        <View style={styles.gridWrap}>
          {MISSION_DATA.map((item) => (
            <View key={item.id} style={styles.card}>
              {item.completed && item.image ? (
                <Image source={{ uri: item.image }} style={styles.photo} resizeMode="cover" />
              ) : (
                <View style={styles.lockedBox}>
                  <Ionicons name="image-outline" size={32} color="#bbb" />
                </View>
              )}
              <View style={styles.cardFooter}>
                <Text style={styles.missionTitle} numberOfLines={1}>{item.title}</Text>
                <View style={[styles.statusBadge, item.completed ? styles.badgeCompleted : styles.badgeLocked]}>
                  <Text style={[styles.badgeText, item.completed ? styles.badgeTextCompleted : styles.badgeTextLocked]}>
                    {item.completed ? '완료' : '잠금'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const CARD_SIZE = (width - 32 - 16) / 2; // 좌우 패딩+gap 고려

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 18,
    color: INCHEON_GRAY,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 4,
  },
  underline: {
    height: 2,
    backgroundColor: INCHEON_BLUE,
    width: 120,
    alignSelf: 'center',
    marginBottom: 12,
    borderRadius: 2,
  },
  subtitle: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 14,
    color: INCHEON_GRAY,
    textAlign: 'center',
    marginBottom: 18,
  },
  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE + 38,
    backgroundColor: '#fafafa',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: INCHEON_GRAY,
    marginBottom: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  photo: {
    width: '100%',
    height: CARD_SIZE,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  lockedBox: {
    width: '100%',
    height: CARD_SIZE,
    backgroundColor: INCHEON_BLUE_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardFooter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: INCHEON_GRAY,
    backgroundColor: '#fff',
  },
  missionTitle: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 13,
    color: INCHEON_GRAY,
    flex: 1,
    marginRight: 6,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCompleted: {
    backgroundColor: INCHEON_BLUE,
  },
  badgeLocked: {
    backgroundColor: INCHEON_GRAY,
  },
  badgeText: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  badgeTextCompleted: {
    color: '#fff',
  },
  badgeTextLocked: {
    color: '#fff',
  },
}); 