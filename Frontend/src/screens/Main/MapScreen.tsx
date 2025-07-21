import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { generateMapHtml, addressToCoordinates, searchRoute } from '../../services/mapService';
import { validateApiKeys } from '../../config/apiKeys';
import { PixelText as Text } from '../../components/PixelText';

interface Location {
  id: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  order: number;
}

interface Trip {
  id: number;
  title: string;
  locations: Location[];
  isActive: boolean;
}

export default function MapScreen() {
  const [showMap, setShowMap] = useState(false);
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [mapHtml, setMapHtml] = useState('');
  const [apiKeysValid, setApiKeysValid] = useState(false);

  // API 키 유효성 검사
  useEffect(() => {
    const checkApiKeys = () => {
      const isValid = validateApiKeys();
      setApiKeysValid(isValid);
      if (!isValid) {
        console.warn('카카오맵 API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
      }
    };
    checkApiKeys();
  }, []);

  // 임시 데이터 - 실제로는 API에서 가져올 예정
  useEffect(() => {
    // 임시 여행 데이터
    const mockTrip: Trip = {
      id: 1,
      title: '서울 여행',
      isActive: true,
      locations: [
        {
          id: 1,
          name: '경복궁',
          address: '서울특별시 종로구 사직로 161',
          lat: 37.5796,
          lng: 126.9770,
          order: 1
        },
        {
          id: 2,
          name: '창덕궁',
          address: '서울특별시 종로구 율곡로 99',
          lat: 37.5794,
          lng: 126.9910,
          order: 2
        },
        {
          id: 3,
          name: '남산타워',
          address: '서울특별시 용산구 남산공원길 105',
          lat: 37.5512,
          lng: 126.9882,
          order: 3
        }
      ]
    };
    setCurrentTrip(mockTrip);
  }, []);

  // 카카오맵 HTML 생성
  useEffect(() => {
    if (apiKeysValid && currentTrip) {
      const locations = currentTrip.locations || [];
      console.log('지도 HTML 생성 중...', { locationsCount: locations.length });
      const html = generateMapHtml(locations);
      setMapHtml(html);
      console.log('지도 HTML 생성 완료');
    }
  }, [currentTrip, apiKeysValid]);

  const handleShowMap = () => {
    if (!apiKeysValid) {
      Alert.alert(
        'API 키 오류',
        '카카오맵 API 키가 설정되지 않았습니다.\n\n.env 파일에서 다음 키들을 설정해주세요:\n- KAKAO_MAP_API_KEY\n- KAKAO_REST_API_KEY',
        [
          { text: '확인', style: 'default' }
        ]
      );
      return;
    }
    
    console.log('지도 보기 버튼 클릭됨');
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  const handleRouteSearch = async () => {
    if (!startLocation.trim() || !endLocation.trim()) {
      Alert.alert('알림', '출발지와 도착지를 모두 입력해주세요.');
      return;
    }

    try {
      // 출발지와 도착지 좌표 변환
      const startCoords = await addressToCoordinates(startLocation);
      const endCoords = await addressToCoordinates(endLocation);

      // 길찾기 실행
      const routeData = await searchRoute(startCoords, endCoords);
      
      // 경로가 포함된 지도 HTML 생성
      const locations = currentTrip?.locations || [];
      const html = generateMapHtml(locations, true, routeData);
      setMapHtml(html);
      
      setShowRouteModal(false);
      setShowMap(true);
      
      Alert.alert('성공', '길찾기가 완료되었습니다!');
    } catch (error) {
      console.error('길찾기 오류:', error);
      Alert.alert('오류', '길찾기를 실패했습니다. 주소를 다시 확인해주세요.');
    }
  };

  const handleCurrentLocation = () => {
    // 현재 위치로 이동하는 기능
    Alert.alert('알림', '현재 위치로 이동합니다.');
  };

  return (
    <View style={styles.container}>
      {!showMap ? (
        <View style={styles.initialView}>
          <Ionicons name="location-outline" size={48} color="#bbb" />
          <Text style={styles.text}>지도</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.mapButton} onPress={handleShowMap}>
              <Ionicons name="map-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>지도 보기</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.routeButton} onPress={() => setShowRouteModal(true)}>
              <Ionicons name="navigate-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>길찾기</Text>
            </TouchableOpacity>
          </View>

          {currentTrip && currentTrip.isActive && (
            <View style={styles.tripInfo}>
              <Text style={styles.tripTitle}>진행중인 여행: {currentTrip.title}</Text>
              <Text style={styles.tripSubtitle}>
                {currentTrip.locations.length}개의 장소가 등록되어 있습니다
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.mapContainer}>
          <WebView
            source={{ html: mapHtml }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onMessage={(event) => {
              console.log('WebView 메시지:', event.nativeEvent.data);
            }}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error('WebView 오류:', nativeEvent);
            }}
            onLoadEnd={() => {
              console.log('WebView 로드 완료');
            }}
          />
          
          <View style={styles.mapControls}>
            <TouchableOpacity style={styles.controlButton} onPress={handleCurrentLocation}>
              <Ionicons name="locate" size={24} color="#333" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={() => setShowRouteModal(true)}>
              <Ionicons name="navigate" size={24} color="#333" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.controlButton} onPress={handleCloseMap}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 길찾기 모달 */}
      <Modal
        visible={showRouteModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>길찾기</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>출발지</Text>
              <TextInput
                style={styles.input}
                value={startLocation}
                onChangeText={setStartLocation}
                placeholder="출발지를 입력하세요"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>도착지</Text>
              <TextInput
                style={styles.input}
                value={endLocation}
                onChangeText={setEndLocation}
                placeholder="도착지를 입력하세요"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setShowRouteModal(false)}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.searchButton]} 
                onPress={handleRouteSearch}
              >
                <Text style={styles.searchButtonText}>길찾기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  initialView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 24,
    color: '#bbb',
    marginTop: 8,
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 30,
  },
  mapButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  routeButton: {
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tripInfo: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  tripSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  mapContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  mapControls: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    gap: 10,
  },
  controlButton: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 