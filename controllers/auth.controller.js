module.exports.getLogin = (req, res, next) => {}

module.exports.getRegister = (req, res, next) => {
  res.render('auth/register', { title: 'Register here' })
}
