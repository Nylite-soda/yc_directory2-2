export type FormState = {
  status: "INITIAL" | "SUCCESS" | "ERROR";
  error: string;
  errors?: {
    title?: string[];
    description?: string[];
    category?: string[];
    link?: string[];
    pitch?: string[];
    name?: string[];
    username?: string[];
    bio?: string[];
  } | null;
  _id?: string;
};
