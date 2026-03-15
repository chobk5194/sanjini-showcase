import Image from "next/image";

import { PrimaryButton } from "@/components/PrimaryButton";
import type { Quest } from "@/lib/types";

type HomeTabProps = {
  quests: Quest[];
  completedQuestIds: string[];
  level: number;
  xpTotal: number;
  xpIntoLevel: number;
  streakCount: number;
  onOpenMap: () => void;
};

export function HomeTab({
  quests,
  completedQuestIds,
  level,
  xpTotal,
  xpIntoLevel,
  streakCount,
  onOpenMap
}: HomeTabProps) {
  const completedCount = completedQuestIds.length;
  const featuredQuest = quests.find((quest) => !completedQuestIds.includes(quest.id)) ?? quests[quests.length - 1];
  const progressRatio = Math.min(xpIntoLevel / 100, 1);

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-white/88 shadow-game backdrop-blur-sm">
        <div className="relative h-64">
          <Image
            src="/images/sanjini-poster.png"
            alt="산지니 원정대 홈 배경"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 390px"
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,33,72,0.08),rgba(10,33,72,0.3)_58%,rgba(10,33,72,0.72))]" />
          <div className="absolute left-4 top-4 inline-flex rounded-full bg-white/84 px-3 py-1 text-[11px] font-black text-adventure-blue">
            오늘의 캠퍼스 RPG
          </div>
          <div className="absolute inset-x-4 bottom-4 space-y-3 text-white">
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] text-white/80">HOME</p>
              <h2 className="mt-1 font-display text-[2.2rem] leading-[0.92]">산지니 원정대</h2>
              <p className="mt-2 max-w-[15rem] text-sm font-bold leading-6 text-white/88">
                캠퍼스 활동을 미션처럼 기록하고, 오늘의 탐험을 작은 성취로 쌓아 가는 앱.
              </p>
            </div>
            <PrimaryButton className="max-w-[11rem]" onClick={onOpenMap}>
              오늘의 미션 열기
            </PrimaryButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[1.6rem] border border-white/80 bg-white/94 p-4 shadow-panel">
          <p className="text-[11px] font-bold tracking-[0.16em] text-adventure-blue/70">미션 진행도</p>
          <p className="mt-2 text-2xl font-black text-adventure-navy">{completedCount} / {quests.length}</p>
          <p className="mt-2 text-sm font-bold leading-6 text-adventure-blue/80">
            오늘의 캠퍼스 미션을 한 칸씩 채우는 중.
          </p>
        </div>
        <div className="rounded-[1.6rem] border border-white/80 bg-white/94 p-4 shadow-panel">
          <p className="text-[11px] font-bold tracking-[0.16em] text-adventure-blue/70">연속 기록</p>
          <p className="mt-2 text-2xl font-black text-adventure-navy">{streakCount}일</p>
          <p className="mt-2 text-sm font-bold leading-6 text-adventure-blue/80">
            매일의 캠퍼스 활동을 개인용 RPG 기록처럼 이어가는 중.
          </p>
        </div>
      </div>

      <div className="rounded-[1.8rem] border border-white/80 bg-white/95 p-5 shadow-panel">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-adventure-blue/70">레벨과 성장</p>
            <h3 className="mt-2 text-[1.5rem] font-black text-adventure-navy">레벨 {level}</h3>
          </div>
          <div className="rounded-2xl bg-sky-100 px-3 py-2 text-right text-xs font-black text-adventure-blue">
            <p>누적 XP</p>
            <p className="mt-1 text-base text-adventure-navy">{xpTotal}</p>
          </div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-sky-100">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#49b0ff,#ffd45f)] transition-[width] duration-500"
            style={{ width: `${progressRatio * 100}%` }}
          />
        </div>
        <p className="mt-3 text-sm font-bold leading-6 text-adventure-blue/80">
          다음 레벨까지 {100 - xpIntoLevel} XP 남았어.
        </p>
      </div>

      <div className="rounded-[1.8rem] border border-white/80 bg-adventure-navy p-5 text-white shadow-panel">
        <p className="text-[11px] font-bold tracking-[0.16em] text-sky-200">오늘의 추천 미션</p>
        <h3 className="mt-2 text-xl font-black">{featuredQuest.title}</h3>
        <p className="mt-2 text-sm font-bold leading-6 text-white/85">
          {featuredQuest.description}
        </p>
        <div className="mt-4 inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-black text-white/88">
          위치: {featuredQuest.locationLabel}
        </div>
      </div>
    </section>
  );
}
