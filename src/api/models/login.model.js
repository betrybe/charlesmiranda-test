const validators = require('../common/validators');

class Login {
    constructor(login) {
      this.email = login.email;
      this.password = login.password;

      this.validate();
    }
    
    validate() {
        validators.notNull(this.email, 'email');
        validators.validateEmail(this.email);
        validators.notNull(this.password, 'password');
    }
}

module.exports = Login;