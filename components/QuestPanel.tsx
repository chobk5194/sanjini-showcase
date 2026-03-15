import { PrimaryButton } from "@/components/PrimaryButton";
import type { Quest } from "@/lib/types";

type QuestPanelProps = {
  quest: Quest;
  onComplete: () => void;
  onClose: () => void;
};

export function QuestPanel({
  quest,
  onComplete,
  onClose
}: QuestPanelProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 p-2.5 sm:p-3">
      <div className="rounded-[1.8rem] border border-white/85 bg-white/98 p-4 shadow-[0_-18px_40px_rgba(24,58,102,0.2)] backdrop-blur-sm">
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-sky-100" />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-[11px] font-black text-adventure-blue">
              {quest.locationLabel}
            </div>
            <div className="inline-flex rounded-full bg-adventure-cream px-3 py-1 text-[11px] font-black text-adventure-navy">
              +{quest.xpReward} XP
            </div>
          </div>
          <h3 className="mt-3 text-[1.35rem] font-black leading-tight text-adventure-navy">
            {quest.title}
          </h3>
          <p className="mt-2 text-sm font-bold leading-6 text-adventure-blue/80">
            {quest.description}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 rounded-[1.4rem] bg-adventure-cream p-3">
          <div className="rounded-[1rem] bg-white/78 px-3 py-2">
            <p className="text-[10px] font-black tracking-[0.12em] text-adventure-blue/70">오늘의 위치</p>
            <p className="mt-1 text-sm font-black text-adventure-navy">{quest.locationLabel}</p>
          </div>
          <div className="rounded-[1rem] bg-white/78 px-3 py-2">
            <p className="text-[10px] font-black tracking-[0.12em] text-adventure-blue/70">완료 보상</p>
            <p className="mt-1 text-sm font-black text-adventure-navy">+{quest.xpReward} XP</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-[1fr_6rem] gap-2">
          <PrimaryButton size="compact" onClick={onComplete}>
            퀘스트 완료
          </PrimaryButton>
          <PrimaryButton size="compact" variant="secondary" onClick={onClose}>
            닫기
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
