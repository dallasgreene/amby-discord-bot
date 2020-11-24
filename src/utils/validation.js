const isValidHexColor = (color) => {
  if (color.substring(0, 1) !== '#' || color.length !== 7) return false;

  const validHexNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  for (const val of color.substring(1).toUpperCase()) {
    if (!validHexNums.includes(val)) return false;
  }
  return true;
};

const validation = {
  isValidHexColor,
};

export { isValidHexColor };
export default validation;
