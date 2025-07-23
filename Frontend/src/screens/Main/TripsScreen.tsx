import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { INCHEON_BLUE, INCHEON_BLUE_LIGHT, INCHEON_GRAY } from '../../styles/fonts';
import PixelLockIcon from '../../components/ui/PixelLockIcon';
import { useNavigation } from '@react-navigation/native';
// 드롭다운 import 제거
// import RNPickerSelect from 'react-native-picker-select';

const { width } = Dimensions.get('window');

const TABS = [
  { key: 'progress', label: '진행중' },
  { key: 'completed', label: '진행완료' },
  { key: 'saved', label: '찜해놓은' },
];

const coursePhotos = [
  { local: require('../../assets/icons/대불호텔.jpg'), locked: false },
  { local: null, locked: true },
  { local: null, locked: true },
  { local: null, locked: true },
];

const TripsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('progress');

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          {/* 상단 탭 네비게이션 (세그먼트 컨트롤 스타일) */}
          <View style={styles.tabBarWrap}>
            {TABS.map((tab, idx) => {
              const isActive = activeTab === tab.key;
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.tabBtn,
                    isActive && styles.tabBtnActive,
                    idx === 0 && styles.tabBtnFirst,
                    idx === TABS.length - 1 && styles.tabBtnLast,
                  ]}
                  onPress={() => setActiveTab(tab.key)}
                  activeOpacity={0.8}
                >
                  <Text style={[
                    styles.tabBtnText,
                    isActive ? styles.tabBtnTextActive : styles.tabBtnTextInactive,
                    { fontFamily: 'NeoDunggeunmoPro-Regular' }
                  ]}>{tab.label}</Text>
                  {isActive && <View style={styles.tabUnderline} />}
                </TouchableOpacity>
              );
            })}
          </View>

          <ScrollView style={styles.content} contentContainerStyle={{paddingBottom: 32}} showsVerticalScrollIndicator={false}>
            {/* 제목 */}
            <Text style={[styles.progressTitle, { fontFamily: 'NeoDunggeunmoPro-Regular' }]}>현재 진행중인 코스</Text>

            {/* 지도 영역 (이미지로 대체) */}
            <View style={styles.mapBox}>
              <Image source={require('../../assets/icons/Map_mockup.png')} style={styles.mapImg} resizeMode="cover" />
            </View>


            {/* 대불 호텔 카드 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.pixelStepNum}>①</Text>
              <TouchableOpacity style={styles.hotelCard} activeOpacity={0.8}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.hotelCardText}>대불 호텔</Text>
                </View>
                <Text style={styles.hotelCardArrow}>{'>'}</Text>
              </TouchableOpacity>
            </View>
            
            {/* 인천대공원 코스 카드 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.pixelStepNumActive}>②</Text>
              <View style={styles.hotelCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.hotelCardText}>인천대공원</Text>
                </View>
                <TouchableOpacity
                  style={[styles.prevNextBtn, { marginLeft: 12, flex: undefined, paddingVertical: 8, paddingHorizontal: 16 }]}
                  onPress={() => (navigation as any).navigate('Map', { startLocation: '현위치', endLocation: '인천대공원' })}
                >
                  <Text style={styles.prevNextBtnText}>다음 목적지</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 잠금 카드들 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.pixelStepNum}>③</Text>
              <View style={styles.lockedCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.lockedCardText}>인천의 중심</Text>
                </View>
                <PixelLockIcon />
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.pixelStepNum}>④</Text>
              <View style={styles.lockedCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.lockedCardText}>인천의 역사적인 공간</Text>
                </View>
                <PixelLockIcon />
              </View>
            </View>

            {/* 사진 섹션 */}
            <Text style={[styles.photoSectionTitle, { fontFamily: 'NeoDunggeunmoPro-Regular' }]}>지금까지 진행한 코스 사진</Text>
            <View style={styles.photoGrid}>
              {coursePhotos.map((photo, idx) => (
                <View key={idx} style={styles.photoSlot}>
                  {photo.locked ? (
                    <PixelLockIcon />
                  ) : (
                    <Image source={photo.local} style={styles.photo} resizeMode="cover" />
                  )}
                </View>
              ))}
            </View>

            {/* 하단 버튼 */}
            <View style={styles.bottomRow}>
              <TouchableOpacity style={styles.quitBtn} activeOpacity={0.8}>
                <Text style={styles.quitBtnText}>코스 그만두기</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 8,
  },
  tabBarWrap: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
    margin: 3,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'transparent',
    borderRadius: 12,
    marginHorizontal: 2,
    position: 'relative',
  },
  tabBtnActive: {},
  tabBtnFirst: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  tabBtnLast: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  tabBtnText: {
    marginBottom: 3,
    fontSize: 16,
    textAlign: 'center',
  },
  tabBtnTextActive: {
    color: INCHEON_BLUE,
  },
  tabBtnTextInactive: {
    color: INCHEON_GRAY,
  },
  tabUnderline: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 4,
    height: 4,
    backgroundColor: INCHEON_BLUE,
    borderRadius: 2,
  },
  progressTitle: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 30,
    color: INCHEON_BLUE,
    textAlign: 'center',
    marginVertical: 16,
  },
  mapBox: {
    borderWidth: 2,
    borderColor: '#222',
    backgroundColor: '#fff',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    overflow: 'hidden',
  },
  mapImg: {
    width: width - 40,
    height: 180,
    borderRadius: 0,
  },
  hotelCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#222',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 10,
    borderRadius: 10,
  },
  hotelCardText: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 16,
    color: INCHEON_GRAY,
  },
  hotelCardArrow: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 18,
    color: INCHEON_GRAY,
  },
  prevNextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 8,
  },
  prevNextBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: INCHEON_BLUE,
    backgroundColor: '#fff',
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 8,
    borderRadius: 10,
  },
  prevNextBtnText: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 15,
    color: INCHEON_GRAY,
  },
  lockedCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#222',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 10,
    borderRadius: 10,
  },
  lockedCardText: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 16,
    color: INCHEON_GRAY,
  },
  lockIconPixel: {
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  photoSectionTitle: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 28,
    color: INCHEON_BLUE,
    textAlign: 'center',
    marginVertical: 16,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 8,
  },
  photoSlot: {
    width: (width - 48) / 2,
    height: 90,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: INCHEON_GRAY,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    position: 'relative',
  },
  quitBtn: {
    flex: 1,
    backgroundColor: INCHEON_BLUE_LIGHT,
    borderWidth: 2,
    borderColor: '#222',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  quitBtnText: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 16,
    color: INCHEON_GRAY,
  },
  pixelLockIcon: {
    width: 28,
    height: 28,
    marginLeft: 4,
    marginRight: 4,
  },
  pixelStepNum: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 38,
    color: INCHEON_BLUE,
    marginRight: 5,
    minWidth: 36,
    textAlign: 'center',
  },
  pixelStepNumActive: {
    fontFamily: 'NeoDunggeunmoPro-Regular',
    fontSize: 37,
    color: '#fff',
    backgroundColor: INCHEON_BLUE,
    borderRadius: 999,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
    marginRight: 5,
    minWidth: 40,
  },
});

export default TripsScreen; 