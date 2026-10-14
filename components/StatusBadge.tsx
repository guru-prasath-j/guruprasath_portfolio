import type { Status } from '@/lib/content';

const tone: Record<Status, string> = {
  Live: 'bg-live text-bg border-live',
  Prototype: 'border-[#B7BEFF] text-[#B7BEFF]',
  'In progress': 'border-dashed border-faint text-faint',
  Research: 'border-dim text-muted',
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`rounded-full border px-3 py-1 font-mono text-[11px] font-medium uppercase ${tone[status]}`}>
      {status}
    </span>
  );
}
