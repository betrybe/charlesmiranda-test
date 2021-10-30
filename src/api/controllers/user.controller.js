const User = require('../models/user.model');
const userService = require('../services/users.service');

const InternalServerError = require('../exceptions/internal-server-error.exception');
const InvalidArgumentException = require('../exceptions/invalid-argument.exception');

module.exports = {
    create: async (req, res) => {
        const { name, email, password, role } = req.body;
        
        try {
            const user = new User({ name, email, password, role });

            if (await userService.findByEmail(user)) { 
                res.status(409).json({ message: 'Email already registered' }); 
            }

            const result = await userService.create(user);

            res.status(201).json({ user: { name: result.name, 
                email: result.email, 
                role: result.role }, 
            });
        } catch (err) {
            if (err instanceof InvalidArgumentException) {
                res.status(400).json({ message: 'Invalid entries. Try again.' });
            } else if (err instanceof InternalServerError) {
                res.status(500).json({ erro: err.message });
            }
        }
  },
};
