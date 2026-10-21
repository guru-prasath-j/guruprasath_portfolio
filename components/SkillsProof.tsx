import { skillsProof } from '@/lib/content';

/** Skill → where it's proven. A table on wide screens, stacked rows on phones. */
export default function SkillsProof() {
  return (
    <div className="reveal overflow-hidden rounded-3xl border border-line bg-surface">
      <table className="w-full border-collapse text-left">
        <thead className="hidden sm:table-header-group">
          <tr className="font-mono text-[11px] uppercase tracking-[.08em] text-faint">
            <th scope="col" className="px-5 py-4 font-medium">Skill</th>
            <th scope="col" className="px-5 py-4 font-medium">What it covers</th>
            <th scope="col" className="px-5 py-4 font-medium">Proven in</th>
          </tr>
        </thead>
        <tbody>
          {skillsProof.map((r, i) => (
            <tr key={r.skill} className={`flex flex-col gap-1 px-5 py-4 sm:table-row sm:p-0 ${i ? 'border-t border-line' : 'sm:border-t sm:border-line'}`}>
              <th scope="row" className="font-semibold sm:px-5 sm:py-4">{r.skill}</th>
              <td className="text-[15px] text-muted sm:px-5 sm:py-4">{r.covers}</td>
              <td className="text-[15px] sm:px-5 sm:py-4">
                <a href={r.href} className="border-b border-[#3B4377] text-soft no-underline hover:text-ink">{r.proof}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
