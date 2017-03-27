'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');
const fs = require('fs');
const assert = chai.assert;

chai.use(chaiHttp);

describe('Endpoints', () => {

    describe('GET /', () => {

        it('returns status 200', (done) => {

            chai.request(server)
                .get('/')
                .end((err, res) => {

                    assert.strictEqual(res.status, 200);

                    done();

                });

        });

    });

    describe('POST /fileInfo', () => {

        it('returns a JSON with the file size when receives a file uploaded', (done) => {

            chai.request(server)
                .post('/fileInfo')
                .attach('archive', fs.readFileSync(__dirname + '/test-file.txt'), 'test-file.txt')
                .end((err, res) => {

                    assert.strictEqual(res.status, 200);
                    assert.strictEqual(res.body.size, 10);

                    done();

                })

        });

        it('returns an error when receives no file', (done) => {

            chai.request(server)
                .post('/fileInfo')
                .end((err, res) => {

                    assert.strictEqual(res.status, 500);
                    assert.strictEqual(res.body.error, 'Please, submit a file');

                    done();

                });

        });

    });

});