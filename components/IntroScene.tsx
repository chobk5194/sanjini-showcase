import { DialogueBox } from "@/components/DialogueBox";
import { SanjiniCharacter } from "@/components/SanjiniCharacter";

type IntroSceneProps = {
  dialogue: string;
  dialogueIndex: number;
  dialogueCount: number;
  isLastDialogue: boolean;
  onAdvance: () => void;
  onOpenMap: () => void;
};

export function IntroScene({
  dialogue,
  dialogueIndex,
  dialogueCount,
  isLastDialogue,
  onAdvance,
  onOpenMap
}: IntroSceneProps) {
  return (
    <section className="relative flex h-full flex-col justify-between gap-6">
      <div className="space-y-3">
        <div className="inline-flex rounded-full bg-white/75 px-4 py-2 text-xs font-black text-adventure-blue shadow-sm">
          캠퍼스 미션 어드벤처
        </div>
        <div className="space-y-2">
          <h1 className="font-display text-[2.15rem] leading-none text-white drop-shadow-[0_4px_0_rgba(24,58,102,0.22)]">
            산지니 원정대
          </h1>
          <p className="max-w-xs text-sm font-bold leading-6 text-white/95">
            산지니와 함께 오늘의 캠퍼스 모험을 시작해 보자.
          </p>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center py-3">
        <div className="absolute inset-x-4 top-4 h-44 rounded-full bg-white/20 blur-3xl" />
        <SanjiniCharacter variant="guide" />
      </div>

      <DialogueBox
        text={dialogue}
        actionLabel={isLastDialogue ? "지도 열기" : "다음"}
        onAction={isLastDialogue ? onOpenMap : onAdvance}
        stepLabel={`대화 ${dialogueIndex + 1} / ${dialogueCount}`}
      />
    </section>
  );
}
