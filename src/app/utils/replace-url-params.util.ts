export function replaceUrlParams(
  url: string,
  params: Record<string, string | number>
): string {
  for (const key of Object.keys(params)) {
    url = url.replaceAll(`:${key}`, params[key].toString());
  }
  return url;
}