# 사용할 이미지 선택
FROM node:20-alpine as build

# 작업 디렉토리 설정
WORKDIR /app

# 컨테이너 내부로 package.json 파일들을 복사
COPY package*.json ./

# 명령어 실행 (의존성 설치)
RUN npm install

COPY . .

#yarn build
RUN npm run build

# 연결할 포트번호
EXPOSE 80

# 앱 실행
CMD ["npm", "run", "start"]
