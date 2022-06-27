export const USERS = [
  {
    id: 0,
    name: 'Bilal',
    surname: 'Avvad',
    role: 'customer',
    email: 'awadbilal99@gmail.com',
    password: '123456',
    phone: '0531 581 50 31',
    status: 'active',
    activeAddress: {
      city: 'İstanbul',
      province: 'Beşiktaş',
      street: 'Osmanpaşa Mektebi',
      building: 'A Block',
      apartment: '4',
      full: 'İSTANBUL / TÜRKİYE, 34353 Beşiktaş, Çırağan Caddesi, Osmanpaşa Mektebi Sokak, No: 4 - 6',
    },
    orders: [0, 1],
    basket: [
      {
        id: 0,
        size: 42,
      },
      {
        id: 1,
      },
      {
        id: 2,
        size: 40.5,
      },
    ],
  },
  {
    id: 1,
    name: 'Admin',
    surname: 'Admin',
    role: 'admin',
    email: 'admin@gmail.com',
    password: '123456',
    status: 'active',
  },
];
