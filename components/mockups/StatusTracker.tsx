import { orderStatusFlow } from "@/lib/demo-data";
import { CheckIcon } from "@/components/ui/icons";

type StatusTrackerProps = {
  current: number;
  orientation?: "vertical" | "horizontal";
  tone?: "light" | "dark";
  className?: string;
};

export function StatusTracker({
  current,
  orientation = "vertical",
  tone = "light",
  className = "",
}: StatusTrackerProps) {
  const muted = tone === "light" ? "bg-pumice text-obsidian/50" : "bg-chalk/15 text-chalk/50";
  const lineIdle = tone === "light" ? "bg-obsidian/15" : "bg-chalk/20";

  if (orientation === "horizontal") {
    return (
      <ol className={`grid grid-cols-4 gap-1.5 ${className}`}>
        {orderStatusFlow.map((step, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={step.id} aria-current={active ? "step" : undefined} className="min-w-0">
              <span
                className={`block h-1.5 rounded-pill transition-colors duration-500 ${
                  done || active ? "bg-ember" : lineIdle
                }`}
              />
              <span
                className={`mt-1.5 block truncate text-[0.625rem] leading-tight transition-opacity duration-500 ${
                  active ? "opacity-100" : "opacity-55"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={`flex flex-col ${className}`}>
      {orderStatusFlow.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const last = i === orderStatusFlow.length - 1;
        return (
          <li key={step.id} aria-current={active ? "step" : undefined} className="relative flex gap-3 pb-3 last:pb-0">
            {!last ? (
              <span
                aria-hidden="true"
                className={`absolute left-[0.6875rem] top-6 h-[calc(100%-1.5rem)] w-[1.5px] transition-colors duration-500 ${
                  done ? "bg-ember" : lineIdle
                }`}
              />
            ) : null}
            <span
              aria-hidden="true"
              className={`relative z-[1] grid size-[1.375rem] shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                done
                  ? "bg-ember text-obsidian"
                  : active
                    ? "bg-ember text-obsidian ring-4 ring-ember/25"
                    : muted
              }`}
            >
              {done ? <CheckIcon className="size-3" /> : <span className="size-1.5 rounded-full bg-current" />}
            </span>
            <span className="min-w-0 pt-px">
              <span className={`block text-[0.8125rem] leading-tight ${active || done ? "" : "opacity-55"}`}>
                {step.label}
                <span className="sr-only">{done ? " (completado)" : active ? " (estado actual)" : " (pendiente)"}</span>
              </span>
              {active ? <span className="mt-0.5 block text-[0.6875rem] leading-snug opacity-65">{step.hint}</span> : null}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
