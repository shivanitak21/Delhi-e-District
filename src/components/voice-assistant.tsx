import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Mic, MicOff, PhoneOff, Play, X, Languages, AudioLines, ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLiveVoice, type LiveEvent } from "@/hooks/use-live-voice";
import { voiceLanguages } from "@/lib/voice-languages";

type Caption = { role: string; text: string; start: number; end: number };
type Suggestion = { slug: string; name: string; department: string };

export function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState("");
  const [seconds, setSeconds] = useState<number | null>(null);
  const pathname = useLocation({ select: (location) => location.pathname });
  function onEvent(event: LiveEvent) {
    if ((event.type === "session.input_transcript.delta" || event.type === "session.output_transcript.delta") && typeof event["delta"] === "string") {
      const role = event.type === "session.input_transcript.delta" ? "You" : "Assistant";
      const text = event["delta"];
      const start = typeof event["start_ms"] === "number" ? event["start_ms"] : 0;
      const end = typeof event["end_ms"] === "number" ? event["end_ms"] : start;
      setCaptions((previous) => {
        const next = [...previous];
        let index = next.findIndex((row) => row.role === role && start <= row.end + 1200 && end >= row.start);
        if (index < 0) { next.push({ role, text, start, end }); }
        else { const row = next[index]; if (row) next[index] = { ...row, text: row.text + text, start: Math.min(row.start, start), end: Math.max(row.end, end) }; }
        return next;
      });
    }
    if (event.type === "app.delegation.pending") { setPending(true); setSuggestions([]); }
    if (event.type === "app.services.result" && Array.isArray(event["plan"])) {
      setSuggestions(event["plan"].filter((item): item is Suggestion => !!item && typeof item === "object" && typeof item.slug === "string" && typeof item.name === "string" && typeof item.department === "string"));
      setPending(false);
    }
    if (event.type === "session.output_transcript.delta" || event.type === "app.closed") setPending(false);
    if (event.type === "app.greeting.error") setNotice("The greeting couldn’t start. You can still speak to the assistant.");
    if (event.type === "app.guidance.error") { setPending(false); setNotice(event.error?.message ?? "Service guidance is unavailable."); }
    if ((event.type === "session.usage.updated" || event.type === "session.closed") && typeof event.usage?.seconds === "number") setSeconds(Math.max(15, event.usage.seconds));
  }
  const voice = useLiveVoice({ url: `/api/live?language=${language}`, onEvent });
  const canStart = voice.status === "idle" || voice.status === "closed";
  useEffect(() => { voice.stop(); }, [pathname, voice.stop]);
  const close = () => { voice.stop(); setOpen(false); };
  return (
    <div className="fixed bottom-5 right-5 z-[60] max-w-[calc(100vw-40px)]">
      <section hidden={!open} className="mb-3 w-[360px] max-w-[calc(100vw-40px)] overflow-hidden rounded-[20px] border bg-background shadow-xl" aria-label="AI voice assistant">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div><h2 className="flex items-center gap-2 text-base font-semibold"><AudioLines className="size-5 text-accent-foreground" />AI voice assistant</h2><p className="mt-0.5 text-xs text-muted-foreground">Delhi e-District</p></div>
          <Button variant="ghost" size="icon" aria-label="Close voice assistant" onClick={close}><X /></Button>
        </div>
        <div className="max-h-[calc(100dvh-240px)] space-y-4 overflow-y-auto p-5">
          <label className="block text-xs font-medium" htmlFor="voice-language"><span className="mb-2 flex items-center gap-1.5"><Languages className="size-4" />Language</span>
            <select id="voice-language" value={language} disabled={!canStart} onChange={(event) => setLanguage(event.target.value)} className="h-11 w-full rounded-xl border bg-background px-3 text-sm text-foreground disabled:opacity-60">
              {voiceLanguages.map((entry) => <option key={entry.code} value={entry.code}>{entry.label} · {entry.name}</option>)}
            </select>
          </label>
          <div className="flex flex-col items-center gap-3 py-2">
            <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-accent-foreground"><AudioLines className={`size-7 ${voice.status === "connected" ? "motion-safe:animate-pulse" : ""}`} /></span>
            <p role="status" className="text-sm text-muted-foreground">{voice.status === "connecting" ? "Connecting…" : voice.status === "connected" ? voice.muted ? "Microphone muted" : pending ? "Checking services…" : "Listening" : voice.status === "stopping" ? "Ending call…" : voice.status === "closed" ? "Call ended" : "Ready when you are"}</p>
          </div>
          {voice.error && <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-xs text-destructive">{voice.error}</p>}
          {notice && <p className="text-xs text-muted-foreground">{notice}</p>}
          {captions.length > 0 && <div className="max-h-40 space-y-3 overflow-y-auto border-y py-3" aria-label="Conversation captions" aria-live="polite">{captions.map((caption, index) => <div key={index}><p className="text-[10px] font-semibold text-muted-foreground">{caption.role}</p><p className="mt-1 text-sm leading-relaxed">{caption.text}</p></div>)}</div>}
          {suggestions.map((item) => <Button key={item.slug} variant="secondary" asChild className="h-auto w-full justify-between whitespace-normal rounded-lg px-3 py-3 text-left"><Link to="/services/$slug" params={{ slug: item.slug }} onClick={close}><span><span className="block text-xs font-semibold">{item.name}</span><span className="mt-1 block text-[10px] font-normal text-muted-foreground">{item.department}</span></span><ArrowUpRight /></Link></Button>)}
          <audio ref={voice.audioRef} controls className="h-8 w-full" aria-label="Assistant audio" />
          <div className="flex gap-2">
            {canStart ? <Button className="w-full" onClick={() => { setCaptions([]); setSuggestions([]); setNotice(""); setSeconds(null); voice.start(); }}><Mic />Start conversation</Button> : <><Button variant="outline" size="icon" aria-label={voice.muted ? "Unmute microphone" : "Mute microphone"} disabled={voice.status !== "connected"} onClick={() => voice.setMuted(!voice.muted)}>{voice.muted ? <MicOff /> : <Mic />}</Button><Button className="flex-1" disabled={voice.status === "stopping"} onClick={voice.stop}>{voice.status === "stopping" ? <Loader2 className="animate-spin" /> : <PhoneOff />}End call</Button></>}
          </div>
          {voice.playbackBlocked && <Button variant="secondary" className="w-full" onClick={voice.resumePlayback}><Play />Play assistant audio</Button>}
          <p className="text-[11px] leading-relaxed text-muted-foreground">AI guidance · prototype data. Officers decide eligibility. Don’t share passwords, OTPs or identity numbers.</p>
          {seconds !== null && <p className="text-[10px] text-muted-foreground">Voice usage: {Math.ceil(seconds)} seconds{voice.finalized === false ? " · final usage unconfirmed" : ""}</p>}
        </div>
      </section>
      <div className="flex justify-end"><Button className="h-12 gap-2 px-5 shadow-lg" aria-expanded={open} onClick={() => open ? close() : setOpen(true)}><Mic />Voice assistant</Button></div>
    </div>
  );
}