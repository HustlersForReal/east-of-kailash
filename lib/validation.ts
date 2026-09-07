const NAME_RE = /^[A-Za-z][A-Za-z\s.'-]{2,49}$/;
const PHONE_RE = /^[6-9]\d{9}$/;

export function sanitizePhone(val: string): string {
  const digits = val.replace(/\D/g, '');
  const cleaned = digits.startsWith('91') && digits.length > 10 ? digits.slice(2) : digits;
  return cleaned.slice(0, 10);
}

export function sanitizeName(val: string): string {
  return val.replace(/[^A-Za-z\s.'-]/g, '').slice(0, 50);
}

export function sanitizeDigits(val: string, max: number): string {
  return val.replace(/\D/g, '').slice(0, max);
}

export function sanitizeDecimal(val: string): string {
  const cleaned = val.replace(/,/g, '');
  const parts = cleaned.split('.');
  if (parts.length > 2) return parts[0] + '.' + parts.slice(1).join('');
  if (parts[1] && parts[1].length > 2) return parts[0] + '.' + parts[1].slice(0, 2);
  return cleaned.slice(0, 12);
}

export function isNumericPos(val: string): boolean {
  const num = parseFloat(val.replace(/,/g, ''));
  return !isNaN(num) && num > 0;
}

export function isPriceValid(val: string): boolean {
  const num = parseFloat(val.replace(/,/g, ''));
  return !isNaN(num) && num >= 1000;
}

export function validateName(val: string): string | null {
  if (!val.trim()) return 'Name is required';
  if (!NAME_RE.test(val)) return 'Enter a valid name (letters only, 3–50 chars)';
  return null;
}

export function validatePhone(val: string): string | null {
  if (!val.trim()) return 'Mobile number is required';
  if (!PHONE_RE.test(val)) return 'Enter a valid 10-digit Indian mobile number';
  return null;
}

export function sanitizeSellField(key: string, val: string): string {
  switch (key) {
    case 'sellerName': return sanitizeName(val);
    case 'mobile': return sanitizePhone(val);
    case 'carpetArea':
    case 'builtupArea':
    case 'coveredArea':
    case 'plotArea':
    case 'roadWidth':
      return sanitizeDecimal(val);
    case 'totalFloors':
    case 'numFloors':
    case 'totalFloorsAllowed':
      return sanitizeDigits(val, 3);
    case 'propertyFloor':
      return val.replace(/[^A-Za-z0-9\s.'/-]/g, '').slice(0, 15);
    default:
      return val;
  }
}
