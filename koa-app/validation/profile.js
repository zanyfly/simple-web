const validator = require("validator")
const isEmpty = require("./isEmpty")
module.exports = function validateProfileInput(data){
    let errors = {}

    data.handle = isEmpty(data.handle) ? "" : data.handle
    data.status = isEmpty(data.status) ? "" : data.status
    data.skills = isEmpty(data.skills) ? "" : data.skills

    if(!validator.isLength(data.handle, {min:2, max:30})){
        errors.name = "the handle must be exceed 2 length"
    }else if(validator.isEmpty(data.status)){
        errors.name = "status cannot be empty"
    }else if(validator.isEmpty(data.skills)){
        errors.email = "skills cannot be empty"
    }

    if(!validator.isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website = "website format is wrong"
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}