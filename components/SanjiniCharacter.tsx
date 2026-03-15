import Image from "next/image";

import type { CharacterVariant } from "@/lib/types";

type SanjiniCharacterProps = {
  variant?: CharacterVariant;
  className?: string;
};

export function SanjiniCharacter({
  variant = "guide",
  className
}: SanjiniCharacterProps) {
  const isCelebrate = variant === "celebrate";

  return (
    <div
      className={[
        "relative mx-auto w-full max-w-[14rem]",
        isCelebrate ? "motion-safe:animate-[character-bob_3.1s_ease-in-out_infinite]" : "motion-safe:animate-[character-bob_4.4s_ease-in-out_infinite]",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="absolute inset-x-8 top-8 h-12 rounded-full bg-adventure-yellow/30 blur-2xl" />
      <div className="absolute inset-x-4 bottom-4 h-8 rounded-full bg-adventure-navy/15 blur-xl" />
      <Image
        src="/images/main-character.png"
        alt="산지니 캐릭터"
        width={480}
        height={480}
        priority
        className="relative z-10 h-auto w-full drop-shadow-[0_20px_30px_rgba(24,58,102,0.18)]"
      />
      <div className="absolute left-2 top-6 rounded-full bg-white/88 px-3 py-1 text-[11px] font-black text-adventure-blue shadow-panel">
        {isCelebrate ? "축하할 준비 완료" : "오늘의 가이드"}
      </div>
      {isCelebrate ? (
        <div className="absolute right-1 top-10 rounded-full bg-adventure-yellow px-3 py-1 text-[11px] font-black text-adventure-navy shadow-panel">
          미션 성공
        </div>
      ) : null}
      <span className="absolute right-5 top-12 text-xl text-adventure-yellow motion-safe:animate-[sparkle_2.4s_ease-in-out_infinite]">
        ✦
      </span>
      <span className="absolute left-4 bottom-20 text-lg text-white motion-safe:animate-[sparkle_2s_ease-in-out_infinite]">
        ✦
      </span>
    </div>
  );
}
