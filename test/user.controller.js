const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    // it('avoid creating an existing user', (done)=> {
    //   // TODO create this test
    //   // Warning: the user already exists
    //   done()
    // })
  })

  // TODO Create test for the get method
  // describe('Get', ()=> {
  //   
  //   it('get a user by username', (done) => {
  //     // 1. First, create a user to make this unit test independent from the others
  //     // 2. Then, check if the result of the get method is correct
  //     done()
  //   })
  //
  //   it('cannot get a user when it does not exist', (done) => {
  //     // Chech with any invalid user
  //     done()
  //   })
  //
  // })
    // TODO Create test for the get method
    describe('Get', ()=> {

      it('get a user by username', (done) => {
        // 1) create a user first (test independence)
        const user = {
          username: 'jdoe',
          firstname: 'John',
          lastname: 'Doe'
        }
  
        userController.create(user, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')
  
          // 2) now fetch it
          userController.get(user.username, (err2, fetched) => {
            expect(err2).to.be.equal(null)
            expect(fetched).to.be.an('object')
            expect(fetched).to.have.property('username', user.username)
            expect(fetched).to.have.property('firstname', user.firstname)
            expect(fetched).to.have.property('lastname', user.lastname)
            done()
          })
        })
      })
  
      it('cannot get a user when it does not exist', (done) => {
        userController.get('unknown_user_xyz', (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(result).to.be.equal(null)
          done()
        })
      })
  
    })
  
})
