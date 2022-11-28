const option1 = {
  idx: 1.25,
  invIdx: 0.75,
  icon: 'planet',
  title: 'Home',
  pathname: undefined,
  route: '',
};
const option2 = {
  idx: 1.75,
  invIdx: 0.25,
  icon: 'search',
  title: 'Search',
  pathname: 'search',
  route: '/search',
};
const option3 = {
  idx: 2.25,
  invIdx: -0.25,
  icon: 'library',
  title: 'Your library',
  pathname: 'library',
  route: '/library',
};
const option4 = {
  idx: 2.75,
  invIdx: -0.75,
  icon: 'settings',
  title: 'Settings',
  pathname: 'settings',
  route: '/settings',
};

export const navList = [option1, option2, option3, option4];
