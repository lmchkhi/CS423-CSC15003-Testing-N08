const REPORT_TIME_ZONE = 'Asia/Ho_Chi_Minh';

export interface ReportTime {
  display: string;
  iso: string;
}

export function createReportTime(now = new Date()): ReportTime {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: REPORT_TIME_ZONE,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);

  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return {
    display: `${values.day}/${values.month}/${values.year} ${values.hour}:${values.minute}`,
    iso: now.toISOString(),
  };
}
