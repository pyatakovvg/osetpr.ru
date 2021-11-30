
const navigate = [
  {
    title: "Заказы",
    path: '/orders',
    icon: 'fas fa-tag',
  },
  {
    title: 'Товары',
    path: '/products',
    icon: 'fas fa-shopping-cart',
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
    path: '/settings/main',
    icon: 'fas fa-cog',
    navigate: [
      {
        title: 'Настройки',
        path: '/settings/main',
      },
      {
        title: 'Категория',
        path: '/settings/category',
      }
    ],
  },
];

export default navigate;
