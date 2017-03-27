'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');
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

});