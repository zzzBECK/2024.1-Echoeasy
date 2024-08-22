export const formatPhoneNumber = (value: string) => {
    const cleaned = ('' + value).replace(/\D/g, '');
  
    if (!cleaned) return '';
  
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  
    if (cleaned.length <= 2) {
      return `(${cleaned}`;
    }
    if (cleaned.length <= 7) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    }
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  };
  