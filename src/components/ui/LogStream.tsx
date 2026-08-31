import { agentTranscript, profileLog } from "@/lib/data";

function toLines(variant: "profile" | "transcript") {
  if (variant === "profile") return profileLog;
  return agentTranscript.flatMap((t) => {
    if (t.role === "user") return ["", `❯ ${t.text}`, ""];
    if (t.role === "think") return [`  ${t.text}`];
    if (t.role === "tool") return [`  · ${t.text}`];
    if (t.role === "done") return ["", `  ✓ ${t.text}`, ""];
    return [`  ${t.text}`, ""];
  });
}

export function LogStream({
  variant = "profile",
  className = "",
  duration = 62,
}: {
  variant?: "profile" | "transcript";
  className?: string;
  duration?: number;
}) {
  const base = toLines(variant);
  const lines = [...base, ...base];

  return (
    <div
      aria-hidden
      className={`log-stream pointer-events-none absolute overflow-hidden ${className}`}
    >
      <div
        className="log-track mono space-y-[5px] text-[11px] leading-[1.7] text-ink-4 sm:text-[11.5px]"
        style={{ ["--log-duration" as string]: `${duration}s` }}
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              variant === "transcript"
                ? "whitespace-pre-wrap break-words pr-4"
                : "whitespace-pre"
            }
          >
            {line || " "}
          </p>
        ))}
      </div>
    </div>
  );
}
