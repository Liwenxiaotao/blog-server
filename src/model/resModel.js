class BaseModel {
  constructor(data, message) {
    if(typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if(data) {
      this.result = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccsssModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.error = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.error = -1
  }
}

module.exports = {
  SuccsssModel,
  ErrorModel
}