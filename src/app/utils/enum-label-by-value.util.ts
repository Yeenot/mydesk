export function getEnumLabelByValue<T extends Record<string, string>>(
  enumObj: T,
  value: string
): string | undefined {
  return Object.keys(enumObj).find(
    key => enumObj[key as keyof T] === value
  );
}