import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}
export default function getValidationError(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(e => {
    validationErrors[e.path] = e.message;
  });
  return validationErrors;
}
