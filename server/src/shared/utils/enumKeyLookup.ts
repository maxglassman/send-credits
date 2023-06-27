export function getKeyByValue(
  enumObj: { [key: string]: number },
  value: number
): string | undefined {
  const keys = Object.keys(enumObj) as Array<keyof typeof enumObj>;
  return keys.find((key) => enumObj[key] === value) as string | undefined;
}
