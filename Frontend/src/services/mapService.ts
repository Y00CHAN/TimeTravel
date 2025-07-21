import axios from 'axios';
import { API_KEYS } from '../config/apiKeys';

// 카카오맵 API 키
const KAKAO_MAP_API_KEY = API_KEYS.KAKAO_MAP_API_KEY;
const KAKAO_REST_API_KEY = API_KEYS.KAKAO_REST_API_KEY;

// 카카오맵 API 기본 URL
const KAKAO_API_BASE = 'https://dapi.kakao.com';

// axios 인스턴스 생성
const kakaoApiClient = axios.create({
  baseURL: KAKAO_API_BASE,
  timeout: 10000,
  headers: {
    'Authorization': `KakaoAK ${KAKAO_REST_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// 주소 검색
export const searchAddress = async (query: string) => {
  try {
    const response = await kakaoApiClient.get('/v2/local/search/address.json', {
      params: {
        query,
        size: 10,
      },
    });
    return response.data.documents;
  } catch (error) {
    console.error('주소 검색 오류:', error);
    throw error;
  }
};

// 장소 검색
export const searchPlace = async (query: string) => {
  try {
    const response = await kakaoApiClient.get('/v2/local/search/keyword.json', {
      params: {
        query,
        size: 10,
      },
    });
    return response.data.documents;
  } catch (error) {
    console.error('장소 검색 오류:', error);
    throw error;
  }
};

// 길찾기 (경로 검색)
export const searchRoute = async (
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  waypoints?: Array<{ lat: number; lng: number }>
) => {
  try {
    const waypointsParam = waypoints?.map(point => `${point.lng},${point.lat}`).join('|') || '';
    
    const response = await kakaoApiClient.get('/v1/directions', {
      params: {
        origin: `${origin.lng},${origin.lat}`,
        destination: `${destination.lng},${destination.lat}`,
        waypoints: waypointsParam,
      },
    });
    return response.data;
  } catch (error) {
    console.error('길찾기 오류:', error);
    throw error;
  }
};

// 좌표 변환 (주소 -> 좌표)
export const addressToCoordinates = async (address: string) => {
  try {
    const response = await kakaoApiClient.get('/v2/local/search/address.json', {
      params: {
        query: address,
        size: 1,
      },
    });
    
    if (response.data.documents.length > 0) {
      const doc = response.data.documents[0];
      return {
        lat: parseFloat(doc.y),
        lng: parseFloat(doc.x),
        address: doc.address_name,
      };
    }
    throw new Error('주소를 찾을 수 없습니다.');
  } catch (error) {
    console.error('좌표 변환 오류:', error);
    throw error;
  }
};

// 좌표 변환 (좌표 -> 주소)
export const coordinatesToAddress = async (lat: number, lng: number) => {
  try {
    const response = await kakaoApiClient.get('/v2/local/geo/coord2address.json', {
      params: {
        x: lng,
        y: lat,
      },
    });
    
    if (response.data.documents.length > 0) {
      const doc = response.data.documents[0];
      return {
        address: doc.address.address_name,
        roadAddress: doc.road_address?.address_name,
        region: doc.address.region_1depth_name,
      };
    }
    throw new Error('주소를 찾을 수 없습니다.');
  } catch (error) {
    console.error('주소 변환 오류:', error);
    throw error;
  }
};

// 카카오맵 HTML 생성 함수
export const generateMapHtml = (
  locations: Array<{ id: number; name: string; lat: number; lng: number; order: number }>,
  showRoute: boolean = false,
  routeData?: any
) => {
  // API 키 유효성 검사
  if (!KAKAO_MAP_API_KEY || KAKAO_MAP_API_KEY === 'your_kakao_map_api_key_here') {
    console.error('카카오맵 API 키가 설정되지 않았습니다.');
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <title>카카오맵</title>
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f5f5f5; }
          .error-container { text-align: center; padding: 20px; }
          .error-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px; }
          .error-message { font-size: 14px; color: #666; }
        </style>
      </head>
      <body>
        <div class="error-container">
          <div class="error-title">API 키 오류</div>
          <div class="error-message">카카오맵 API 키가 설정되지 않았습니다.<br>.env 파일을 확인해주세요.</div>
        </div>
      </body>
      </html>
    `;
  }

  const routeScript = showRoute && routeData ? `
    // 경로 그리기
    var polyline = new kakao.maps.Polyline({
      path: ${JSON.stringify(routeData.path)},
      strokeWeight: 5,
      strokeColor: '#FF0000',
      strokeOpacity: 0.7,
      strokeStyle: 'solid'
    });
    polyline.setMap(map);
  ` : '';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <title>카카오맵</title>
      <style>
        body { margin: 0; padding: 0; }
        #map { width: 100%; height: 100vh; }
        .custom-overlay {
          position: absolute;
          bottom: 85px;
          border-radius: 6px;
          float: left;
        }
        .custom-overlay:nth-of-type(n) {
          border: 0;
          box-shadow: 0px 1px 2px #888;
        }
        .custom-overlay a {
          display: block;
          text-decoration: none;
          color: #000;
          text-align: center;
          border-radius: 6px;
          font-size: 14px;
          font-weight: bold;
          overflow: hidden;
          background: #92d050;
          background: #92d050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
        }
        .custom-overlay .title {
          display: block;
          text-align: center;
          background: #fff;
          margin-right: 35px;
          padding: 10px 15px;
          font-size: 14px;
          font-weight: bold;
        }
        .custom-overlay:after {
          content: '';
          position: absolute;
          margin-left: -12px;
          left: 50%;
          bottom: -12px;
          width: 22px;
          height: 12px;
          background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services"></script>
      <script>
        var mapContainer = document.getElementById('map');
        var mapOption = {
          center: new kakao.maps.LatLng(37.5665, 126.9780),
          level: 8
        };
        var map = new kakao.maps.Map(mapContainer, mapOption);
        
        // 여행 코스 마커들 추가
        var locations = ${JSON.stringify(locations)};
        var markers = [];
        
        locations.forEach(function(location, index) {
          var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(location.lat, location.lng),
            map: map
          });
          
          var infowindow = new kakao.maps.InfoWindow({
            content: '<div style="padding:5px;font-size:12px;">' + location.name + '</div>'
          });
          
          kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });
          
          markers.push(marker);
        });
        
        ${routeScript}
        
        // 지도 클릭 이벤트
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
          var latlng = mouseEvent.latLng;
          console.log('클릭한 위치:', latlng.getLat(), latlng.getLng());
        });
        
        // 마커가 있는 경우 지도 범위 조정
        if (markers.length > 0) {
          var bounds = new kakao.maps.LatLngBounds();
          markers.forEach(function(marker) {
            bounds.extend(marker.getPosition());
          });
          map.setBounds(bounds);
        }
      </script>
    </body>
    </html>
  `;
};

// 현재 위치 가져오기 (React Native용)
export const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    // React Native에서는 별도의 Geolocation 라이브러리를 사용해야 함
    // 실제 구현 시에는 react-native-geolocation-service를 사용
    reject(new Error('Geolocation service not implemented yet'));
  });
}; 