import { isTodo } from '@/lib/content';
import type { AnchorHTMLAttributes } from 'react';

/** Renders nothing while the href is still a TODO placeholder, so no dead links ship. */
export default function SmartLink({ href, children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (isTodo(href)) return null;
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
      {children}
    </a>
  );
}
