const UserModel = require('../models/UserModel');

class UserRepository {
    static async findByEmail(email) {
        return await UserModel.findOne({email});
    }

    static async create(data) {
        return await UserModel.create(data);
    }
}

module.exports = UserRepository;