<img src="/frontend/src/reactDirectorySample.png"  width="370" height="700">

## assets

이미지 혹은 폰트와 같은 파일들이 저장되는 폴더

이미지와 같은 파일들을 public에 직접 넣는 경우도 있는데 둘의 차이는 컴파일시에 필요한지 여부이다.

파비콘과 같이 index.html내부에서 직접 사용하여 컴파일 단계에서 필요하지 않은 파일들은 public에

반면, 컴포넌트 내부에서 사용하는 이미지 파일인 경우 이 assets 폴더에 위치시켜야 한다.

## components

재사용 가능한 컴포넌트들이 위치하는 폴더

컴포넌트는 매우 많아질 수 있기 때문에 이 폴더 내부에서 하위폴더로 추가로 분류하는 경우가 많다.

## contexts

contextAPI를 사용할 때 관련 파일들이 위치하는곳

상태관리를 위해 contextAPI 대신 redux를 사용 할 경우 폴더 이름을 store로 사용하기도 한다.

## pages

react router등을 이용하여 라우팅을 적용할 때 페이지 컴포넌트를 이 폴더에 위치시킵니다.

## services (= api)

보통 api관련 로직의 모듈 파일이 위치하며 auth와 같이 인증과 관련된 파일이 포함되기도 한다.

## styles

css 파일들이 포함되는 폴더

## utils

정규표현식 패턴이나 공통함수 등 공통으로 사용하는 유틸 파일들이 위치하는 폴더

## constants

공통적으로 사용되는 상수들을 정의한 파일들이 위치하는 폴더입니다.

## config

config 파일이 많지 않은 경우 보통 최상위에 위치시켜놓지만 여러개의 config 파일이 있을 경우 폴더로 분리하기도 한다.
