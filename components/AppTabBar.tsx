import type { AppTab } from "@/lib/types";

type AppTabBarProps = {
  currentTab: AppTab;
  onChange: (tab: AppTab) => void;
  disabled?: boolean;
};

const tabs: { id: AppTab; label: string; chip: string }[] = [
  { id: "home", label: "홈", chip: "오늘" },
  { id: "map", label: "지도", chip: "미션" },
  { id: "record", label: "기록", chip: "로그" },
  { id: "memory", label: "추억", chip: "보관" }
];

export function AppTabBar({
  currentTab,
  onChange,
  disabled = false
}: AppTabBarProps) {
  return (
    <nav className="rounded-[1.7rem] border border-white/80 bg-white/92 p-2 shadow-panel backdrop-blur-sm">
      <ul className="grid grid-cols-4 gap-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <li key={tab.id}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(tab.id)}
                className={[
                  "flex w-full flex-col items-center gap-1 rounded-[1.15rem] px-2 py-2.5 text-center transition disabled:cursor-not-allowed disabled:opacity-55",
                  isActive ? "bg-adventure-blue text-white shadow-[0_10px_18px_rgba(43,101,177,0.24)]" : "text-adventure-blue/75 hover:bg-sky-50"
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex min-w-[2.8rem] justify-center rounded-full px-2 py-1 text-[10px] font-black tracking-[0.12em]",
                    isActive ? "bg-white/20 text-white" : "bg-sky-100 text-adventure-blue"
                  ].join(" ")}
                >
                  {tab.chip}
                </span>
                <span className="text-sm font-black">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
