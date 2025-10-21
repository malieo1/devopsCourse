const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    db.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res) // Return callback
    })
  },
  // get: (username, callback) => {
  //   // TODO create this method
  // }

  get: (username, callback) => {
    if (!username)
      return callback(new Error("Username is required"), null)

    // Get user from DB
    db.hgetall(username, (err, user) => {
      if (err) return callback(err, null)

      // If user not found or empty
      if (!user || Object.keys(user).length === 0)
        return callback(new Error("User does not exist"), null)

      // Return user object
      callback(null, user)
    })
  }
  
}
