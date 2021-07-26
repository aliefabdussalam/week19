const usermodel = require('../model/users.model')
const user = {

    getlist:(req, res) =>{
        try {
           usermodel.getlist().then((result)=>{
               res.json(result)
           }).catch((err)=>{
            res.json(err)
           })
        } catch (error) {
            res.json(error)
        }
    },
    getdetail:(req, res)=>{
        const id = req.params.id
        try {
            usermodel.getdetail(id).then((result)=>{
                res.json(result)
            }).catch((err)=>{
             res.json(err)
            })
         } catch (error) {
             res.json(error)
         }
    },
    insert:(req, res)=>{
        try {
            const body = req.body
            const id = body.id
            const email = body.email
            const username = body.username 
            usermodel.insert(id, email, username).then((result)=>{
                res.json(result)
            }).catch((err)=>{
                res.json(err)
            })
        } catch (err) {
            console.log(err)
        }  
    },
    destroy:(req, res)=>{
        try {
            const id = req.params.id
            usermodel.destroy(id).then((result)=>{
                res.json(result)
            }).catch((err)=>{
                res.json(err)
            })
        } catch (err) {
            console.log(err)
        }
    },
    update:(req, res)=>{
        try {
            const body = req.body
            const id = req.params.id
            const email = body.email
            const username = body.username 
            usermodel.update(id, email, username).then((result)=>{
                res.json(result)
            }).catch((err)=>{
                res.json(err)
            })
        } catch (err) {
            console.log(err)
        }
    }
}
module.exports = user