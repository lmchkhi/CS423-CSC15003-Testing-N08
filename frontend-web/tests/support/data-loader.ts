import fs from 'node:fs';

export function loadCases<T extends { id: string }>(
  filePath: string,
  validate: (value: unknown) => value is T,
  minimum = 12,
): T[] {
  let raw: unknown;

  try {
    raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    throw new Error(`Không thể đọc dữ liệu kiểm thử ${filePath}: ${String(error)}`);
  }

  if (!Array.isArray(raw) || !raw.every(validate)) {
    throw new Error(`Dữ liệu kiểm thử không hợp lệ: ${filePath}`);
  }
  if (raw.length < minimum) {
    throw new Error(`Cần ít nhất ${minimum} ca kiểm thử trong ${filePath}`);
  }

  const ids = raw.map((item) => item.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error(`Mã ca kiểm thử bị trùng trong ${filePath}`);
  }

  return raw;
}
