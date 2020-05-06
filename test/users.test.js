/*
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

let token;

describe('/api/users Tests',()=>{
    before((done)=>{
        chai.request(server)
            .post('/api/login')
            .send({
                userName:'test',
                password:'test123'
            })
            .end((err,res)=>{
                token = res.body.token;
                done();
            });
    });

    describe('/GET Users',()=>{
        it('it should GET all the users',(done)=>{
            chai.request(server)
                .get('/api/users')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});*/
