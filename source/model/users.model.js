
const db = require('../config/db')
const usermodel = {
    getlist: ()=>{
        return new Promise((resolve , reject) =>{
            db.query(`select * from user`, (err, result) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }

            })
        })
    },
    getdetail: (id)=>{
        return new Promise((resolve , reject) =>{
            db.query(`select * from user where id=${id}`, (err, result) =>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }

            })
        })
    },
    insert: (id, email, username)=>{
        console.log(id , email, username)
        return new Promise((resolve , reject) =>{
            connection.query(`insert into user (id,email,username) value ("${id}", "${email}","${username}")`,(err,result)=>{
            
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }

            })
        })
    },
    destroy: (id)=>{
        console.log(id)
        return new Promise((resolve , reject) =>{
            connection.query(`delete from user where id="${id}"`, (err, result)=>{
            
                if(err){
                    
                    reject(err)
                }else{
                    console.log(result)
                    resolve(result)
                }

            })
        })
    },
    update: (id, email, username)=>{
        return new Promise((resolve , reject) =>{
            connection.query(`update user set email="${email}", username="${username}" where id="${id}"` ,(err,result)=>{
                
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }

            })
        })
    },
}
module.exports = usermodel