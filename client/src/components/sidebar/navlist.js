const option1 = {
  idx: 1,
  invIdx: 1,
  icon: 'planet',
  title: 'Home',
  pathname: undefined,
  route: '',
};
const option2 = {
  idx: 1.5,
  invIdx: 0.5,
  icon: 'search',
  title: 'Search',
  pathname: 'search',
  route: '/search',
};
const option3 = {
  idx: 2,
  invIdx: 0,
  icon: 'library',
  title: 'Your library',
  pathname: 'library',
  route: '/library',
};
const option4 = {
  idx: 2.5,
  invIdx: -0.5,
  icon: 'skull',
  title: 'Party Mode',
  pathname: 'party',
  route: '/party',
};
const option5 = {
  idx: 3,
  invIdx: -1,
  icon: 'settings',
  title: 'Settings',
  pathname: 'settings',
  route: '/settings',
};
export const navList = [option1, option2, option3, option4, option5];
