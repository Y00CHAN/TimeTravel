# TimeTravel

여행 기록 및 관리 모바일 애플리케이션

## 📱 프로젝트 개요

TimeTravel은 사용자가 여행을 계획하고, 기록하며, 지도 기반으로 여행 코스를 관리할 수 있는 React Native 기반 모바일 앱입니다.

## 🚀 주요 기능

### 인증 시스템
- 소셜 로그인 (Google, Kakao)
- 회원가입 및 프로필 설정

### 지도 기능
- 카카오맵 API 기반 지도
- 길찾기 기능
- 여행 코스 핀 표시
- 현재 위치 확인

### 여행 관리
- 여행 목록 관리
- 사진 갤러리
- 여행 기록 및 공유

## 🛠️ 기술 스택

### Frontend
- React Native 0.80.0
- TypeScript
- React Navigation
- Axios
- React Native WebView

### Backend
- Django
- Django REST Framework
- SQLite

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone [repository-url]
cd TimeTravel
```

### 2. Frontend 설정
```bash
cd Frontend
npm install
```

### 3. 환경변수 설정
```bash
# .env.example 파일을 .env로 복사
cp .env.example .env

# .env 파일을 열어서 실제 API 키들을 입력
# KAKAO_MAP_API_KEY=your_actual_kakao_map_api_key
# KAKAO_REST_API_KEY=your_actual_kakao_rest_api_key
```

### 4. Backend 설정
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 5. 앱 실행
```bash
# Frontend 디렉토리에서
npm run android  # Android
npm run ios      # iOS
```

## 🔑 API 키 설정

### 카카오맵 API 설정

1. [Kakao Developers](https://developers.kakao.com/)에서 애플리케이션 생성
2. JavaScript 키와 REST API 키 발급
3. `Frontend/.env` 파일에서 API 키 설정:

```bash
# .env 파일 예시
KAKAO_MAP_API_KEY=your_javascript_key_here
KAKAO_REST_API_KEY=your_rest_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
API_BASE_URL=http://127.0.0.1:8000/api/v1
```

### 필요한 API 키들
- **카카오맵 JavaScript 키**: 지도 표시용
- **카카오 REST API 키**: 주소 검색, 길찾기 등 API 호출용
- **Google Maps API 키**: (선택사항) Google 지도 사용 시

### 환경변수 보안
- `.env` 파일은 `.gitignore`에 포함되어 Git에 커밋되지 않습니다
- 실제 API 키는 절대 Git에 커밋하지 마세요
- 팀원들과 공유할 때는 `.env.example` 파일을 참고하세요

## 📁 프로젝트 구조

```
TimeTravel/
├── Frontend/                 # React Native 앱
│   ├── src/
│   │   ├── screens/         # 화면 컴포넌트
│   │   │   ├── Auth/       # 인증 관련 화면
│   │   │   ├── Main/       # 메인 화면들
│   │   │   └── Profile/    # 프로필 화면
│   │   ├── services/       # API 서비스
│   │   └── config/         # 설정 파일
│   └── package.json
├── backend/                 # Django 백엔드
│   ├── accounts/           # 사용자 관리
│   └── manage.py
└── README.md
```

## 🗺️ 지도 기능 상세

### 구현된 기능
- ✅ 카카오맵 지도 표시
- ✅ 여행 코스 핀 표시
- ✅ 길찾기 기능
- ✅ 주소 검색
- ✅ 마커 클릭 이벤트

### 사용 방법
1. **지도 보기**: Map 탭에서 "지도 보기" 버튼 클릭
2. **길찾기**: "길찾기" 버튼 클릭 후 출발지/도착지 입력
3. **여행 코스**: 진행중인 여행이 있으면 자동으로 핀 표시

## 🔧 개발 환경

- Node.js >= 18
- React Native CLI
- Android Studio / Xcode
- Python 3.8+

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request