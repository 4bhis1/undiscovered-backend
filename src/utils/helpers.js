// Check if a value is empty (null, undefined, empty string, empty array, or empty object)
const isEmpty = (value) => {
  if (value === null || value === undefined) return true;

  if (typeof value === 'string' && value.trim() === '') return true;

  if (Array.isArray(value) && value.length === 0) return true;

  if (typeof value === 'object' && Object.keys(value).length === 0) return true;

  return false;
};

const parseJSON = (param) => {
  try {
    if (param) {
      return typeof param === 'object' ? param : JSON.parse(param);
    }
    return {};
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {};
  }
};

module.exports = {
  isEmpty,
  parseJSON,
};
