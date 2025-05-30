const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    static async register(data) {
        const {email, password} = data;
        const existingUser = await UserRepository.findByEmail(email);
        if(existingUser) {
            return {
                status: 400,
                data: {message: 'Email já cadastrado!'}
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserRepository.create({email, password: hashedPassword});

        return {
            status: 201,
            data: {
                message: 'Usuário criado com sucesso!',
                user: newUser
            }
        };
    }

    static async login(data) {
        const {email, password} = data;
        const user = await UserRepository.findByEmail(email);
        if(!user) {
            return {
                status: 401,
                data: {
                    message: 'Credenciais inválidas'
                }
            };
        }

        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid) {
            return {
                status: 401,
                data: {
                    message: 'Credenciais Inválidas'
                }
            };
        }

        const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1d',});
        return {
            status: 200,
            data: {token}
        };
    }
}

module.exports = UserService;