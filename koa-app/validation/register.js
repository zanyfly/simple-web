const validator = require("validator")
const isEmpty = require("./isEmpty")
module.exports = function validateRegisterInput(data){
    let errors = {}

    data.name = isEmpty(data.name) ? "" : data.name
    data.email = isEmpty(data.email) ? "" : data.email
    data.password = isEmpty(data.password) ? "" : data.password
    data.password2 = isEmpty(data.password2) ? "" : data.password2
    if(!validator.isLength(data.name, {min:2, max:30})){
        errors.name = "the name must be exceed 2 length"
    }else if(validator.isEmpty(data.name)){
        errors.name = "name cannot be empty"
    }else if(validator.isEmpty(data.email)){
        errors.email = "email cannot be empty"
    }else if(!validator.isEmail(data.email)){
        errors.email = "email is not right"
    }else if(validator.isEmpty(data.password)){
        errors.password = "password cannot be empty"
    }else if(!validator.isLength(data.password, {min:6, max:30})){
        errors.password = "the password must be exceed 6 length"
    }else if(!validator.isLength(data.password2, {min:6, max:30})){
        errors.password2 = "the password2 must be exceed 6 length"
    }else if(!validator.equals(data.password, data.password2)){
        errors.password2 = "the password must be equal t0 password2"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}