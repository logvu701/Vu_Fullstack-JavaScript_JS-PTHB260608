export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  avatar: string;
  status: "Active" | "Probation" | "On Leave" | "Terminated";
  address: string;
}

export type PartialUserProfile = Partial<Omit<UserProfile, "id">>;

export interface ExecutionLog {
  id: string;
  timestamp: string;
  method: "PUT" | "PATCH";
  url: string;
  payload: Record<string, any>;
  response: Record<string, any>;
  dataLossWarning?: boolean;
  lostFields?: string[];
  explanation: string;
}
