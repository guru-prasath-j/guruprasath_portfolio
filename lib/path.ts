/** Prefix for files in /public when the site is served from a sub-path (project Pages site). */
export const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`;
