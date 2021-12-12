const bcrypt = require('bcryptjs')

const tools = {
    //同步方法，下面的使用没有问题
    // encrypt(password){
    //     var salt = bcrypt.genSaltSync(10);
    //     var hash = bcrypt.hashSync(password, salt);
    //     return hash
    // },

    //学习如何使用promise处理异步方法，以及配合await的使用
     encryption(data) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data, salt, (err, hash) => {
                    if (err) reject(err)
                    resolve(hash)
                })
            })
        })
    },
    compareCrypt(text, cryptText){
        return bcrypt.compareSync(text, cryptText)
    }
    
}

module.exports = tools