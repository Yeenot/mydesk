export const defaultValidationMessages: Record<
  string,
  (error: any) => string
> = {
  required: () => 'This field is required.',
  email: () => 'Please enter a valid email.',
  minlength: (e) => `Minimum ${e.requiredLength} characters.`,
  maxlength: (e) => `Maximum ${e.requiredLength} characters.`,
  min: (e) => `Minimum value is ${e.min}.`,
  max: (e) => `Maximum value is ${e.max}.`,
  pattern: () => 'Invalid format.',
  requiredTrue: () => 'This checkbox must be checked.',
  price: () => 'Invalid pattern: should be 2 decimal places.',
};

export function getValidationMessage(errors: any): string {
  const firstKey = Object.keys(errors)[0];
  const error = errors[firstKey];
  const generator = defaultValidationMessages[firstKey];
  return generator ? generator(error) : 'Invalid input.';
}