export interface Input<Type> {
  name?: string;
  label: string;
  value: Type;
  required?: boolean;
  min?: string;
  max?: string;
  onChange(value: Type): void;
  className?: string;
}
