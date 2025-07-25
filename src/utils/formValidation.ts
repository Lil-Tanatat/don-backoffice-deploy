import * as yup from 'yup';

/**
 * Remove non-numeric characters from a string
 */
export const numberOnly = (value: string): string => {
  return value.replace(/[^0-9]/g, "");
};

/**
 * Restrict phone number input to exactly 10 digits
 */
export const phoneNumberOnly = (value: string): string => {
  const numbers = value.replace(/[^0-9]/g, "");
  return numbers.slice(0, 10); // Limit to 10 digits
};

/**
 * Restrict tax ID input to exactly 13 digits
 */
export const taxIdOnly = (value: string): string => {
  const numbers = value.replace(/[^0-9]/g, "");
  return numbers.slice(0, 13); // Limit to 13 digits
};

/**
 * Restrict zipcode input to exactly 5 digits
 */
export const zipcodeOnly = (value: string): string => {
  const numbers = value.replace(/[^0-9]/g, "");
  return numbers.slice(0, 5); // Limit to 5 digits
};

/**
 * Allow only English letters and numbers for username
 */
export const usernameOnly = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9]/g, "");
};

/**
 * Remove non-English characters from a string
 */
export const englishOnly = (value: string): string => {
  return value.replace(/[^a-zA-Z]/g, "");
};

/**
 * Remove non-Thai characters from a string
 */
export const thaiOnly = (value: string): string => {
  return value.replace(/[^\u0E00-\u0E7F]/g, "");
};

/**
 * Validate password according to specified rules
 * ตัวอักษร 8 ตัวอักษรขึ้นไป ภาษาอังกฤษ A-Z, a-z ตัวเลข 0-9 อักขระพิเศษ เช่น !@#$%
 */
export const validatePassword = (password: string): string => {
  if (!password) return "";
  
  if (password.length < 8) {
    return "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร";
  }
  
  if (!/[a-z]/.test(password)) {
    return "รหัสผ่านต้องมีตัวพิมพ์เล็ก (a-z)";
  }
  
  if (!/[A-Z]/.test(password)) {
    return "รหัสผ่านต้องมีตัวพิมพ์ใหญ่ (A-Z)";
  }
  
  if (!/[0-9]/.test(password)) {
    return "รหัสผ่านต้องมีตัวเลข (0-9)";
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return "รหัสผ่านต้องมีอักขระพิเศษ เช่น !@#$%";
  }
  
  return "";
};

/**
 * Validate username according to specified rules
 * ตัวอักษร 4 ตัวอักษรขึ้นไป ภาษาอังกฤษ A-Z, a-z ตัวเลข 0-9
 */
export const validateUsername = (username: string): string => {
  if (!username) return "";
  
  if (username.length < 4) {
    return "ชื่อผู้ใช้งานต้องมีอย่างน้อย 4 ตัวอักษร";
  }
  
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    return "ชื่อผู้ใช้งานต้องเป็นภาษาอังกฤษ A-Z, a-z และตัวเลข 0-9 เท่านั้น";
  }
  
  return "";
};

/**
 * Validate phone number (must be exactly 10 digits)
 */
export const validatePhoneNumber = (phone: string): string => {
  if (!phone) return "";
  
  const numbers = phone.replace(/[^0-9]/g, "");
  if (numbers.length !== 10) {
    return "เบอร์โทรศัพท์ต้องมี 10 หลัก";
  }
  
  return "";
};

/**
 * Validate tax ID (must be exactly 13 digits)
 */
export const validateTaxId = (taxId: string): string => {
  if (!taxId) return "";
  
  const numbers = taxId.replace(/[^0-9]/g, "");
  if (numbers.length !== 13) {
    return "เลขประจำตัวประชาชนต้องมี 13 หลัก";
  }
  
  return "";
};

/**
 * Validation schema for user form using yup
 */
export const userFormSchema = yup.object({
  username: yup
    .string()
    .required('ชื่อผู้ใช้งานจำเป็นต้องกรอก')
    .email('กรุณากรอกอีเมลที่ถูกต้อง')
    .trim(),
  password: yup
    .string()
    .required('รหัสผ่านจำเป็นต้องกรอก')
    .min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'รหัสผ่านต้องประกอบด้วยตัวพิมพ์เล็ก ตัวพิมพ์ใหญ่ ตัวเลข และอักขระพิเศษ'
    ),
  first_name: yup
    .string()
    .required('ชื่อจำเป็นต้องกรอก')
    .min(1, 'ชื่อต้องมีอย่างน้อย 1 ตัวอักษร')
    .max(50, 'ชื่อต้องไม่เกิน 50 ตัวอักษร')
    .trim(),
  last_name: yup
    .string()
    .required('นามสกุลจำเป็นต้องกรอก')
    .min(1, 'นามสกุลต้องมีอย่างน้อย 1 ตัวอักษร')
    .max(50, 'นามสกุลต้องไม่เกิน 50 ตัวอักษร')
    .trim(),
  tax_id: yup
    .string()
    .required('เลขประจำตัวประชาชนจำเป็นต้องกรอก')
    .matches(/^\d{13}$/, 'เลขประจำตัวประชาชนต้องเป็นตัวเลข 13 หลัก')
    .test('valid-tax-id', 'เลขประจำตัวประชาชนไม่ถูกต้อง', (value) => {
      if (!value || value.length !== 13) return false;

      // Algorithm for Thai National ID validation
      const digits = value.split('').map(Number);
      const weights = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];

      let sum = 0;
      for (let i = 0; i < 12; i++) {
        sum += digits[i] * weights[i];
      }

      const checkDigit = (11 - (sum % 11)) % 10;
      return checkDigit === digits[12];
    }),
  phone: yup
    .string()
    .nullable()
    .optional()
    .matches(/^[0-9-+\s()]*$/, 'เบอร์โทรศัพท์ต้องเป็นตัวเลขเท่านั้น')
    .test('phone-length', 'เบอร์โทรศัพท์ต้องมี 9-10 หลัก', (value) => {
      if (!value) return true; // Optional field
      const digitsOnly = value.replace(/[^0-9]/g, '');
      return digitsOnly.length >= 9 && digitsOnly.length <= 10;
    }),
  job_position: yup
    .string()
    .nullable()
    .optional()
    .trim(),
  role: yup
    .string()
    .required('บทบาทจำเป็นต้องกรอก')
    .oneOf(['supervisor', 'admin'], 'กรุณาเลือกบทบาทที่ถูกต้อง'),
});

export type UserFormData = yup.InferType<typeof userFormSchema>;
