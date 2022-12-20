const min = {
  type0: {
    color: 'rgba(0, 255, 127, 1)',
    background: 'rgba(0, 255, 127, 0.3)',
    width: '25',
    name: 'Standard',
  },
  type1: {
    color: 'rgba(0, 255, 127, 1)',
    background: 'rgba(59, 250, 118,0.5)',
    width: '50',
    name: 'Classic',
  },
  type2: {
    color: 'rgba(0, 255, 127, 1)',
    background: 'rgba(34, 249, 93, 0.7)',
    width: '75',
    name: 'Minimal',
  },
  type3: {
    color: 'rgba(0, 255, 127, 1)',
    background: 'rgba(34, 249, 93, 0.7)',
    width: '100',
    name: 'Island',
  },
};
const max = {
  type0: {
    color: 'rgba(0, 255, 255,1)',
    background: 'rgba(0, 255, 255,0.2)',
    width: '25',
    name: 'Standard',
  },
  type1: {
    color: 'rgba(0, 255, 255,1)',
    background: 'rgba(0, 255, 255,0.4)',
    width: '50',
    name: 'Classic',
  },
  type2: {
    color: 'rgba(0, 200, 255,1)',
    background: 'rgba(0, 200, 255,0.6)',
    width: '75',
    name: 'The Loop',
  },
  type3: {
    color: 'rgba(0, 200, 255,1)',
    background: 'rgba(0, 200, 255,0.8)',
    width: '100',
    name: 'Standard Arcs',
  },
};
const themes = [
  {
    color: 'rgba(0, 255, 127, 1)',
    theme: 'rgba(0, 255, 127,0.9)',
    themeBG: 'rgba(0, 255, 127,0.75)',
    themeBGLite: 'rgba(0, 255, 127,0.1)',
    width: '33',
    name: '#00FF7F',
  },
  {
    color: 'rgba(21, 244, 238, 1)',
    theme: 'rgba(21, 244, 238,0.9)',
    themeBG: 'rgba(21, 244, 238,0.75)',
    themeBGLite: 'rgba(21, 244, 238,0.1)',
    width: '100',
    name: '#15F4EE',
  },
];
const sideBar = {
  type0: {
    color: 'rgba(227, 115, 131, 1)',
    background: 'rgba(227, 115, 131, 0.2)',
    width: '50',
    name: 'Standard',
  },
  type1: {
    color: 'rgba(252, 137, 172, 1)',
    background: 'rgba(252, 137, 172, 0.4)',
    width: '100',
    name: 'Classic',
  },
}
const cp = [
  { type: 'Black/dark', cp: false },
  { type: 'colorpalette', cp: true },
];

const islandConstants = [{ value: 'Play/Pause', use: 'playPause' },
{ value: 'Play Next', use: 'skipNext' },
{ value: 'Play Previous', use: 'skipPrevious' }
];
const islandLongPressConstant = [
  { value: 'YouTube', use: 'handleSwitch' },
  { value: 'Maximise Player', use: 'maxPlayer' },
];
const islandPositionSettings = [{ value: 'Top Mid', class: 'island-tm' },
{ value: 'Bottom Mid', class: 'island-bm' }];

const homeSliderConstants = [{ value: 'Coverflow' },
{ value: 'Cards' },
];

const notibarSettings = [{ value: 'Torch' }, { value: 'Standard' }];
const notibarPositionSettings = [{ value: 'Top Mid', class: 'notibar-tm' },
{ value: 'Top Left', class: 'notibar-tl' },
{ value: 'Top Right', class: 'notibar-tr' },
{ value: 'Bottom Mid', class: 'notibar-bm' },
{ value: 'Bottom Left', class: 'notibar-bl' },
{ value: 'Bottom Right', class: 'notibar-br' }];

export {
  min,
  max,
  sideBar,
  themes,
  cp,
  islandConstants,
  islandLongPressConstant,
  homeSliderConstants,
  islandPositionSettings,
  notibarSettings,
  notibarPositionSettings,
};
