export interface AuthForm {
  email: string;
  password: string;
}

export interface EditedTask {
  id: number;
  title: string;
  description?: string | null;
}
