"use client";

import { useEffect, useState } from "react";

import { PrimaryButton } from "@/components/PrimaryButton";

type DialogueBoxProps = {
  text: string;
  actionLabel: string;
  onAction: () => void;
  stepLabel: string;
  badgeLabel?: string;
  className?: string;
};

export function DialogueBox({
  text,
  actionLabel,
  onAction,
  stepLabel,
  badgeLabel = "산지니 가이드",
  className
}: DialogueBoxProps) {
  const [visibleText, setVisibleText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    setVisibleText("");
    setIsTyping(true);

    const timer = window.setInterval(() => {
      index += 1;
      setVisibleText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
        setIsTyping(false);
      }
    }, 24);

    return () => {
      window.clearInterval(timer);
    };
  }, [text]);

  const handleAction = () => {
    if (isTyping) {
      setVisibleText(text);
      setIsTyping(false);
      return;
    }

    onAction();
  };

  return (
    <div
      className={[
        "rounded-[1.75rem] border border-white/70 bg-white/96 p-5 shadow-game backdrop-blur-sm",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold tracking-[0.18em] text-adventure-blue/70">대화</p>
          <p className="mt-1 text-sm font-black text-adventure-navy">{stepLabel}</p>
        </div>
        <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-black text-adventure-blue">
          {badgeLabel}
        </div>
      </div>
      <p className="min-h-[6.75rem] whitespace-pre-line text-[1.08rem] font-black leading-relaxed text-adventure-navy">
        {visibleText}
        {isTyping ? <span className="ml-0.5 inline-block text-adventure-coral">|</span> : null}
      </p>
      <div className="mt-5">
        <PrimaryButton onClick={handleAction}>{actionLabel}</PrimaryButton>
      </div>
    </div>
  );
}
