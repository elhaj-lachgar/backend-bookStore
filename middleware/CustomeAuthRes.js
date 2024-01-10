

function CustomeAuthResponse ( res , user , token ){
    const ResObj = user ;
    ResObj.password = undefined ;
    ResObj.ChangePasswordAt = undefined ;
    return res.status(201).json({data : ResObj , token})
}

module.exports = CustomeAuthResponse