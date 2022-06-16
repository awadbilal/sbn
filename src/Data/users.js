export const USERS = [
  {
    name: 'name',
    surname: 'surname',
    email: 'bilal@gmail.com',
    password: '123456',
    phone: '0545 545 54 54',
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
];
