export const users = {
  valid: {
    email: process.env.TEST_USER_EMAIL ?? 'testuser@example.com',
    password: process.env.TEST_USER_PASSWORD ?? 'Test@1234',
    name: 'Test User',
  },
  admin: {
    email: process.env.ADMIN_EMAIL ?? 'admin@example.com',
    password: process.env.ADMIN_PASSWORD ?? 'Admin@1234',
    name: 'Admin User',
  },
}

export const addresses = {
  tunisia: { street: '12 Main Street', city: 'Tunis', zip: '1000', country: 'TN' },
  france:  { street: '5 Rue de la Paix', city: 'Paris', zip: '75001', country: 'FR' },
}

export const cards = {
  valid:   { number: '4111111111111111', expiry: '12/26', cvv: '123' },
  expired: { number: '4111111111111111', expiry: '01/20', cvv: '123' },
  invalid: { number: '0000000000000000', expiry: '12/26', cvv: '000' },
}
