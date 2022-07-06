const {product, User, categoryProduct, category} = require ('../../models')

exports.addCategory = async (req, res) => {
    try{
        await category.create(req.body)

        res.send({
            status: 'success',
            message: 'Add category finished',
        })

    }catch (error) {
        console.log(error)
        res.send({
            status:'failed',
            message: 'Server Error'
        })
    }
}

exports.getCategories = async (req, res) => {
    try{
        
        const data = await category.findAll({
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

exports.updateCategory = async (req, res) => {
    try{
        const {id} = req.params;
        const newData = req.body;

        const data = await category.findOne({where: {id}})
        if (!data){
            return res.send({message: `User with id: ${id} not found`})
        }

        await category.update(newData,{ where: {id:id}})

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

exports.getCategory = async (req, res) => {
    try{
        const id = req.params.id
        const data = await category.findOne({
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

exports.deleteCategory = async (req, res) => {
    try{
        const {id} = req.params;

        const data = await category.findOne({where: {id}})
        if (!data){
            return res.send({message: `User with id: ${id} not found`})
        }

        await category.destroy({where: {id}});

        res.send({
            status: 'success',
            message: `Delete category id:${id} finished`,
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

exports.getProductsCategories = async (req, res) => {
    try{
        
        const data = await categoryProduct.findAll({
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