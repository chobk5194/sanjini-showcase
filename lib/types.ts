export type AppTab = "home" | "map" | "record" | "memory";

export type OverlayState = null | "tutorial" | "questPanel" | "celebration";

export type CharacterVariant = "idle" | "guide" | "celebrate";

export type QuestCategory = "학업" | "휴식" | "탐험";

export interface Quest {
  id: string;
  title: string;
  description: string;
  locationLabel: string;
  xpReward: number;
  category: QuestCategory;
  memoryTitle: string;
  memoryDescription: string;
  markerPosition: {
    top: string;
    left: string;
  };
}

export interface PlayerProgress {
  xpTotal: number;
  streakCount: number;
  completedToday: boolean;
  completedQuestIds: string[];
}

export interface CelebrationPayload {
  questId: string;
  xpEarned: number;
  previousXp: number;
  nextXp: number;
  isFirstToday: boolean;
  completedAllToday: boolean;
  streakCountAfter: number;
}
