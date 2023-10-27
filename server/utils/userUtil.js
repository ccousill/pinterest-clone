const createUserName = (email) => {
    return email.split('@')[0]
}


module.exports = {
    createUserName
}