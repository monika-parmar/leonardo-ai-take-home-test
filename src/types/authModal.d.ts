type AuthModalProps = {
  isUpdateMode?: boolean;
  onClose?: () => void;
  isOpen?: boolean;
};

type AuthFormProps = {
  username: string;
  jobTitle: string;
  onInputChange: (
    key: LoginFields,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
};

type LoginFields = "username" | "jobTitle";

type LoginForm = {
  username: string;
  jobTitle: string;
};
