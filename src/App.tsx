import { useState } from "react";
import {
  Sparkles,
  Clipboard,
  ClipboardCheck,
  UtensilsCrossed,
  Stethoscope,
  Scissors,
  ShoppingBag,
  Star,
  Wand2,
  Check,
  MessageSquareQuote,
  RefreshCw,
  Smile,
  HeartHandshake,
  Zap,
  ShieldCheck,
} from "lucide-react";
import {
  generateReply,
  type BusinessType,
  type Tone,
} from "@/lib/generateReply";

const businessOptions: {
  value: BusinessType;
  label: string;
  icon: typeof UtensilsCrossed;
}[] = [
  { value: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { value: "clinic", label: "Doctor / Clinic", icon: Stethoscope },
  { value: "salon", label: "Salon / Spa", icon: Scissors },
  { value: "retail", label: "Retail Store", icon: ShoppingBag },
];

const toneOptions: {
  value: Tone;
  label: string;
  subtitle: string;
  icon: typeof Smile;
}[] = [
  { value: "happy", label: "Happy / Polite", subtitle: "For 4–5 star reviews", icon: Smile },
  { value: "apologetic", label: "Apologetic / Professional", subtitle: "For 1–3 star reviews", icon: HeartHandshake },
];

interface ReplyRecord {
  id: number;
  reply: string;
  businessType: BusinessType;
  tone: Tone;
  rating: number;
  timestamp: number;
}

function App() {
  const [review, setReview] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType>("restaurant");
  const [tone, setTone] = useState<Tone>("happy");
  const [rating, setRating] = useState(5);
  const [reply, setReply] = useState("");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<ReplyRecord[]>([]);

  const handleGenerate = () => {
    if (!review.trim()) return;
    setGenerating(true);
    setReply("");
    setCopied(false);
    setTimeout(() => {
      const result = generateReply({ review, businessType, tone, rating });
      setReply(result);
      setGenerating(false);
      setHistory((prev) => [
        {
          id: Date.now(),
          reply: result,
          businessType,
          tone,
          rating,
          timestamp: Date.now(),
        },
        ...prev,
      ].slice(0, 5));
    }, 700);
  };

  const handleRegenerate = () => {
    if (!review.trim()) return;
    setGenerating(true);
    setCopied(false);
    setTimeout(() => {
      const result = generateReply({ review, businessType, tone, rating });
      setReply(result);
      setGenerating(false);
      setHistory((prev) => [
        {
          id: Date.now(),
          reply: result,
          businessType,
          tone,
          rating,
          timestamp: Date.now(),
        },
        ...prev,
      ].slice(0, 5));
    }, 700);
  };

  const handleCopy = async () => {
    if (!reply) return;
    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleClear = () => {
    setReview("");
    setReply("");
    setCopied(false);
  };

  const charCount = review.length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Decorative background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-teal-200/20 blur-3xl" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl shadow-lg shadow-emerald-300/40">
                <span role="img" aria-label="shop">
                  🏪
                </span>
              </div>
              <div>
                <h1 className="font-display text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  LocalReview AI
                </h1>
                <p className="hidden text-xs text-slate-500 sm:block">
                  Smart AI replies for Google reviews
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              AI Online
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 sm:pt-14">
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-semibold text-emerald-700">
              <Sparkles className="h-3.5 w-3.5" />
              Reply to reviews in seconds
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Turn Google reviews into
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {" "}perfect replies
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500 sm:text-base">
              Paste any customer review, pick your business type and tone, and get a
              ready-to-send reply instantly.
            </p>
          </div>
        </section>

        {/* Main content */}
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Left: Form */}
            <div className="space-y-5 lg:col-span-3">
              {/* Review input card */}
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 sm:p-6">
                <div className="mb-3 flex items-center justify-between">
                  <label
                    htmlFor="review"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                  >
                    <MessageSquareQuote className="h-4 w-4 text-emerald-500" />
                    Customer's Google review
                  </label>
                  {review.trim() && (
                    <button
                      onClick={handleClear}
                      className="text-xs font-medium text-slate-400 transition hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Paste the customer's review here…"
                  rows={5}
                  className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm leading-relaxed text-slate-800 transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-100/50"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>{charCount} characters</span>
                  <span>{review.trim() ? "Ready to generate" : "Paste a review to begin"}</span>
                </div>

                {/* Rating */}
                <div className="mt-5">
                  <span className="mb-2.5 block text-sm font-semibold text-slate-700">
                    Star rating
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        className="rounded-xl p-1.5 transition hover:scale-110 active:scale-95"
                        aria-label={`${n} star${n > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={`h-7 w-7 transition-all duration-200 ${
                            n <= rating
                              ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                              : "fill-slate-100 text-slate-300"
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                      {rating} / 5
                    </span>
                  </div>
                </div>
              </section>

              {/* Business type card */}
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 sm:p-6">
                <span className="mb-3 block text-sm font-semibold text-slate-700">
                  Business type
                </span>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {businessOptions.map((opt) => {
                    const Icon = opt.icon;
                    const active = businessType === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setBusinessType(opt.value)}
                        className={`group flex flex-col items-center gap-2.5 rounded-2xl border p-4 text-center transition-all duration-200 ${
                          active
                            ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                            active
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={`text-xs font-medium sm:text-sm ${
                            active ? "text-emerald-700" : "text-slate-600"
                          }`}
                        >
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Tone selector card */}
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 sm:p-6">
                <span className="mb-3 block text-sm font-semibold text-slate-700">
                  Reply tone
                </span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {toneOptions.map((opt) => {
                    const Icon = opt.icon;
                    const active = tone === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setTone(opt.value)}
                        className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 ${
                          active
                            ? "border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <div
                          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition ${
                            active
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <div>
                          <p
                            className={`text-sm font-semibold ${
                              active ? "text-emerald-700" : "text-slate-700"
                            }`}
                          >
                            {opt.label}
                          </p>
                          <p className="text-xs text-slate-500">{opt.subtitle}</p>
                        </div>
                        {active && (
                          <Check className="ml-auto h-4 w-4 flex-shrink-0 text-emerald-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Generate button */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!review.trim() || generating}
                className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-emerald-300/40 transition-all duration-200 hover:shadow-2xl hover:shadow-emerald-300/50 hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:bg-none disabled:shadow-none disabled:hover:brightness-100"
              >
                {generating ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-spin" />
                    Generating your reply…
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5 transition group-hover:rotate-12" />
                    Generate Smart Reply
                  </>
                )}
              </button>
            </div>

            {/* Right: Results + sidebar */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-20">
                {/* Results card */}
                {reply && !generating ? (
                  <section className="animate-scale-in rounded-3xl border border-emerald-200 bg-white p-5 shadow-lg shadow-emerald-100/40 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
                          <Sparkles className="h-4 w-4 text-emerald-600" />
                        </span>
                        AI Reply
                      </h2>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleRegenerate}
                          className="flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-200"
                          title="Generate a new version"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          Retry
                        </button>
                        <button
                          type="button"
                          onClick={handleCopy}
                          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                            copied
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-emerald-500 text-white hover:bg-emerald-600"
                          }`}
                        >
                          {copied ? (
                            <>
                              <ClipboardCheck className="h-3.5 w-3.5" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Clipboard className="h-3.5 w-3.5" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="whitespace-pre-wrap rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/30 p-4 text-sm leading-relaxed text-slate-700">
                      {reply}
                    </div>
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
                      <ShieldCheck className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                      Review and personalize before posting to Google.
                    </div>
                  </section>
                ) : generating ? (
                  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="relative mb-4">
                        <div className="h-14 w-14 rounded-full border-4 border-emerald-100" />
                        <div className="absolute inset-0 h-14 w-14 animate-spin rounded-full border-4 border-transparent border-t-emerald-500" />
                      </div>
                      <p className="text-sm font-medium text-slate-500">
                        Crafting the perfect reply…
                      </p>
                    </div>
                    <div className="space-y-2.5">
                      <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
                      <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
                      <div className="h-3 w-4/6 animate-pulse rounded bg-slate-100" />
                    </div>
                  </section>
                ) : (
                  <section className="rounded-3xl border border-dashed border-slate-300 bg-white/50 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                      <Wand2 className="h-7 w-7 text-slate-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-600">
                      Your reply will appear here
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Paste a review and tap "Generate Smart Reply"
                    </p>
                  </section>
                )}

                {/* History */}
                {history.length > 0 && (
                  <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="mb-3 text-sm font-semibold text-slate-700">
                      Recent replies
                    </h3>
                    <div className="space-y-2">
                      {history.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setReply(item.reply);
                            setBusinessType(item.businessType);
                            setTone(item.tone);
                            setRating(item.rating);
                            setCopied(false);
                          }}
                          className="w-full rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-left transition hover:border-emerald-200 hover:bg-emerald-50/30"
                        >
                          <div className="mb-1 flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((n) => (
                                <Star
                                  key={n}
                                  className={`h-3 w-3 ${
                                    n <= item.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "fill-slate-200 text-slate-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-slate-400">
                              {timeAgo(item.timestamp)}
                            </span>
                          </div>
                          <p className="line-clamp-2 text-xs text-slate-500">
                            {item.reply}
                          </p>
                        </button>
                      ))}
                    </div>
                  </section>
                )}

                {/* Feature highlights */}
                {history.length === 0 && !reply && !generating && (
                  <section className="mt-5 space-y-3">
                    {[
                      { icon: Zap, title: "Instant replies", desc: "Generate in under a second" },
                      { icon: ShieldCheck, title: "Always on-brand", desc: "Tone-matched to your business" },
                      { icon: Sparkles, title: "Smart templates", desc: "Tailored per business type" },
                    ].map((f) => {
                      const Icon = f.icon;
                      return (
                        <div
                          key={f.title}
                          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                            <Icon className="h-4.5 w-4.5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-700">{f.title}</p>
                            <p className="text-xs text-slate-500">{f.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </section>
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 py-6">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
            <p className="text-xs text-slate-400">
              LocalReview AI — Smart replies for local businesses
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function timeAgo(ts: number): string {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default App;
