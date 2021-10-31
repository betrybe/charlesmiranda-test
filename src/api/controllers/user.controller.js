const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const Login = require('../models/login.model');

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

  login: async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = new Login({ email, password });

        if (!await userService.login(user)) {
            res.status(401).json({ message: 'Incorrect username or password' }); 
        }

        jwt.sign({ user }, 'secretkey', (err, token) => {
            res.status(200).json({ token });
        });
    } catch (err) {
        if (err instanceof InvalidArgumentException) {
            res.status(401).json({ message: 'All fields must be filled' });
        } else if (err instanceof InternalServerError) {
            res.status(500).json({ erro: err.message });
        }
    }
 },

};
