const {User, profile} = require ('../../models')
const user = require('../../models/user')

exports.addUser = async (req, res) => {
    try{
        await User.create(req.body)

        res.send({
            status: 'success',
            message: 'Add user finished',
            data,
        })

    }catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            message: 'Server Error'
        })
    }
}

exports.getUsers = async (req, res) => {
    try{
        
        const data = await User.findAll({
            include: {
            model: profile,
            as:'profile',attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }},
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
        })

        res.send({
            status: 'success',
            data,
        })

    }catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            message: 'Server Error'
        })
    }
}

exports.getUser = async (req, res) => {
    try{
        const id = req.params.id
        const data = await User.findOne({
            where: {id: id},
            attributes: {exclude: ['createdAt', 'updatedAt', 'password']
        }})

        res.send({
            status: 'success',
            data,
        })

    }catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            message: 'Server Error'
        })
    }
}

exports.updateUser = async (req, res) => {
    try{
        const {id} = req.params;
        const newData = req.body;

        const data = await User.findOne({where: {id}})
        if (!data){
            return res.send({message: `User with id: ${id} not found`})
        }

        await User.update(newData,{ where: {id:id}})

        res.send({
            status: 'success',
            message: `Update user id: ${id} finished`,
            data: req.body,
        })
    }
     catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            message: 'Server Error'
        })
    }
}

exports.deleteUser = async (req, res) => {
    try{
        const {id} = req.params;

        const data = await User.findOne({where: {id}})
        if (!data){
            return res.send({message: `User with id: ${id} not found`})
        }

        await User.destroy({where: {id}});

        res.send({
            status: 'success',
            message: `Delete user id:${id} finished`,
            data: req.body,
        })

    }catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            message: 'Server Error'
        })
    }
}

exports.getProfile = async (req, res) => {
    try{
        
        const data = await profile.findAll({
            include: {
                model: User,
                as:'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        res.send({
            status: 'success',
            data,
        })

    }catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            message: 'Server Error'
        })
    }
}

exports.updateProfile = async (req, res) => {
    try{
        const {id} = req.params;
        const newData = req.body;

        const data = await profile.findOne({where: {id},
            attributes: {exclude: ['createdAt', 'updatedAt', 'password']
        }})
        if (!data){
            return res.send({message: `User with id: ${id} not found`})
        }

        await profile.update(newData,{ where: {id:id}})

        res.send({
            status: 'success',
            message: `Update user id: ${id} finished`,
            data: req.body,
        })

    }catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            message: 'Server Error'
        })
    }
}