const allRoles = {
  user: ['generateItinerary', 'selfDetails', 'locationImage', 'getItinerary'],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
