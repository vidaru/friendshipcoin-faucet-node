const chai = require('chai')
const { Should } = require('chai')
const sinonChai = require('sinon-chai')
const chaiSorted = require('chai-sorted')
const chaiPromise = require('chai-as-promised')
const mongoose = require('mongoose')

Should()
chai.use(sinonChai)
chai.use(chaiSorted)
chai.use(chaiPromise)
mongoose.Promise = global.Promise
global.Testers = {}
