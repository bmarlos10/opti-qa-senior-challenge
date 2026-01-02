export const checkoutData = {
    valid: { firstName: 'Bruno', lastName: 'Marlos', postalCode: '12345' },
    missingFirstName: { firstName: '', lastName: 'Marlos', postalCode: '12345' },
    missingPostalCode: { firstName: 'Bruno', lastName: 'Marlos', postalCode: '' },
  } as const;
  