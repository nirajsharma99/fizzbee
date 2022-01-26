const min = {
  type0: {
    color: 'rgba(0, 255, 127, 1)',
    background: 'rgba(0, 255, 127, 0.5)',
    width: '33%',
    name: 'Standard',
  },
  type1: {
    color: 'rgba(0, 255, 127, 1)',
    background: 'rgba(59, 250, 118,0.7)',
    width: '66%',
    name: 'Classic',
  },
  type2: {
    color: 'rgba(0, 255, 127, 1)',
    background: 'rgba(34, 249, 93, 0.7)',
    width: '100%',
    name: 'Minimal',
  },
};
const max = {
  type0: {
    color: 'rgba(0, 255, 255,1)',
    background: 'rgba(0, 255, 255,0.3)',
    width: '50%',
    name: 'Standard',
  },
  type1: {
    color: 'rgba(0, 255, 255,1)',
    background: 'rgba(0, 255, 255,0.6)',
    width: '100%',
    name: 'Classic',
  },
  /*type2: {
    color: 'rgba(0, 200, 255,1)',
    background: 'rgba(0, 200, 255,0.6)',
    width: '100%',
    name: 'Minimal',
  },*/
};
const themes = [
  {
    color: 'rgba(0, 255, 127, 1)',
    theme: 'rgba(0, 255, 127,0.9)',
    themeBG: 'rgba(0, 255, 127,0.75)',
    themeBGLite: 'rgba(0, 255, 127,0.1)',
    width: '33%',
    name: '#00FF7F',
  },
  {
    color: 'rgba(21, 244, 238, 1.0)',
    theme: 'rgba(21, 244, 238,0.9)',
    themeBG: 'rgba(21, 244, 238,0.75)',
    themeBGLite: 'rgba(21, 244, 238,0.1)',
    width: '100%',
    name: '#15F4EE',
  },
];

const cp = [
  { type: 'Black/dark', cp: false },
  { type: 'colorpalette', cp: true },
];

export { min, max, themes, cp };
