export interface Job {
  id: string;
  position: string;
  company: string;
  status: JobStatus;
  notes: string;
  salary: string;
  owner: string | null
};

export type JobStatus =
  | "wishlist"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

export type JobStatusMap = Record<JobStatus, number>;