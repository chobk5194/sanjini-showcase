import type { Quest } from "@/lib/types";

type RecordTabProps = {
  quests: Quest[];
  completedQuestIds: string[];
  xpTotal: number;
  streakCount: number;
};

export function RecordTab({
  quests,
  completedQuestIds,
  xpTotal,
  streakCount
}: RecordTabProps) {
  const completedQuests = completedQuestIds
    .map((id) => quests.find((quest) => quest.id === id))
    .filter((quest): quest is Quest => Boolean(quest));

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-[1.45rem] border border-white/80 bg-white/94 p-4 text-center shadow-panel">
          <p className="text-[11px] font-bold tracking-[0.16em] text-adventure-blue/70">완료</p>
          <p className="mt-2 text-xl font-black text-adventure-navy">{completedQuestIds.length}</p>
        </div>
        <div className="rounded-[1.45rem] border border-white/80 bg-white/94 p-4 text-center shadow-panel">
          <p className="text-[11px] font-bold tracking-[0.16em] text-adventure-blue/70">XP</p>
          <p className="mt-2 text-xl font-black text-adventure-navy">{xpTotal}</p>
        </div>
        <div className="rounded-[1.45rem] border border-white/80 bg-white/94 p-4 text-center shadow-panel">
          <p className="text-[11px] font-bold tracking-[0.16em] text-adventure-blue/70">연속</p>
          <p className="mt-2 text-xl font-black text-adventure-navy">{streakCount}일</p>
        </div>
      </div>

      <div className="rounded-[1.8rem] border border-white/80 bg-white/95 p-5 shadow-panel">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold tracking-[0.16em] text-adventure-blue/70">기록 타임라인</p>
            <h2 className="mt-1 text-xl font-black text-adventure-navy">오늘의 활동 로그</h2>
          </div>
          <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-adventure-blue">
            {completedQuests.length > 0 ? "업데이트됨" : "대기 중"}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {completedQuests.length > 0 ? (
            completedQuests.map((quest, index) => (
              <article
                key={quest.id}
                className="rounded-[1.45rem] border border-sky-100 bg-sky-50/80 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black text-adventure-blue/70">완료 기록 {index + 1}</p>
                    <h3 className="mt-1 text-base font-black text-adventure-navy">{quest.title}</h3>
                    <p className="mt-2 text-sm font-bold leading-6 text-adventure-blue/80">
                      {quest.locationLabel}에서 활동을 완료했고 XP +{quest.xpReward}를 획득했다.
                    </p>
                  </div>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-black text-adventure-blue shadow-sm">
                    {quest.category}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[1.45rem] border border-dashed border-sky-200 bg-sky-50/70 p-5 text-sm font-bold leading-6 text-adventure-blue/75">
              아직 오늘의 로그가 비어 있어. 지도로 이동해 첫 번째 미션을 완료하면 기록이 타임라인처럼 쌓이기 시작한다.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
