import type { ReactNode } from "react";
import Image from "next/image";

import { QuestMarker } from "@/components/QuestMarker";
import type { Quest } from "@/lib/types";

type MapViewProps = {
  quests: Quest[];
  completedQuestIds: string[];
  markersLocked?: boolean;
  onSelectQuest: (quest: Quest) => void;
  children?: ReactNode;
};

export function MapView({
  quests,
  completedQuestIds,
  markersLocked = false,
  onSelectQuest,
  children
}: MapViewProps) {
  const completedCount = completedQuestIds.length;

  return (
    <section className="flex h-full flex-col gap-3">
      <div className="rounded-[1.65rem] border border-white/75 bg-white/92 p-4 shadow-panel backdrop-blur-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold tracking-[0.18em] text-adventure-blue/70">탐험 지도</p>
            <h2 className="mt-1 text-lg font-black text-adventure-navy">오늘의 캠퍼스 미션</h2>
            <p className="mt-2 text-sm font-bold leading-6 text-adventure-blue/80">
              빨간 마커를 눌러 오늘의 캠퍼스 활동을 미션처럼 시작해 보자.
            </p>
          </div>
          <div className="rounded-2xl bg-sky-100 px-3 py-2 text-right text-xs font-black text-adventure-blue">
            <p>오늘 진행</p>
            <p className="mt-1 text-base text-adventure-navy">
              {completedCount} / {quests.length}
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden rounded-[1.85rem] border border-white/80 bg-white/74 p-3 shadow-game">
        <div className="relative h-full overflow-hidden rounded-[1.55rem] border border-white/75">
          <Image
            src="/images/campus-map.png"
            alt="캠퍼스 지도"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 390px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(16,54,93,0.08))]" />
          {quests.map((quest) => (
            <QuestMarker
              key={quest.id}
              quest={quest}
              isCompleted={completedQuestIds.includes(quest.id)}
              isDisabled={markersLocked}
              onSelect={onSelectQuest}
            />
          ))}
          {children}
        </div>
      </div>
    </section>
  );
}
