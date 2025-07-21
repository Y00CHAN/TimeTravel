import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground,
  Dimensions,
  Alert,
  Image,
  Text
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PixelText as PixelTextComponent } from '../../components/PixelText';

const { width } = Dimensions.get('window');

interface Trip {
  id: number;
  title: string;
  status: 'current' | 'completed' | 'planned';
  locations: Array<{
    id: number;
    name: string;
    lat: number;
    lng: number;
    visited: boolean;
    locked?: boolean;
  }>;
  progress: number;
}

export default function TripsScreen() {
  const [activeTab, setActiveTab] = useState<'진행중' | '진행완료' | '찜해놓은'>('진행중');
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  const [currentTripIndex, setCurrentTripIndex] = useState(0);

  // 임시 여행 데이터 (인천 여행)
  const trips: Trip[] = [
    {
      id: 1,
      title: '인천 탐방',
      status: 'current',
      progress: 60,
      locations: [
        { id: 1, name: '대불 호텔', lat: 37.5796, lng: 126.9770, visited: true },
        { id: 2, name: '인천 대공원', lat: 37.5794, lng: 126.9910, visited: true },
        { id: 3, name: '인천의 중심', lat: 37.5789, lng: 126.9949, visited: false, locked: true },
        { id: 4, name: '인천의 역사적인 공간', lat: 37.5658, lng: 126.9751, visited: false, locked: true },
      ]
    },
    {
      id: 2,
      title: '부산 해안 여행',
      status: 'planned',
      progress: 0,
      locations: [
        { id: 5, name: '해운대', lat: 35.1586, lng: 129.1603, visited: false },
        { id: 6, name: '광안대교', lat: 35.1534, lng: 129.1267, visited: false },
      ]
    },
    {
      id: 3,
      title: '제주도 일주',
      status: 'completed',
      progress: 100,
      locations: [
        { id: 7, name: '성산일출봉', lat: 33.4581, lng: 126.9425, visited: true },
        { id: 8, name: '만장굴', lat: 33.5283, lng: 126.7650, visited: true },
        { id: 9, name: '천지연폭포', lat: 33.2468, lng: 126.5580, visited: true },
      ]
    }
  ];

  const currentTrip = trips[currentTripIndex];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePreviousLocation = () => {
    if (currentTripIndex > 0) {
      setCurrentTripIndex(currentTripIndex - 1);
    }
  };

  const handleNextLocation = () => {
    if (currentTripIndex < trips.length - 1) {
      setCurrentTripIndex(currentTripIndex + 1);
    }
  };

  const handleRecordProgress = () => {
    Alert.alert('🎮 진행 기록', '여행 진행 상황을 기록하시겠습니까?');
  };

  const handleDetailView = () => {
    Alert.alert('🗺️ 상세 보기', '지도에서 상세한 경로를 확인합니다.');
  };

  const handleChatBot = () => {
    Alert.alert('🤖 여행 가이드', 'AI 여행 가이드와 대화를 시작합니다.');
  };

  const handleQuitCourse = () => {
    Alert.alert('❌ 코스 그만두기', '정말로 현재 코스를 그만두시겠습니까?');
  };

  const filteredTrips = trips.filter(trip => {
    if (activeTab === '진행중') return trip.status === 'current';
    if (activeTab === '진행완료') return trip.status === 'completed';
    if (activeTab === '찜해놓은') return trip.status === 'planned';
    return false;
  });

  return (
    <View style={styles.container}>
      {/* 폰트 테스트 섹션 */}
      <View style={{padding: 16, backgroundColor: '#fff', borderBottomWidth: 2, borderColor: '#000'}}>
        <Text style={{fontFamily: 'Neo둥근모 Pro', fontSize: 20, color: 'red'}}>일반 Text - Neo둥근모 Pro</Text>
        <PixelTextComponent style={{fontSize: 20, color: 'blue'}}>PixelText 컴포넌트</PixelTextComponent>
        <Text style={{fontSize: 20, color: 'green'}}>일반 Text - 시스템 폰트</Text>
      </View>
      
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <View style={styles.tabContainer}>
          {(['진행중', '진행완료', '찜해놓은'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content Area */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Current Progress Route Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>현재 진행중인 코스</Text>
        </View>

        {/* Map Section */}
        <View style={styles.mapCard}>
          <ImageBackground
            source={{ uri: 'https://readdy.ai/api/search-image?query=8-bit%20pixel%20art%20style%20retro%20video%20game%20map%20with%20terrain%20features%2C%20mountains%2C%20forests%2C%20roads%2C%20pixelated%20landscape%2C%20top-down%20view%2C%20classic%20arcade%20game%20aesthetic%2C%20colorful%20pixel%20graphics%2C%20game%20world%20map%2C%20isolated%20on%20light%20background%2C%20centered%20composition&width=400&height=256&seq=map001&orientation=landscape' }}
            style={styles.mapBackground}
            resizeMode="cover"
          >
            {/* Pixelated Location Markers */}
            {currentTrip?.locations.map((location, index) => (
              <View
                key={location.id}
                style={[
                  styles.marker,
                  {
                    top: 20 + (index * 40),
                    left: 30 + (index * 60),
                  }
                ]}
              >
                <View style={styles.markerInner}>
                  <Text style={styles.markerText}>📍</Text>
                </View>
              </View>
            ))}
            
            {/* Route Path */}
            <View style={styles.routePath}>
              {currentTrip?.locations.slice(0, -1).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.pathSegment,
                    {
                      top: 32 + (index * 40),
                      left: 42 + (index * 60),
                      width: 60,
                      height: 4,
                    }
                  ]}
                />
              ))}
            </View>
          </ImageBackground>
        </View>

        {/* Location Navigation Buttons */}
        <View style={styles.locationButtons}>
          <TouchableOpacity 
            style={styles.locationButton}
            onPress={handlePreviousLocation}
          >
            <Text style={styles.locationButtonText}>대불 호텔</Text>
            <Text style={styles.locationButtonArrow}>▶️</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.locationButton}
          >
            <Text style={styles.locationButtonText}>인천 대공원</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.locationButton}
            onPress={handleNextLocation}
          >
            <Text style={styles.locationButtonText}>다음 목적지</Text>
          </TouchableOpacity>
        </View>

        {/* Locked Locations */}
        <View style={styles.lockedLocations}>
          <View style={styles.lockedLocation}>
            <Text style={styles.lockedLocationText}>인천의 중심</Text>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
          <View style={styles.lockedLocation}>
            <Text style={styles.lockedLocationText}>인천의 역사적인 공간</Text>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        </View>

        {/* Course Photos Section */}
        <View style={styles.photosSection}>
          <Text style={styles.photosTitle}>지금까지 진행한 코스 사진</Text>
          <View style={styles.photoGrid}>
            <View style={styles.photoSlot}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/80x80/4A90E2/FFFFFF?text=사진' }}
                style={styles.photo}
              />
            </View>
            <View style={styles.photoSlot}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
            <View style={styles.photoSlot}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
            <View style={styles.photoSlot}>
              <Text style={styles.lockIcon}>🔒</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.quitButton}
            onPress={handleQuitCourse}
          >
            <Text style={styles.quitButtonText}>코스 그만두기</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.chatBotButton}
            onPress={handleChatBot}
          >
            <Text style={styles.chatBotButtonText}>ChatBot</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  topNav: {
    backgroundColor: '#fff',
    borderBottomWidth: 4,
    borderBottomColor: '#000',
    paddingTop: 50, // Safe area
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: '#000',
    marginHorizontal: 2,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#ef4444',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 100, // Bottom nav space
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    color: '#22c55e',
    letterSpacing: 1,
    borderWidth: 2,
    borderColor: '#22c55e',
    backgroundColor: '#fff',
    padding: 8,
    textAlign: 'center',
  },
  mapCard: {
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#000',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  mapBackground: {
    height: 256,
    width: '100%',
  },
  marker: {
    position: 'absolute',
    width: 24,
    height: 24,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerInner: {
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {
    fontSize: 8,
  },
  routePath: {
    position: 'absolute',
  },
  pathSegment: {
    position: 'absolute',
    backgroundColor: '#ef4444',
    borderWidth: 1,
    borderColor: '#000',
  },
  locationButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  locationButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  locationButtonText: {
    fontSize: 14,
    color: '#000',
  },
  locationButtonArrow: {
    fontSize: 10,
  },
  lockedLocations: {
    gap: 8,
    marginBottom: 16,
  },
  lockedLocation: {
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#000',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lockedLocationText: {
    fontSize: 14,
    color: '#666',
  },
  lockIcon: {
    fontSize: 16,
  },
  photosSection: {
    marginBottom: 16,
  },
  photosTitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 12,
  },
  photoGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  photoSlot: {
    flex: 1,
    height: 80,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  quitButton: {
    flex: 1,
    backgroundColor: '#ec4899',
    borderWidth: 4,
    borderColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
  },
  quitButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  chatBotButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    borderWidth: 4,
    borderColor: '#000',
    paddingVertical: 16,
    alignItems: 'center',
  },
  chatBotButtonText: {
    fontSize: 16,
    color: '#fff',
  },
}); 