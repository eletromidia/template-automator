export default function invertColor(hexColor: string) {
  try {
    const color = hexToRgbArray(hexColor)
    return '#' + color.map(c => padz((255 - c).toString(16))).join('');
  } catch (err) {
    console.warn(err)
    return '#000000'
  }
}

function hexToRgbArray(hex: string) {
  if (hex.slice(0, 1) === '#') hex = hex.slice(1);
  // normalize / convert 3-chars hex to 6-chars.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return [
    parseInt(hex.slice(0, 2), 16), // r
    parseInt(hex.slice(2, 4), 16), // g
    parseInt(hex.slice(4, 6), 16)  // b
  ];
}

function padz(str: string, len: number = 2): string {
  return (new Array(len).join('0') + str).slice(-len);
}
