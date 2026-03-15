const cloudClassName =
  "absolute rounded-full bg-white/45 blur-2xl motion-safe:animate-[float-cloud_8s_ease-in-out_infinite]";

export function BackgroundDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.72),transparent_60%)]" />
      <div className={`${cloudClassName} left-[-3rem] top-16 h-28 w-28`} />
      <div className={`${cloudClassName} right-[-2rem] top-28 h-24 w-40 [animation-delay:-3s]`} />
      <div className="absolute left-8 top-24 h-16 w-16 rounded-[2rem] bg-adventure-yellow/45 blur-xl" />
      <div className="absolute bottom-24 right-6 h-20 w-20 rounded-full bg-sky-200/80 blur-xl" />
      <div className="absolute left-[-4rem] bottom-20 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute right-[-5rem] bottom-8 h-52 w-52 rounded-full bg-adventure-yellow/20 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.36),transparent_65%)]" />
    </div>
  );
}
