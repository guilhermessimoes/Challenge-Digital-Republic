const db = require('../models');
const formatMoney = require('../utils/formatMoney');
const validatorCPF = require('cpf-cnpj-validator');

const accountController = {
    accountGet: async (req, res) => {
        try {
            const usuarioEncontrato = await db.Usuario.findByPk(
                req.session.user.user_id
            );
            const balance = formatMoney(usuarioEncontrato.balance);
            const nome = usuarioEncontrato.nome;
            const cpf = usuarioEncontrato.cpf;

            return res.status(200).json({
                nome,
                cpf,
                balance 
            });
        } catch (error) {
            return res
            .status(400)
            .json({ message: 'Não foi possível visualizar a conta.' });
        }
    },

    depositPost: async (req, res) => {
        try {
            const depositUser = parseFloat(req.body.deposit);
            const depositCpf = req.body.cpf;
            const cpfLogadoEncontrato = await db.Usuario.findByPk(
                req.session.user.user_id
            );
            const usuarioEncontrato = await db.Usuario.findOne({ where: { cpf: depositCpf } });

            if (depositUser > 2000) {
                return res
                .status(400)
                .json({ message: 'Depósito maxímo de R$ 2.000,00.' });
            }

            if (!validatorCPF.cpf.isValid(depositCpf)) {
                return res.status(400).json({ message:'CPF inválido.' });
            }

            if (!usuarioEncontrato) {
                return res.status(400).json({ message:'CPF não cadastrado.' });
            }

            if (cpfLogadoEncontrato.cpf === usuarioEncontrato.cpf) {
                usuarioEncontrato.balance += depositUser;
                await db.Usuario.update(
                    { balance: usuarioEncontrato.balance },
                    { where: { id: usuarioEncontrato.id } }
                );
            } else {
                //Baixa da transferencia
                usuarioEncontrato.balance += depositUser;
                await db.Usuario.update(
                    { balance: usuarioEncontrato.balance },
                    { where: { id: usuarioEncontrato.id } }
                );

                //Realizando transferencia
                cpfLogadoEncontrato.balance -= depositUser;
                await db.Usuario.update(
                    { balance: cpfLogadoEncontrato.balance },
                    { where: { cpf: cpfLogadoEncontrato.cpf } }
                );
            }

            return res
            .status(201)
            .json({ message: 'Depósito realizado com sucesso.' });
        } catch (error) {
            return {
                status:400,
                message:'Não foi possível realizar o depósito.' 
            };
        }
    },

    withdrawPost: async (req, res) => {
        const withdrawUser = parseInt(req.body.withdraw);

        console.log('withdrawUser', req.body);

        const usuarioEncontrato = await db.Usuario.findByPk(
            req.session.user.user_id
        );

        if (usuarioEncontrato.balance < withdrawUser) {
            return res.status(400).json({ message:'Saldo insuficiente.' });
        }

        usuarioEncontrato.balance -= withdrawUser;

        const withdrawCreate = await db.Usuario.update(
            { balance: usuarioEncontrato.balance },
            { where: { id: usuarioEncontrato.id } }
        );

        return res
        .status(201)
        .json({
            withdrawCreate,
            message: 'Saque realizado com sucesso.',
        });
    },

    transferPost: async (req, res) => {
        try {
            const transferUser = parseInt(req.body.transfer);
            const withdrawCpf = req.body.cpf;
            const cpfLogadoEncontrato = await db.Usuario.findByPk(
                req.session.user.user_id
            );
            const usuarioEncontrato = await db.Usuario.findOne({ where: { cpf: withdrawCpf } });

            console.log('cpfLogadoEncontrato', cpfLogadoEncontrato);

            if (!validatorCPF.cpf.isValid(withdrawCpf)) {
                return res.status(400).json({ message:'CPF inválido.' });
            }

            if (!usuarioEncontrato) {
                return res.status(400).json({ message:'CPF não cadastrado.' });
            }

            if (cpfLogadoEncontrato.balance < transferUser) {
                return res.status(400).json({ message:'Saldo insuficiente.' });
            }

            if (cpfLogadoEncontrato.cpf == withdrawCpf) {
                return res
                .status(400)
                .json({
                    message:
                            'Não pode ser realizada transferência para sua própria conta.',
                });
            }

            //Baixa da transferencia
            usuarioEncontrato.balance += transferUser;
            await db.Usuario.update(
                { balance: usuarioEncontrato.balance },
                { where: { id: usuarioEncontrato.id } }
            );

            //Realizando transferencia
            cpfLogadoEncontrato.balance -= transferUser;
            await db.Usuario.update(
                { balance: cpfLogadoEncontrato.balance },
                { where: { cpf: cpfLogadoEncontrato.cpf } }
            );

            return res
            .status(201)
            .json({ message: 'Transferência realizada com sucesso.' });
        } catch (error) {
            return res
            .status(400)
            .json({ message: 'Erro ao tentar realizar a transferência.' });
        }
    },
};

module.exports = accountController;
