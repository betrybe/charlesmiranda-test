class InvalidArgumentException extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidArgumentException';
    }
}

module.exports = InvalidArgumentException;