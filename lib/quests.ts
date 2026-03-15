import type { Quest } from "@/lib/types";

export const quests: Quest[] = [
  {
    id: "library-explore",
    title: "도서관 탐험",
    description: "오늘 도서관에 가서 공부 인증을 남기고 조용한 집중 시간을 완성해 보자.",
    locationLabel: "도서관",
    xpReward: 40,
    category: "학업",
    memoryTitle: "조용한 오후의 도서관",
    memoryDescription: "책 냄새와 함께 오늘의 집중 시간을 기록했다.",
    markerPosition: {
      top: "37%",
      left: "32%"
    }
  },
  {
    id: "student-center-lunch",
    title: "학생회관 점심 미션",
    description: "학생회관에서 오늘의 메뉴를 먹고 잠깐 쉬어 가며 캠퍼스 리듬을 채워 보자.",
    locationLabel: "학생회관",
    xpReward: 40,
    category: "휴식",
    memoryTitle: "학생회관에서 보낸 점심",
    memoryDescription: "바쁜 하루 속에서도 캠퍼스의 여유를 챙긴 한 장면.",
    markerPosition: {
      top: "66%",
      left: "51%"
    }
  },
  {
    id: "geumjeongsan-walk",
    title: "금정산 산책",
    description: "금정산 쪽으로 걸어가며 캠퍼스 바깥 풍경과 공기를 천천히 느껴 보자.",
    locationLabel: "금정산",
    xpReward: 40,
    category: "탐험",
    memoryTitle: "금정산으로 이어지는 길",
    memoryDescription: "캠퍼스의 끝에서 새로운 풍경을 발견한 탐험 기록.",
    markerPosition: {
      top: "26%",
      left: "72%"
    }
  }
];
