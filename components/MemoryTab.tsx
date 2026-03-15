import type { Quest } from "@/lib/types";

type MemoryTabProps = {
  quests: Quest[];
  completedQuestIds: string[];
};

export function MemoryTab({
  quests,
  completedQuestIds
}: MemoryTabProps) {
  return (
    <section className="space-y-4">
      <div className="rounded-[1.8rem] border border-white/80 bg-white/95 p-5 shadow-panel">
        <p className="text-[11px] font-bold tracking-[0.16em] text-adventure-blue/70">추억 보관함</p>
        <h2 className="mt-1 text-xl font-black text-adventure-navy">캠퍼스 스크랩</h2>
        <p className="mt-2 text-sm font-bold leading-6 text-adventure-blue/80">
          완료한 미션은 추억 카드로 남고, 아직 가지 못한 장소는 잠긴 상태로 기다린다.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {quests.map((quest) => {
          const isCompleted = completedQuestIds.includes(quest.id);
          return (
            <article
              key={quest.id}
              className={[
                "relative overflow-hidden rounded-[1.7rem] border p-4 shadow-panel transition",
                isCompleted
                  ? "border-white/80 bg-white/95"
                  : "border-white/60 bg-white/65 opacity-65"
              ].join(" ")}
            >
              <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(73,176,255,0.22),transparent)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <div className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-black text-adventure-blue">
                    {quest.locationLabel}
                  </div>
                  <div
                    className={[
                      "rounded-full px-2.5 py-1 text-[11px] font-black",
                      isCompleted ? "bg-adventure-yellow/85 text-adventure-navy" : "bg-white/80 text-adventure-blue/70"
                    ].join(" ")}
                  >
                    {isCompleted ? "보관 완료" : "잠금"}
                  </div>
                </div>
                <h3 className="mt-4 text-base font-black text-adventure-navy">{quest.memoryTitle}</h3>
                <p className="mt-2 text-sm font-bold leading-6 text-adventure-blue/80">
                  {isCompleted
                    ? quest.memoryDescription
                    : "아직 이 장소의 추억은 비어 있어. 오늘의 미션을 완료하면 이 카드가 열릴 거야."}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
