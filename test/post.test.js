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
                password:'123456'
            })
            .end((err,res)=>{
                token = res.body.token;
                done();
            });
    });

    describe('/GET Post',()=>{
        it('it should GET all the post',(done)=>{
            chai.request(server)
                .get('/api/post')
                .set('x-access-token',token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    done();
                });
        });
    });
});