import { PrimaryButton } from "@/components/PrimaryButton";
import { SanjiniCharacter } from "@/components/SanjiniCharacter";
import { StreakCard } from "@/components/StreakCard";
import type { Quest } from "@/lib/types";

type QuestCompleteSceneProps = {
  quest: Quest;
  streakCount: number;
  showStreakCard: boolean;
  onBackToMap: () => void;
};

const confettiPieces = [
  { left: "10%", delay: "0s", color: "bg-adventure-yellow" },
  { left: "24%", delay: "0.4s", color: "bg-sky-300" },
  { left: "38%", delay: "0.8s", color: "bg-red-400" },
  { left: "54%", delay: "0.2s", color: "bg-adventure-yellow" },
  { left: "67%", delay: "0.7s", color: "bg-sky-200" },
  { left: "81%", delay: "0.3s", color: "bg-red-300" }
];

export function QuestCompleteScene({
  quest,
  streakCount,
  showStreakCard,
  onBackToMap
}: QuestCompleteSceneProps) {
  return (
    <section className="relative flex h-full flex-col gap-5">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-40 overflow-hidden">
        {confettiPieces.map((piece) => (
          <span
            key={[piece.left, piece.delay].join("-")}
            className={[
              "absolute top-0 h-4 w-3 rounded-sm",
              piece.color,
              "motion-safe:animate-[confetti-drift_2.8s_ease-in-out_infinite]"
            ].join(" ")}
            style={{ left: piece.left, animationDelay: piece.delay }}
          />
        ))}
        <span className="absolute left-8 top-14 text-2xl motion-safe:animate-[sparkle_1.8s_ease-in-out_infinite]">✦</span>
        <span className="absolute right-10 top-10 text-xl motion-safe:animate-[sparkle_2.2s_ease-in-out_infinite]">✦</span>
      </div>

      <div className="space-y-2 pt-6 text-center">
        <div className="mx-auto inline-flex rounded-full bg-white/75 px-4 py-2 text-xs font-black text-adventure-blue shadow-sm">
          퀘스트 완료
        </div>
        <h2 className="text-[1.9rem] font-black leading-tight text-white drop-shadow-[0_4px_0_rgba(24,58,102,0.2)]">
          와! 퀘스트를 완료했어!
          <br />
          정말 대단해!
        </h2>
        <p className="text-sm font-bold text-white/95">
          이번에 해낸 모험: {quest.title}
        </p>
      </div>

      <div className="relative flex justify-center">
        <SanjiniCharacter variant="celebrate" />
      </div>

      <div className="rounded-[1.8rem] border border-white/75 bg-white/95 p-5 text-center shadow-panel">
        <p className="text-xs font-black tracking-[0.18em] text-adventure-blue/70">
          미션 완료
        </p>
        <p className="mt-2 text-lg font-black text-adventure-navy">{quest.locationLabel} 미션 성공!</p>
        <p className="mt-2 text-sm font-bold leading-6 text-adventure-blue/80">
          산지니가 다음 탐험도 기다리고 있어.
        </p>
      </div>

      {showStreakCard ? <StreakCard streakCount={streakCount} /> : null}

      <div className="pb-1">
        <PrimaryButton variant="secondary" onClick={onBackToMap}>
          지도로 돌아가기
        </PrimaryButton>
      </div>
    </section>
  );
}
