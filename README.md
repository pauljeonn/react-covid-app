# 코로나19(COVID-19) 세계 현황

## Contributor

@pauljeonn (전바울)

## Tech Stack

- Frontend: React, TypeScript, Emotion, Chart.js
- Deployment: Firebase

## API

- API URL: https://api.covid19api.com/summary
- API Documentation: https://documenter.getpostman.com/view/10808728/SzS8rjbc

## 소개

- 매일 업데이트되는 세계 코로나 현황을 보여주는 웹사이트 입니다.
- 사용자가 선택한 나라들의 신규 확진자의 수를 차트를 통해 한눈에 비교할 수 있습니다.
- 무료 API를 통해 신규 확진자의 수가 1명 이상의 나라들을 리스트에 보여줍니다.
- 타입스크립트 기반으로 진행하였고 인터페이스 타입을 미리 정의하여 사용하였습니다.
- Chart.js 라이브러리를 사용하여 바 차트 형태로 데이터 시각화를 구현하였습니다.
- Emotion 라이브러리를 사용하여 styled-components 문법으로 스타일링 하였습니다.
- useState, useEffect 등의 리액트 훅을 사용하여 컴포넌트 상태 관리를 하였습니다.
- 예) 리셋 기능: App.tsx 컴포넌트에서 리셋 버튼 클릭 시 useState 훅을 사용하여 값을 toggle하면 하위 컴포넌트에서 useEffect 훅이 props로 받아오는 해당 값이 toggle될때마다 스스로를 비활성화 시키는 기능
