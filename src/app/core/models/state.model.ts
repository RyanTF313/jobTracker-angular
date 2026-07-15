import { AuthState } from './auth.model';
import { Job } from './job.model';

export interface AppState {
  jobs: Job[];
  auth: AuthState;
}
