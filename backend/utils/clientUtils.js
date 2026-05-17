function formatPhoneNumber(phoneNumber) {
  const digits = phoneNumber.replace(/\D/g, '');

  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phoneNumber; // Or handle invalid phone number
}

module.exports = { formatPhoneNumber };
