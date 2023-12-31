const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should(); // Initialize Chai assertion style
const server = require('../app');

chai.use(chaiHttp);

let token,movieID;

describe('Movies TESTS', () => {
    
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: '00', password: '00' })
            .end((err, res) => {
                token = res.body.token;
                console.log(token);
                done();
            });
    });

    describe('/GET movies', () => {
        it('(GET /api/movies) should retrieve movies', (done) => {
            chai.request(server) // Use 'server' to make the request
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an('array'); // Check if the response is an array
                    done();
                });
        });
    });


    describe('/POST movie testing', () => {
        it('it should Post a movie' , (done) => {
            const movie = {
                title : 'Udemy',
                director_id :'652061f6fd6f2eb2f087296a' ,
                category : 'film',
                imdb_score : '32'
            }
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err,res)=> {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('imdb_score');
                   const movieID =  res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:director_id movie', () => {
        it ( 'it should GET a movie by given id', (done) => {
            chai.request(server)
                .get('/api/movies/'+movieID)
                .set('x-access-token', token)
                .end((err,res)=> {
                    res.body.should.have.status(200);
                    res.body.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieID);
                    done();
            })
        });
    });


    describe('/PUT/:director_id update testing', () => {
        it('it should UPDATE a movie' , (done) => {
            const updateMovie = {
                title : '93create',
                director_id :'652061f6fd6f2eb2f087296a' ,
                category : 'cezve',
                imdb_score : '2'
            }
            chai.request(server)
                .put('/api/movies/'+movieID)
                .send(updateMovie)
                .set('x-access-token', token)
                .end((err,res)=> {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(updateMovie.title);
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('imdb_score');
                   


                    done();
                });
        });
    });

    describe('/Delete/:movie_id Delete testing', () => {
        it('should DELETE a movie', (done) => {
            const movieID = '123456789'; // Replace with a valid movie ID
            const movie = {
                title: '93create',
                director_id: '652061f6fd6f2eb2f087296a',
                category: 'cezve',
                imdb_score: '2'
            }
            chai.request(server)
                .delete('/api/movies/' + movieID) // Use the valid movie ID
              
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(1);
                    done();
                });
        });
    });
    
});
