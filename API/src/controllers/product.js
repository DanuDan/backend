const {product, User, categoryProduct, category} = require ('../../models')

exports.addProduct = async (req, res) => {
    try{
        await product.create(req.body)

        res.send({
            status: 'success',
            message: 'Add product finished',
        })

    }catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            message: 'Server Error'
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const data = await product.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
            { model: category,
                as: 'categories',
                through:{model:categoryProduct,
                as: 'bridge'},
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }}
        ],

            attributes: {
                exclude: ['createdAt', 'updatedAt', 'idUser']
            }
        })

        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUserProduct = async (req, res) => {
    try{
        
        const data = await User.findAll({
            include: {
                model: product,
                as:'userProduct',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'idUser']
                }},
            attributes: {
                    exclude: ['createdAt', 'updatedAt', 'idUser']
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

exports.getProduct = async (req, res) => {
    try{
        const id = req.params.id
        const data = await product.findOne({
            where: {id: id},
            attributes: {exclude: ['createdAt', 'updatedAt']
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

exports.updateProduct = async (req, res) => {
    try{
        const {id} = req.params;
        const newData = req.body;

        const data = await product.findOne({where: {id},
            attributes: {exclude: ['createdAt', 'updatedAt']
        }})
        if (!data){
            return res.send({message: `User with id: ${id} not found`})
        }

        await product.update(newData,{ where: {id:id}})

        res.send({
            status: 'success',
            message: `Update project id: ${id} finished`,
            data,
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

exports.deleteProduct = async (req, res) => {
    try{
        const {id} = req.params;

        const data = await product.findOne({where: {id}})
        if (!data){
            return res.send({message: `User with id: ${id} not found`})
        }

        await product.destroy({where: {id}});

        res.send({
            status: 'success',
            message: `Delete product id:${id} finished`,
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