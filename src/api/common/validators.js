const InvalidArgumentException = require('../exceptions/invalid-argument.exception');

module.exports = {
    notNull: (value, field) => {
      if (typeof value !== 'string' || value === null) {
        throw new InvalidArgumentException(`${field} is required`);
      }
    },

    validateEmail: (email) => {
      const regex = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;
      
      if (!regex.test(String(email).toLowerCase())) {
        throw new InvalidArgumentException('Invalid email!');
      }
    },

};