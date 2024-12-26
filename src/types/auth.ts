export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
}

// Assuming UserRole is an enum
export enum UserRole {
  Admin = 'admin',
  User = 'user',
  // Add other roles as needed
}

export enum Permission {
  CreateTest = 'create:test',
  EditTest = 'edit:test',
  DeleteTest = 'delete:test',
  RunTest = 'run:test',
  ViewReports = 'view:reports',
  ManageUsers = 'manage:users',
  ManageSettings = 'manage:settings',
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
