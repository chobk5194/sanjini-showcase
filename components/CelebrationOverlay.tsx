"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { PrimaryButton } from "@/components/PrimaryButton";
import type { CelebrationPayload, Quest } from "@/lib/types";

type CelebrationOverlayProps = {
  quest: Quest;
  payload: CelebrationPayload;
  onClose: () => void;
};

const confettiPieces = [
  { left: "8%", delay: "0s", color: "bg-adventure-yellow" },
  { left: "23%", delay: "0.35s", color: "bg-sky-300" },
  { left: "39%", delay: "0.75s", color: "bg-red-400" },
  { left: "55%", delay: "0.2s", color: "bg-adventure-yellow" },
  { left: "72%", delay: "0.55s", color: "bg-sky-200" },
  { left: "86%", delay: "0.15s", color: "bg-red-300" }
];

function getLevel(totalXp: number) {
  return Math.floor(totalXp / 100) + 1;
}

export function CelebrationOverlay({
  quest,
  payload,
  onClose
}: CelebrationOverlayProps) {
  const [displayXp, setDisplayXp] = useState(payload.previousXp);

  useEffect(() => {
    const distance = payload.nextXp - payload.previousXp;
    const steps = 24;
    const stepValue = distance / steps;
    let currentStep = 0;

    const timer = window.setInterval(() => {
      currentStep += 1;
      if (currentStep >= steps) {
        setDisplayXp(payload.nextXp);
        window.clearInterval(timer);
        return;
      }

      setDisplayXp(Math.round(payload.previousXp + stepValue * currentStep));
    }, 28);

    return () => {
      window.clearInterval(timer);
    };
  }, [payload.nextXp, payload.previousXp]);

  const displayLevel = useMemo(() => getLevel(displayXp), [displayXp]);
  const finalLevel = useMemo(() => getLevel(payload.nextXp), [payload.nextXp]);
  const progressRatio = (displayXp % 100) / 100;
  const leveledUp = getLevel(payload.previousXp) !== finalLevel;

  return (
    <div className="absolute inset-0 z-40 overflow-hidden bg-[rgba(8,20,42,0.54)] p-3 backdrop-blur-[3px]">
      <div className="relative flex h-full items-center justify-center">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-28 overflow-hidden">
          {confettiPieces.map((piece) => (
            <span
              key={[piece.left, piece.delay].join("-")}
              className={[
                "absolute top-0 h-4 w-3 rounded-sm motion-safe:animate-[confetti-drift_2.8s_ease-in-out_infinite]",
                piece.color
              ].join(" ")}
              style={{ left: piece.left, animationDelay: piece.delay }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-[20rem] rounded-[1.9rem] border border-white/80 bg-white/96 p-4 shadow-game backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="inline-flex rounded-full bg-adventure-yellow/80 px-3 py-1 text-[11px] font-black text-adventure-navy">
              미션 성공
            </div>
            <div className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-black text-adventure-blue">
              {quest.locationLabel}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-[5.5rem_1fr] items-center gap-3">
            <div className="relative">
              <div className="absolute inset-x-2 bottom-2 h-4 rounded-full bg-adventure-navy/15 blur-lg" />
              <Image
                src="/images/main-character.png"
                alt="산지니 캐릭터"
                width={220}
                height={220}
                priority
                className="relative z-10 h-auto w-full"
              />
            </div>
            <div className="min-w-0">
              <div className="rounded-[1rem] bg-sky-50 px-3 py-2 text-sm font-black leading-5 text-adventure-navy shadow-sm">
                {payload.completedAllToday
                  ? "오늘의 미션 전부 성공!"
                  : "산지니가 오늘의 탐험을 칭찬하고 있어."}
              </div>
              <h2 className="mt-3 text-[1.25rem] font-black leading-tight text-adventure-navy">
                {quest.title}
              </h2>
              <p className="mt-2 text-sm font-bold leading-5 text-adventure-blue/80">
                {quest.locationLabel} 미션 완료. 경험치가 바로 반영됐어.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-[1.5rem] bg-sky-50 p-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-[1rem] bg-white px-3 py-2 shadow-sm">
                <p className="text-[10px] font-black tracking-[0.12em] text-adventure-blue/70">획득 XP</p>
                <p className="mt-1 text-[1.35rem] font-black text-adventure-navy">+{payload.xpEarned}</p>
              </div>
              <div className="rounded-[1rem] bg-white px-3 py-2 shadow-sm">
                <p className="text-[10px] font-black tracking-[0.12em] text-adventure-blue/70">현재 레벨</p>
                <p className="mt-1 text-[1.35rem] font-black text-adventure-navy">{displayLevel}</p>
              </div>
            </div>
            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#49b0ff,#ffd45f)] transition-[width] duration-150"
                style={{ width: `${Math.max(progressRatio * 100, 6)}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-black leading-5 text-adventure-blue/80">
              누적 XP {displayXp} · 다음 레벨까지 {100 - (displayXp % 100)} XP
            </p>
            {leveledUp ? (
              <div className="mt-2 rounded-[1rem] bg-adventure-navy px-3 py-2 text-xs font-black text-white">
                레벨 업! 이제 레벨 {finalLevel} 탐험가야.
              </div>
            ) : null}
          </div>

          {payload.isFirstToday ? (
            <div className="mt-3 rounded-[1.25rem] border border-yellow-200/80 bg-[linear-gradient(180deg,#fff7df,#fff1b8)] px-3 py-3">
              <p className="text-[10px] font-black tracking-[0.12em] text-adventure-blue/70">연속 기록 보상</p>
              <p className="mt-1 text-sm font-black text-adventure-navy">
                첫 완료 성공. 연속 {payload.streakCountAfter}일 달성
              </p>
            </div>
          ) : null}

          {payload.completedAllToday ? (
            <div className="mt-2 rounded-[1.25rem] bg-[linear-gradient(180deg,#183a66,#24538d)] px-3 py-3 text-white">
              <p className="text-[10px] font-black tracking-[0.12em] text-sky-200">오늘의 미션 전부 성공</p>
              <p className="mt-1 text-sm font-black">세 개의 캠퍼스 미션을 모두 완료했어.</p>
            </div>
          ) : null}

          <div className="mt-4">
            <PrimaryButton size="compact" variant="secondary" onClick={onClose}>
              지도 화면으로 돌아가기
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
