const UserService = require('../services/UserService');

class UserController {
    static async register(req, res) {
        const response = await UserService.register(req.body);
        return res.status(response.status).json(response.data);
    }

    static async login(req, res) {
        const response = await UserService.login(req.body);
        return res.status(response.status).json(response.data);
    }
}

module.exports = UserController;