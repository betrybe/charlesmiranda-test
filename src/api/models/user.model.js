const validators = require('../common/validators');

const roles = {
  ADMIN: 'admin',
  USER: 'user',
};

class User {
    constructor(user) {
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
      this.role = user.role == null || user.role === '' ? roles.USER : user.role;

      this.validate();
    }
    
    validate() {
        validators.notNull(this.name, 'name');
        validators.notNull(this.email, 'email');
        validators.validateEmail(this.email);
        validators.notNull(this.password, 'password');
    }
}

module.exports = User;