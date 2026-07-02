import { Job, JobStatus, JobStatusMap } from '../core/models';

export const COLUMNS: JobStatus[] = [
  'wishlist',
  'applied',
  'interviewing',
  'offer',
  'rejected',
];

export const COLUMN_LABELS: Record<JobStatus, string> = {
  wishlist: 'Wishlist',
  applied: 'Applied',
  interviewing: 'Interviewing',
  offer: 'Offer',
  rejected: 'Rejected',
};

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
    : 0;
  const rejectionRate = totalJobs
    ? ((counts.rejected / totalJobs) * 100).toFixed(1)
    : 0;
  return { totalJobs, counts, conversionRate, rejectionRate };
};
