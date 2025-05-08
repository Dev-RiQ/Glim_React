
![Image](https://github.com/user-attachments/assets/a6ce8fd1-a279-4271-b5e2-bc6c3dfbdc81)

---


# <img style="width:40px;" src="https://github.com/user-attachments/assets/3b8eaa31-214a-4608-bdbf-a3c6ef35ebe1"/> Glim (2025.04.15 ~ 2025.05.09 / 25 Days)


  <img src="https://github.com/user-attachments/assets/2bbdb696-d14f-4de7-87db-eadf1ca06ca8" width="150"/>
  <img src="https://github.com/user-attachments/assets/c5b6213c-7d1d-40de-b9ee-cf20b774b429" width="150"/>


Glim 서비스는 SNS 플랫폼으로 가입된 회원들과 일상과 관심사를 공유할 수 있으며,  
팔로우 시스템을 이용해 원하는 회원의 정보를 우선적으로 확인할 수 있습니다.

---

## 👥 Team Members
<a href="https://github.com/skrudKim"><img src="https://img.shields.io/badge/skrudKim-181717?style=for-the-badge&logo=github&logoColor=white"></a>
<a href="https://github.com/Dev-RiQ"><img src="https://img.shields.io/badge/DevRiQ-181717?style=for-the-badge&logo=github&logoColor=white"></a>
<a href="https://github.com/WOWOW0wOw"><img src="https://img.shields.io/badge/WOWOW0wOw-181717?style=for-the-badge&logo=github&logoColor=white"></a>



| ![Image](https://github.com/user-attachments/assets/bc566795-c232-42eb-b9eb-3233e7aea9f5) | ![Image](https://github.com/user-attachments/assets/169a79fa-18a6-419e-9ad3-f84631e110e1) | ![Image](https://github.com/user-attachments/assets/9e808007-534f-413d-9b2e-ae965cf596b4) |
|:-:|:-:|:-:|
| **Nakyeong Kim**<br>🟣 *Member*<br>• User<br>• JWT<br>• SMS VERIFICATION<br>• Ranking  | **Wongyu Lee**<br>🟣 *Leader*<br>• All Interaction<br>• Notification<br>• Chat<br>• React | **Jongseok Han**<br>🟣 *Member*<br>• Board<br>• Story<br>• Admin<br>• Pay |

---

## 🔗 Links

📄 **API Docs**


👉  [![API Docs](https://img.shields.io/badge/API_Docs-바로가기-8C65D0?style=for-the-badge&logo=notion&logoColor=white)](https://greenyeonmi.notion.site/Glim-API-1e0e74df681080ce8c96c67df0d17b80?pvs=4)


---
💻 **Glim (Back-End)**

👉  [![Glim Backend](https://img.shields.io/badge/Glim_Backend-Back--End-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://github.com/Dev-RiQ/Glim)

---



## 📑 Table of Contents
- [🎯 기획 배경 & 목표](#-기획-배경--목표)
- [🛠️ Tech Stacks](#-tech-stacks)
- [🪛 개발 환경](#-개발-환경)
- [🔧 사용 라이브러리](#-사용-api-및-라이브러리)
- [📁 프로젝트 구조](#-프로젝트-구조)
- [🔗 REST API 연동](#-rest-api-연동)
- [⚙️ 주요 기능](#-주요-기능)
- [⭐ 기능 미리보기](#-기능-미리보기)
- [🛠️ 실행 방법](#-실행-방법)
- [🧪 트러블슈팅](#-트러블슈팅)
- [✨ 프로젝트 후기](#-프로젝트-후기)

---

## 🎯 기획 배경 & 목표
 
> 인스타그램의 기능을 벤치마킹하면서, 실시간 소통과 다양한 미디어 업로드 기능 중심으로 구현했습니다.  
> 
> 사용자 경험과 반응형 UI 구현에 중점을 두었습니다.

---

## 🛠️ Tech Stacks

<div align="center"> 
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
</div>

---

## 🪛 개발 환경
- JavaScript 
- HTML / CSS
- React 19.1.0 (react-router-dom, axios 등)

---

## 🔧 사용 API 및 라이브러리
- **Fontawesome** : 아이콘 사용
- **Axios** : REST API 호출
- **React-Router-Dom** : SPA 라우팅 처리

---

## 📁 프로젝트 구조

```bash
src/
├── assets/         # 이미지, 폰트, 공통 스타일 등 정적 파일
├── components/     # 공통 UI 컴포넌트 (버튼, 모달, 카드 등)
├── pages/          # 각 라우트에 해당하는 페이지 컴포넌트
├── utils/          # 유틸 함수, 공용 로직 정리
└── index.jsx       # React 앱 진입점
```

---

## ⚙️ 주요 기능
- [x] 게시글 업로드 (이미지, 텍스트, BGM, 해시태그)
- [x] Shorts 영상 업로드 (짧은 영상)
- [x] 스토리 (24시간 자동 삭제)
- [x] 팔로우 / 언팔로우 기능
- [x] 해시태그 검색 및 분류
- [x] 실시간 채팅
- [x] 알림 기능 (팔로우, 댓글, 좋아요 등)

---

## ⭐ 기능 미리보기

### 📌 로그인 & 회원가입
<details>
  <summary>펼치기</summary>

> 소식을 받고 싶은 회원을 팔로우하여 공유되는 일상을 항상 확인하고 소통해요.

 <img style="" src="https://github.com/user-attachments/assets/dae6f20c-765a-48c8-b259-289406edd756"/>


</details>

---

### 📌 메인페이지
<details>
  <summary>펼치기</summary>

> 공유하고 싶은 이미지들을 내용과 함께 업로드 할 수 있어요.  
> 
> 추억의 장소, 함께한 사람들, 관련된 태그, 적절한 배경음악도 설정할 수 있어요.

 <img style="" src="https://github.com/user-attachments/assets/446a0d8c-8a5f-4ef0-a787-66f5e3812d1f"/>


</details>

---

### 📌 마이페이지
<details>
  <summary>펼치기</summary>

> 게시글과 Shorts에 해시태그를 통해  
더 많은 회원과 관심사가 비슷한 회원에게 공유될 수 있게 해줘요.

 <img style="" src="https://github.com/user-attachments/assets/04bb7233-b5b5-4e78-b489-cd65efdcec96"/>
</details>

---

### 📌 게시글
<details>
  <summary>펼치기</summary>

> 공유하고 싶은 이미지들을 내용과 함께 업로드 할 수 있어요.  
>
> 추억의 장소, 함께한 사람들, 관련된 태그, 적절한 배경음악도 설정할 수 있어요.

 <img style="" src="https://github.com/user-attachments/assets/243aeccb-4539-43d6-937e-5a4375ce5613"/>
 
</details>

---

### 📌 Shorts
<details>
  <summary>펼치기</summary>

> 공유하고 싶은 영상을 내용과 함께 업로드 할 수 있어요.  
>
> 마찬가지로 추억의 장소, 함께한 사람들, 관련된 태그도 설정할 수 있어요.

 <img style="" src="https://github.com/user-attachments/assets/0024eae9-8fc2-4776-9bf9-ca5ad7a2b389"/>
</details>

---

### 📌 스토리
<details>
  <summary>펼치기</summary>

> 특별한 순간을 업로드하여 24시간 동안 다른 회원들과 공유하고 소통할 수 있어요.  
> 
> 24시간이 지나도 저장된 스토리를 마이페이지에서 확인할 수 있어요.

 <img style="" src="https://github.com/user-attachments/assets/1f999d17-31ad-4eb0-bd62-6080c1b46e70"/>
 
</details>

---

### 📌 채팅
<details>
  <summary>펼치기</summary>

> 댓글의 한계를 넘어 어느 순간에나 소통이 필요할 때 실시간 채팅을 이용해요.

 <img style="" src="https://github.com/user-attachments/assets/ddd48d4e-9f22-462a-a287-47fcf1d96a9f"/>
</details>

---

### 📌 랭킹
<details>
  <summary>펼치기</summary>

> 내 게시물의 변동사항과 팔로우 추가 등 궁금한 소식을 전달해드려요.

 <img style="" src="https://github.com/user-attachments/assets/06f507b5-565f-475e-9281-228566ec7643"/>
</details>


---

## 🧪 프론트엔드 트러블슈팅

- **CORS 오류**
    - 원인: 프론트와 백엔드 포트가 다를 때 발생
    - 해결: 백엔드에 `@CrossOrigin` 추가 및 프록시 설정

- **GIF 용량 문제**
    - 해결: 이미지 경량화 후 GitHub LFS 또는 imgur 업로드

- **라우팅 새로고침 시 404**
    - 해결: React Router 설정에서 `BrowserRouter` → `HashRouter`로 변경 가능

---

## 🧪 백엔드 트러블슈팅

- ** 제목 **
    - 원인: 
    - 해결: 

- ** 제목 **
    - 원인: 
    - 해결: 

- ** 제목 **
    - 원인: 
    - 해결: 

---

## ✨ 프로젝트 후기
 
> 특히 영상/이미지 업로드, 알림 시스템, 실시간 채팅 등 **프론트엔드 SPA에서 구현이 까다로운 기능**들을 React와 REST API 조합으로 실현했습니다.
> 
> 실사용자 입장에서의 흐름, 동선, 반응속도 등을 고려한 UI 개선 경험이 큰 자산이 되었습니다.
> 
> 앞으로도 이런 경험을 토대로 풀스택 개발 역량을 확장할 계획입니다.

---
