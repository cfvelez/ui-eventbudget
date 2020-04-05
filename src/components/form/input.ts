export interface Input<Type> {
  name?: string;
  label: string;
  value: Type;
  required?: boolean;
  onChange(value: Type): void;
  className?: string;
}
