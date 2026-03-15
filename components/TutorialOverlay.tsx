import { DialogueBox } from "@/components/DialogueBox";
import { SanjiniCharacter } from "@/components/SanjiniCharacter";

type TutorialOverlayProps = {
  dialogue: string;
  dialogueIndex: number;
  dialogueCount: number;
  isLastDialogue: boolean;
  onAdvance: () => void;
};

export function TutorialOverlay({
  dialogue,
  dialogueIndex,
  dialogueCount,
  isLastDialogue,
  onAdvance
}: TutorialOverlayProps) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-between bg-[rgba(8,20,42,0.34)] p-4 backdrop-blur-[2px]">
      <div className="inline-flex w-fit rounded-full bg-white/84 px-3 py-1 text-[11px] font-black text-adventure-blue shadow-sm">
        처음 탐험 가이드
      </div>
      <div className="relative flex flex-1 items-end justify-end pt-10">
        <div className="absolute inset-x-0 bottom-0 top-10 rounded-[2rem] bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.25),transparent_55%)]" />
        <SanjiniCharacter className="max-w-[12rem] sm:max-w-[13.5rem]" variant="guide" />
      </div>
      <DialogueBox
        text={dialogue}
        actionLabel={isLastDialogue ? "퀘스트 시작" : "다음"}
        onAction={onAdvance}
        stepLabel={`대화 ${dialogueIndex + 1} / ${dialogueCount}`}
        className="relative z-10"
      />
    </div>
  );
}
