const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')

const userRouter = require('../src/routes/user')

chai.use(chaiHttp)

describe('User REST API', () => {
  let app
    beforeEach(() => {
      // Clean DB before each test
      db.flushdb()
      app = express()
      app.use(express.json())
      app.use('/user', userRouter)
    })
    
    after(() => {
      app.close()
      db.quit()
    })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
    
    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
           throw err
        })
    })
  })

  // describe('GET /user', ()=> {
  //   // TODO Create test for the get method
  // })
  describe('GET /user/:username', () => {
    it('successfully get user', (done) => {
      const user = { username: 'jdoe', firstname: 'John', lastname: 'Doe' }

      // create first
      request(app)
        .post('/user')
        .send(user)
        .expect(201)
        .end((err) => {
          if (err) return done(err)

          // then get it
          request(app)
            .get(`/user/${user.username}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err2, res) => {
              if (err2) return done(err2)
              expect(res.body.status).to.equal('success')
              expect(res.body.user).to.include({
                firstname: user.firstname,
                lastname: user.lastname
              })
              done()
            })
        })
    })

    it('cannot get a user when it does not exist', (done) => {
      request(app)
        .get('/user/nonexistent_user_123')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body.status).to.equal('error')
          expect(res.body.msg.toLowerCase()).to.match(/does not exist/)
          done()
        })
    })
  })
})
