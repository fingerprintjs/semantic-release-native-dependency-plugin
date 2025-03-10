export function humanizeMavenStyleVersionRange(versionRange: string) {
  return versionRange
    .trim()
    .replace(/\s*\[\s*(.*?)\s*,\s*(.*?)\s*]\s*/g, '>= $1 and <= $2')
    .replace(/\s*\(\s*(.*?)\s*,\s*(.*?)\s*]\s*/g, '> $1 and <= $2')
    .replace(/\s*\[\s*(.*?)\s*,\s*(.*?)\s*\)\s*/g, '>= $1 and < $2')
    .replace(/\s*\(\s*(.*?)\s*,\s*(.*?)\s*\)\s*/g, '> $1 and < $2')
    .replace(/\s*\[\s*(.*?)\s*]/g, '>=$1')
    .replace(/\s*\(\s*(.*?)\s*\)/g, '>$1')
}
