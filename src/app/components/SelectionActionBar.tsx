import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Check, Download, Megaphone, Sparkles, X } from "lucide-react";

interface Props {
  open: boolean;
  count: number;
  onSmartCampaign?: () => void;
  onExport?: () => void;
  onDownload?: () => void;
  onClose: () => void;
}

// ─── SmartCampaigns intro popover ─────────────────────────────────────────────

function SmartCampaignPopover({
  open, onClose,
}: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(
        el,
        { y: 10, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.5)", delay: 0.1 }
      );
    } else {
      gsap.to(el, { y: 10, opacity: 0, scale: 0.96, duration: 0.2, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div
      ref={ref}
      style={{
        pointerEvents: open ? "auto" : "none",
        opacity: open ? undefined : 0,
      }}
      // Anchor to the SmartCampaign button. The bar's gradient button sits ~the
      // first action slot in the bar; tail centers under that button area.
      className="absolute bottom-[calc(100%+14px)] left-[280px] z-10"
    >
      <div className="relative w-[340px] bg-white rounded-[16px] shadow-[0_22px_48px_rgba(0,0,0,0.28)] p-[20px] text-[#0a0a0a]">
        {/* Eyebrow + close */}
        <div className="flex items-start justify-between gap-[12px]">
          <div className="inline-flex items-center gap-[6px]">
            <span
              className="text-[14px] font-bold font-['Inter:Bold',sans-serif]"
              style={{
                background: "linear-gradient(90deg, #FF5C7A 0%, #B651D7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Introducing SmartCampaigns
            </span>
            <Megaphone size={16} className="text-[#B651D7]" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-[24px] rounded-full hover:bg-black/5 flex items-center justify-center transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <X size={14} className="text-black/60" />
          </button>
        </div>

        {/* Headline */}
        <p className="mt-[10px] text-[18px] font-bold font-['Inter:Bold',sans-serif] leading-[24px] text-[#0a0a0a]">
          Move aged inventory with one click
        </p>
        <p className="mt-[6px] text-[13px] text-black/55 font-['Inter:Regular',sans-serif] leading-[18px]">
          Channel-ready creatives built from media you already have.
        </p>

        {/* Stat tiles */}
        <div className="mt-[14px] grid grid-cols-2 gap-[10px]">
          <div className="rounded-[10px] border border-black/8 bg-[#FAFAFB] px-[12px] py-[10px]">
            <p className="text-[10px] uppercase tracking-[0.8px] font-bold text-black/55 font-['Inter:Bold',sans-serif]">
              Holding Cost Saved
            </p>
            <p className="mt-[4px] text-[20px] font-bold text-[#10B981] font-['Inter:Bold',sans-serif] leading-none">
              $12,000
            </p>
          </div>
          <div className="rounded-[10px] border border-black/8 bg-[#FAFAFB] px-[12px] py-[10px]">
            <p className="text-[10px] uppercase tracking-[0.8px] font-bold text-black/55 font-['Inter:Bold',sans-serif]">
              Time Saved
            </p>
            <p className="mt-[4px] text-[20px] font-bold text-[#10B981] font-['Inter:Bold',sans-serif] leading-none">
              34-40 days
            </p>
          </div>
        </div>

        {/* Downward tail toward the CTA */}
        <div
          aria-hidden
          className="absolute top-full left-[78px]"
          style={{
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderTop: "12px solid #fff",
            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.06))",
          }}
        />
      </div>
    </div>
  );
}

export function SelectionActionBar({
  open, count, onSmartCampaign, onExport, onDownload, onClose,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open) {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "back.out(1.6)" }
      );
      setPopoverOpen(true);
    } else {
      gsap.to(el, { y: 80, opacity: 0, scale: 0.96, duration: 0.25, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div
      ref={ref}
      style={{ pointerEvents: open ? "auto" : "none", opacity: open ? undefined : 0 }}
      className="fixed bottom-[28px] left-1/2 -translate-x-1/2 z-40"
    >
      {/* SmartCampaigns intro popover */}
      <SmartCampaignPopover open={open && popoverOpen} onClose={() => setPopoverOpen(false)} />

      <div className="relative bg-[#0a0a0a] text-white rounded-[16px] shadow-[0_18px_40px_rgba(0,0,0,0.35)] flex items-center gap-[10px] pl-[10px] pr-[10px] py-[10px]">
        {/* Count chip */}
        <div className="flex items-center gap-[12px] pr-[16px] border-r border-white/15">
          <div className="size-[40px] rounded-[12px] bg-white/10 flex items-center justify-center">
            <Check size={20} strokeWidth={2.5} />
          </div>
          <span className="text-[16px] font-semibold font-['Inter:Semi_Bold',sans-serif] whitespace-nowrap">
            {count.toLocaleString()} {count === 1 ? "vehicle" : "vehicles"} selected
          </span>
        </div>

        {/* Create SmartCampaign — gradient */}
        <button
          type="button"
          onClick={() => {
            setPopoverOpen(false);
            onSmartCampaign?.();
          }}
          className="h-[48px] px-[28px] rounded-[12px] text-white text-[15px] font-bold font-['Inter:Bold',sans-serif] inline-flex items-center gap-[8px] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background:
              "linear-gradient(90deg, #5BBFF6 0%, #7F6AF2 35%, #B651D7 65%, #FF7B5C 100%)",
            boxShadow: "0 6px 18px rgba(127,106,242,0.45)",
          }}
        >
          <Sparkles size={16} strokeWidth={2.5} />
          Create SmartCampaign
        </button>

        {/* Export */}
        <button
          type="button"
          onClick={onExport}
          className="h-[48px] px-[22px] rounded-[12px] bg-white/[0.08] hover:bg-white/[0.14] text-white text-[14px] font-semibold font-['Inter:Semi_Bold',sans-serif] transition-colors"
        >
          Export
        </button>

        {/* Download icon */}
        <button
          type="button"
          onClick={onDownload}
          className="size-[48px] rounded-[12px] bg-white/[0.08] hover:bg-white/[0.14] flex items-center justify-center transition-colors"
          aria-label="Download"
        >
          <Download size={18} />
        </button>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="size-[48px] rounded-[12px] hover:bg-white/10 flex items-center justify-center transition-colors"
          aria-label="Dismiss selection"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
