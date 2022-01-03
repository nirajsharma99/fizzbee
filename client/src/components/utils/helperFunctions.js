import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';

export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds > 59
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export function getColor(id, imgRef, type) {
  if (!id) return;
  const colorThief = new ColorThief();
  const img = imgRef.current;
  var color;
  if (img.complete) {
    color = colorThief.getColor(img);
    if (!id) return;
    switch (type) {
      case 'player':
        document.getElementById(
          id + '3'
        ).style.background = `rgba(${color[0]},${color[1]},${color[2]},0.9)`;
        break;
      case 'max-player-2':
        document.getElementById(
          'max-player-2'
        ).style.background = `rgba(${color[0]},${color[1]},${color[2]},0.7)`;
        break;
      case 'playlist':
        if (!document.getElementById(id)) return;
        document.getElementById(
          id
        ).style.background = `linear-gradient(360deg, rgb(${color[0]},${color[1]},${color[2]}), black)`;
        break;
      case 'artistPage':
        document.getElementById(
          id + '3'
        ).style.background = `linear-gradient(360deg, rgb(${color[0]},${color[1]},${color[2]}), transparent)`;
        break;
      case 'album':
        document.getElementById(
          id + '4'
        ).style.background = `rgb(${color[0]},${color[1]},${color[2]})`;
        break;

      default:
        console.log('Get color switch error');
        break;
    }
  } else {
    img.addEventListener('load', function () {
      color = colorThief.getColor(img);
    });
  }
  if (!color) return;
}

export function getColorAlbumTemplate({ id, index }) {
  const colorThief = new ColorThief();
  const img = document.getElementById(id);
  var color;
  if (img.complete) {
    color = colorThief.getColor(img);
  } else {
    img.addEventListener('load', function () {
      color = colorThief.getColor(img);
    });
  }
  document.getElementById(
    id + index
  ).style.background = `rgb(${color[0]},${color[1]},${color[2]})`;
}

export function getColorArtists(id, index) {
  const colorThief = new ColorThief();
  const img = document.getElementById(id);
  var color;
  if (img.complete) {
    color = colorThief.getColor(img);
  } else {
    img.addEventListener('load', function () {
      color = colorThief.getColor(img);
    });
  }
  document.getElementById(
    id + index
  ).style.boxShadow = `0 2px 10px rgb(${color[0]},${color[1]},${color[2]})`;

  document.getElementById(
    id + index
  ).style.background = `rgba(${color[0]},${color[1]},${color[2]})`;
}

export const getColorSongTemplate = (id, index, imgRef) => {
  const colorThief = new ColorThief();
  const img = imgRef.current;
  var color;
  if (img.complete) {
    color = colorThief.getColor(img);
  } else {
    img.addEventListener('load', function () {
      color = colorThief.getColor(img);
    });
  }
  document.getElementById(
    id
  ).style.boxShadow = `0 4px 15px rgb(${color[0]},${color[1]},${color[2]})`;

  document.getElementById(id + index).style.background = `linear-gradient(
      rgba(${color[0]},${color[1]},${color[2]},0.9),
      rgba(${color[0]},${color[1]},${color[2]},0.3)
    )`;
};

/*export const getImage = (arr, size) => {
  if (!arr) return null;
  if (!arr.length) return 'default.png';
  var imageNeeded;
  switch (size) {
    case 'sm':
      imageNeeded = arr?.reduce((smallest, image) => {
        if (image.height < smallest.height) return image;
        return smallest;
      }, arr[0]);
      return imageNeeded?.url;

    case 'md':
      var secondlargest, largest;
      imageNeeded = arr?.reduce((biggest, image) => {
        if (image.height > biggest.height) {
          secondlargest = image;
          largest = image;
          return largest;
        }
        return biggest;
      }, arr[0]);
      return imageNeeded?.url;

    case 'lg':
      imageNeeded = arr?.reduce((biggest, image) => {
        if (image.height > biggest.height) return image;
        return biggest;
      }, arr[0]);
      return imageNeeded?.url;
  }
};*/

export const getImage = (arr, size) => {
  if (!arr) return null;
  if (!arr.length) return 'default.png';

  switch (size) {
    case 'sm':
      return arr[2]?.url;

    case 'md':
      return arr[1]?.url;

    case 'lg':
      return arr[0]?.url;
    default:
      return arr[1]?.url;
  }
};

export function isEqual(obj1, obj2) {
  if (!obj1 || !obj2) return false;
  var props1 = Object.getOwnPropertyNames(obj1);
  var props2 = Object.getOwnPropertyNames(obj2);
  if (props1.length != props2.length) {
    return false;
  }
  for (var i = 0; i < props1.length; i++) {
    let val1 = obj1[props1[i]];
    let val2 = obj2[props1[i]];
    let isObjects = isObject(val1) && isObject(val2);
    if ((isObjects && !isEqual(val1, val2)) || (!isObjects && val1 !== val2)) {
      return false;
    }
  }
  return true;
}
function isObject(object) {
  return object != null && typeof object === 'object';
}
