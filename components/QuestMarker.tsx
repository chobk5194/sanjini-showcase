import type { Quest } from "@/lib/types";

type QuestMarkerProps = {
  quest: Quest;
  isCompleted: boolean;
  isDisabled?: boolean;
  onSelect: (quest: Quest) => void;
};

export function QuestMarker({
  quest,
  isCompleted,
  isDisabled = false,
  onSelect
}: QuestMarkerProps) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: quest.markerPosition.top, left: quest.markerPosition.left }}
    >
      <button
        type="button"
        onClick={() => onSelect(quest)}
        disabled={isDisabled || isCompleted}
        className="group relative flex flex-col items-center disabled:cursor-not-allowed"
        aria-label={`${quest.locationLabel} 퀘스트 열기`}
      >
        <span className="absolute inset-0 h-12 w-12 rounded-full bg-red-400/55 motion-safe:animate-[marker-pulse_1.8s_ease-out_infinite]" />
        <span
          className={[
            "relative flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-white text-2xl font-black text-white shadow-[0_10px_20px_rgba(255,93,93,0.38)] transition",
            isCompleted ? "bg-adventure-blue/55" : "bg-red-500 group-hover:scale-105",
            isDisabled && !isCompleted ? "bg-red-300/70" : ""
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {isCompleted ? "✓" : "!"}
        </span>
        <span
          className={[
            "mt-2 rounded-full px-3 py-1 text-xs font-black shadow-sm",
            isCompleted
              ? "bg-adventure-yellow/90 text-adventure-navy"
              : "bg-white/92 text-adventure-navy"
          ].join(" ")}
        >
          {quest.locationLabel}
        </span>
      </button>
    </div>
  );
}
