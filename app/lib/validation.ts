export type ValidationRule = {
  required?: boolean;
  validate?: (value: string) => string | null;
};

export type ValidationRules = Record<string, ValidationRule>;
export type FormErrors = Record<string, string>;

export const validateForm = (data: Record<string, string>, rules: ValidationRules): FormErrors => {
  const errors: FormErrors = {};
  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field] || "";
    if (rule.required && !value.trim()) {
      errors[field] = "Required";
      continue;
    }
    if (value.trim() && rule.validate) {
      const error = rule.validate(value);
      if (error) errors[field] = error;
    }
  }
  return errors;
};

export const SHIPPING_RULES: ValidationRules = {
  firstName: { required: true },
  lastName: { required: true },
  email: {
    required: true,
    validate: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Invalid email" : null
  },
  address: { required: true },
  city: { required: true },
  zip: {
    required: true,
    validate: (v) => !/^\d{4,10}$/.test(v.replace(/\s/g, "")) ? "Invalid ZIP" : null
  }
};

export const PAYMENT_RULES: ValidationRules = {
  nameOnCard: { required: true },
  cardNumber: {
    required: true,
    validate: (v) => v.replace(/\s/g, "").length < 13 ? "Invalid card number" : null
  },
  expDate: {
    required: true,
    validate: (v) => !/^\d{2}\/\d{2}$/.test(v) ? "Use MM/YY" : null
  },
  cvv: {
    required: true,
    validate: (v) => !/^\d{3,4}$/.test(v) ? "Invalid CVV" : null
  }
};
