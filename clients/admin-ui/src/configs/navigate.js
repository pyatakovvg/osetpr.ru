
const navigate = [
  {
    title: "Заказы",
    path: '/orders',
    icon: 'fas fa-tag',
    navigate: [
      {
        title: 'Заказы',
        path: '/orders',
      },
      {
        title: 'Способ оплаты',
        path: '/orders/payments',
      },
    ],
  },
  {
    title: 'Товары',
    path: '/products',
    icon: 'fas fa-shopping-cart',
    navigate: [
      {
        title: 'Товары',
        path: '/products',
      },
      {
        title: 'Группы',
        path: '/products/groups',
      },
      {
        title: 'Категория',
        path: '/products/categories',
      }
    ],
  },
  {
    title: 'Комментарии',
    path: '/comments',
    icon: 'far fa-comments',
  },
  {
    title: 'Галерея',
    path: '/gallery',
    icon: 'fas fa-images',
  },
  {
    title: 'Планы',
    path: '/plans',
    icon: 'fas fa-percentage',
  },
  {
    title: 'Клиенты',
    path: '/customers',
    icon: 'fas fa-user-friends',
  },
  {
    title: 'Настройки',
    path: '/settings',
    icon: 'fas fa-cog',
  },
];

export default navigate;
