import type { StepResult } from "@/lib/playground/types";
import type {
  FreeformStepBody,
  ScenarioRunBody,
} from "@/lib/playground/schemas";

export async function bootstrapSession(): Promise<void> {
  const res = await fetch("/api/playground/session", { method: "POST" });
  if (!res.ok) throw new Error(`session bootstrap failed: ${res.status}`);
}

export async function destroySession(): Promise<void> {
  await fetch("/api/playground/session", { method: "DELETE" });
}

export async function* runScenario(
  body: ScenarioRunBody,
  signal?: AbortSignal,
): AsyncGenerator<StepResult> {
  const res = await fetch("/api/playground/scenarios/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  if (res.status === 401) {
    // No / expired session — bootstrap and retry once.
    await bootstrapSession();
    yield* runScenario(body, signal);
    return;
  }
  if (!res.ok || !res.body) {
    throw new Error(`scenario run failed: ${res.status}`);
  }
  for await (const event of readNdjson<StepResult>(res.body)) {
    yield event;
  }
}

export async function freeformStep(body: FreeformStepBody) {
  const res = await fetch("/api/playground/freeform/step", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    await bootstrapSession();
    return freeformStep(body);
  }
  if (!res.ok) {
    const j = await res.json().catch(() => ({}));
    throw new Error(j.error ?? `freeform step failed: ${res.status}`);
  }
  return res.json();
}

export async function resetFreeform(): Promise<void> {
  await fetch("/api/playground/freeform/reset", { method: "POST" });
}

async function* readNdjson<T>(
  body: ReadableStream<Uint8Array>,
): AsyncGenerator<T> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    let nl = buf.indexOf("\n");
    while (nl >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (line.length > 0) {
        try {
          yield JSON.parse(line) as T;
        } catch {
          // skip malformed line
        }
      }
      nl = buf.indexOf("\n");
    }
  }
  const tail = buf.trim();
  if (tail) {
    try {
      yield JSON.parse(tail) as T;
    } catch {
      // ignore
    }
  }
}
