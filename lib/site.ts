export const site = {
  name: 'EastOfKailash.com',
  areaName: 'East of Kailash',
  pincode: '110065',
  phone: '919811110065',
  phoneDisplay: '+91 98111 10065',
  email: 'mail@eastofkailash.com',
  addressLine1: 'East of Kailash,',
  addressLine2: 'New Delhi, South Delhi 110065',
  quote: 'PRESTIGE HAS AN ADDRESS, ITS EAST OF KAILASH',
  whatsapp(message: string) {
    return `https://api.whatsapp.com/send?phone=${this.phone}&text=${encodeURIComponent(message)}`;
  },
};
