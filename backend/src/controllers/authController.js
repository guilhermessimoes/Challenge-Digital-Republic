const bcrypt = require('bcryptjs');
const db = require('../models');
const validatorCPF = require('cpf-cnpj-validator');

const authController = {
    signupPost: async (req, res) => {
        try {
            const nomeUsuario = req.body.nome;
            const cpfUsuario = req.body.cpf;
            const senhaUsuario = req.body.senha;
            const confirmSenha = req.body.confirmacaoSenha;
            const salt = bcrypt.genSaltSync(10);
            const senhaCriptografada = bcrypt.hashSync(req.body.senha, salt);

            if (senhaUsuario !== confirmSenha) {
                return res.status(400).json({ message: 'Senhas não confere.' });
            }

            if (!validatorCPF.cpf.isValid(cpfUsuario)) {
                return res.status(400).json({ message: 'CPF inválido.' });
            }

            if (await db.Usuario.findOne({ where: { cpf: cpfUsuario } })) {
                return res.status(400).json({ message: 'CPF já cadastrado.' });
            }

            await db.Usuario.create({
                nome: nomeUsuario,
                cpf: cpfUsuario,
                senha: senhaCriptografada,
            });

            return res
            .status(200)
            .json({ message: 'Usuário criado com sucesso.' });
        } catch (error) {
            res.status(400).send('falha na criação do usuario.');
        }
    },

    loginPost: async (req, res) => {
        const {
            cpf, senha 
        } = req.body;

        const user = await db.Usuario.findOne({ where: { cpf } })
        .then(user => user)
        .catch(err => {
            console.log(err);

            return undefined;
        });

        if (!user) {
            return res
            .status(400)
            .json({ message: 'Usuario ou senha incorreto.' });
        }

        const comparePassword = bcrypt.compareSync(senha, user.senha);

        if (!comparePassword) {
            return res
            .status(400)
            .json({ message: 'Usuario ou senha incorreto.' });
        }

        //Adicionar session
        req.session.user = {
            user_id: user.id,
            name: user.nome,
            cpf: user.cpf,
        };

        return res.status(200).json({ message: 'Login realizado com sucesso' });
    },

    logout: async(req, res) =>{  
        req.session.destroy();

        return res.status(201).json({ message: 'logout efetuado com sucesso.' });
    }
};

module.exports = authController;
