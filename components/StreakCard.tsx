type StreakCardProps = {
  streakCount: number;
};

export function StreakCard({
  streakCount
}: StreakCardProps) {
  return (
    <div className="rounded-[1.7rem] border border-yellow-200/80 bg-[linear-gradient(180deg,#fff7df,#fff1b8)] p-4 shadow-panel">
      <div className="inline-flex rounded-full bg-white/75 px-3 py-1 text-xs font-black text-adventure-navy">
        연속 기록 달성
      </div>
      <p className="mt-4 text-lg font-black text-adventure-navy">오늘도 모험 성공!</p>
      <p className="mt-2 text-sm font-bold leading-6 text-adventure-blue/85">
        연속 기록이 이어지고 있어. 첫 완료 보상으로 스트릭도 함께 올랐어.
      </p>
      <div className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-center text-[1.15rem] font-black text-adventure-navy shadow-sm">
        연속 {streakCount}일 달성
      </div>
    </div>
  );
}
