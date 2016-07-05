var configValues = require("./config.json")

module.exports = {

  getDbConnectionString: function() {
    return "mongodb://" + configValues.uname + ":" + configValues.pwd +"@ds013300.mlab.com:13300/todos"
  }

}
