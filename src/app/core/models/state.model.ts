import { AuthState } from "./auth.model";
import { Job } from "./job.model";

export interface AppState {
  jobs: Job[];
  filteredJobs: Job[];
  auth: AuthState;
}