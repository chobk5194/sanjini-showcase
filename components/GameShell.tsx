"use client";

import { useMemo, useState } from "react";

import { AppTabBar } from "@/components/AppTabBar";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { CelebrationOverlay } from "@/components/CelebrationOverlay";
import { HomeTab } from "@/components/HomeTab";
import { MapView } from "@/components/MapView";
import { MemoryTab } from "@/components/MemoryTab";
import { QuestPanel } from "@/components/QuestPanel";
import { RecordTab } from "@/components/RecordTab";
import { TutorialOverlay } from "@/components/TutorialOverlay";
import { quests } from "@/lib/quests";
import type { AppTab, CelebrationPayload, OverlayState, Quest } from "@/lib/types";

const tutorialDialogues = [
  "안녕!\n산지니 원정대에 온 걸 환영해!",
  "오늘도 캠퍼스에\n새로운 모험이 기다리고 있어!",
  "오늘의 퀘스트를 확인해볼까?"
];

function getLevel(totalXp: number) {
  return Math.floor(totalXp / 100) + 1;
}

export function GameShell() {
  const [currentTab, setCurrentTab] = useState<AppTab>("home");
  const [overlayState, setOverlayState] = useState<OverlayState>(null);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);
  const [activeDialogueIndex, setActiveDialogueIndex] = useState(0);
  const [xpTotal, setXpTotal] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [completedToday, setCompletedToday] = useState(false);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);
  const [celebrationPayload, setCelebrationPayload] = useState<CelebrationPayload | null>(null);

  const level = useMemo(() => getLevel(xpTotal), [xpTotal]);
  const xpIntoLevel = xpTotal % 100;
  const completedCount = completedQuestIds.length;
  const selectedQuest = useMemo(
    () => quests.find((quest) => quest.id === selectedQuestId) ?? null,
    [selectedQuestId]
  );
  const celebrationQuest = useMemo(
    () => quests.find((quest) => quest.id === celebrationPayload?.questId) ?? null,
    [celebrationPayload]
  );

  const openMapExperience = () => {
    setCurrentTab("map");
    setSelectedQuestId(null);

    if (!hasSeenTutorial) {
      setActiveDialogueIndex(0);
      setOverlayState("tutorial");
      return;
    }

    setOverlayState(null);
  };

  const handleTabChange = (tab: AppTab) => {
    if (overlayState) {
      return;
    }

    if (tab === "map") {
      openMapExperience();
      return;
    }

    setCurrentTab(tab);
    setSelectedQuestId(null);
  };

  const handleAdvanceTutorial = () => {
    if (activeDialogueIndex < tutorialDialogues.length - 1) {
      setActiveDialogueIndex((previous) => previous + 1);
      return;
    }

    setHasSeenTutorial(true);
    setOverlayState(null);
  };

  const handleSelectQuest = (quest: Quest) => {
    if (completedQuestIds.includes(quest.id)) {
      return;
    }

    setSelectedQuestId(quest.id);
    setOverlayState("questPanel");
  };

  const handleCloseQuestPanel = () => {
    setSelectedQuestId(null);
    setOverlayState(null);
  };

  const handleCompleteQuest = () => {
    if (!selectedQuest || completedQuestIds.includes(selectedQuest.id)) {
      return;
    }

    const previousXp = xpTotal;
    const nextXp = previousXp + selectedQuest.xpReward;
    const nextCompletedQuestIds = [...completedQuestIds, selectedQuest.id];
    const isFirstToday = !completedToday;
    const nextStreakCount = isFirstToday ? streakCount + 1 : streakCount;

    setCompletedQuestIds(nextCompletedQuestIds);
    setXpTotal(nextXp);
    setCompletedToday(true);

    if (isFirstToday) {
      setStreakCount(nextStreakCount);
    }

    setCelebrationPayload({
      questId: selectedQuest.id,
      xpEarned: selectedQuest.xpReward,
      previousXp,
      nextXp,
      isFirstToday,
      completedAllToday: nextCompletedQuestIds.length === quests.length,
      streakCountAfter: nextStreakCount
    });
    setSelectedQuestId(null);
    setOverlayState("celebration");
  };

  const handleCloseCelebration = () => {
    setOverlayState(null);
    setCelebrationPayload(null);
    setCurrentTab("map");
  };

  const screenTitle =
    currentTab === "home"
      ? "오늘의 홈"
      : currentTab === "map"
        ? "탐험 지도"
        : currentTab === "record"
          ? "활동 기록"
          : "추억 보관함";

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-8">
      <BackgroundDecor />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center gap-10">
        <section className="hidden max-w-md lg:block">
          <div className="rounded-[2rem] border border-white/70 bg-white/18 p-6 text-white shadow-[0_28px_80px_rgba(24,58,102,0.18)] backdrop-blur-md">
            <p className="text-xs font-bold tracking-[0.18em] text-white/75">DESIGN NOTE</p>
            <h1 className="mt-4 font-display text-[3.15rem] leading-[0.9] text-white">
              산지니
              <br />
              원정대
            </h1>
            <p className="mt-5 text-base font-bold leading-8 text-white/88">
              산지니원정대는 대학생이 캠퍼스 활동을 미션처럼 수행하고 그 기록을 남기는 개인용 캠퍼스 RPG형 기록 앱이다.
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-[1.5rem] border border-white/18 bg-white/10 p-4">
                <p className="text-sm font-black">미션 기반 구조</p>
                <p className="mt-2 text-sm font-bold leading-7 text-white/78">
                  캠퍼스의 일상을 해야 할 일 목록이 아니라 직접 탐험하는 작은 퀘스트처럼 느끼게 만든다.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/18 bg-white/10 p-4">
                <p className="text-sm font-black">업적과 타임라인 아카이브</p>
                <p className="mt-2 text-sm font-bold leading-7 text-white/78">
                  하루의 활동은 기록 탭과 추억 탭에 차곡차곡 남아 개인용 캠퍼스 RPG 로그처럼 보이게 설계한다.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/18 bg-white/10 p-4">
                <p className="text-sm font-black">고정 휴대폰 비율</p>
                <p className="mt-2 text-sm font-bold leading-7 text-white/78">
                  상태가 바뀌어도 프레임 높이가 흔들리지 않도록 고정 비율 폰 셸 안에서만 화면과 오버레이를 전환한다.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="w-full shrink-0"
          style={{
            width: "min(100%, 24.5rem, calc((100vh - 2rem) * 390 / 844))"
          }}
        >
          <div className="aspect-[390/844] rounded-[2.9rem] border border-white/80 bg-white/16 p-2 shadow-[0_30px_90px_rgba(24,58,102,0.24)] backdrop-blur-md">
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2.35rem] border border-white/70 bg-[linear-gradient(180deg,rgba(83,186,255,0.96),rgba(169,228,255,0.96)_34%,rgba(243,251,255,0.98)_100%)]">
              <div className="pointer-events-none absolute inset-0 bg-soft-grid opacity-35" />
              <div className="relative flex h-full flex-col">
                <header className="px-4 pb-3 pt-4 sm:px-5">
                  <div className="flex items-center justify-between rounded-[1.45rem] bg-white/22 px-4 py-3 text-white backdrop-blur-sm">
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.18em] text-white/78">산지니 원정대</p>
                      <p className="mt-1 text-sm font-black">{screenTitle}</p>
                    </div>
                    <div className="rounded-full bg-white/82 px-3 py-1 text-right text-xs font-black text-adventure-blue">
                      레벨 {level}
                    </div>
                  </div>
                </header>

                <div className="relative min-h-0 flex-1 px-4 sm:px-5">
                  <div className="relative h-full overflow-hidden rounded-[2rem] border border-white/55 bg-white/10 backdrop-blur-[1px]">
                    <div className="h-full overflow-y-auto px-3 py-3 pb-6">
                      {currentTab === "home" ? (
                        <HomeTab
                          quests={quests}
                          completedQuestIds={completedQuestIds}
                          level={level}
                          xpTotal={xpTotal}
                          xpIntoLevel={xpIntoLevel}
                          streakCount={streakCount}
                          onOpenMap={openMapExperience}
                        />
                      ) : null}

                      {currentTab === "map" ? (
                        <MapView
                          quests={quests}
                          completedQuestIds={completedQuestIds}
                          markersLocked={overlayState === "tutorial"}
                          onSelectQuest={handleSelectQuest}
                        />
                      ) : null}

                      {currentTab === "record" ? (
                        <RecordTab
                          quests={quests}
                          completedQuestIds={completedQuestIds}
                          xpTotal={xpTotal}
                          streakCount={streakCount}
                        />
                      ) : null}

                      {currentTab === "memory" ? (
                        <MemoryTab quests={quests} completedQuestIds={completedQuestIds} />
                      ) : null}
                    </div>

                    {overlayState === "tutorial" ? (
                      <TutorialOverlay
                        dialogue={tutorialDialogues[activeDialogueIndex]}
                        dialogueIndex={activeDialogueIndex}
                        dialogueCount={tutorialDialogues.length}
                        isLastDialogue={activeDialogueIndex === tutorialDialogues.length - 1}
                        onAdvance={handleAdvanceTutorial}
                      />
                    ) : null}

                    {overlayState === "questPanel" && selectedQuest ? (
                      <QuestPanel
                        quest={selectedQuest}
                        onComplete={handleCompleteQuest}
                        onClose={handleCloseQuestPanel}
                      />
                    ) : null}

                    {overlayState === "celebration" && celebrationPayload && celebrationQuest ? (
                      <CelebrationOverlay
                        payload={celebrationPayload}
                        quest={celebrationQuest}
                        onClose={handleCloseCelebration}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="px-4 pb-4 pt-3 sm:px-5">
                  <AppTabBar
                    currentTab={currentTab}
                    onChange={handleTabChange}
                    disabled={overlayState !== null}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
