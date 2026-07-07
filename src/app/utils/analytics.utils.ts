import { Job, JobStatus, JobStatusMap } from '@core/models';
import { COLUMNS } from '@constants/columns.constants';

export const calculateMetrics = (jobs: Job[]) => {
  const totalJobs = jobs.length;
  const counts: JobStatusMap = COLUMNS.reduce(
    (acc: JobStatusMap, col: JobStatus) => {
      acc[col] = jobs.filter((j: Job) => j.status === col).length;
      return acc;
    },
    {} as JobStatusMap,
  );
  const conversionRate = totalJobs
    ? (((counts.interviewing + counts.offer) / totalJobs) * 100).toFixed(1)
    : '0.0';
  const rejectionRate = totalJobs
    ? ((counts.rejected / totalJobs) * 100).toFixed(1)
    : '0.0';
  return { totalJobs, counts, conversionRate, rejectionRate };
};
