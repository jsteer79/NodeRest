var should  = require('should'); 
var assert  = require('assert');
var request = require('supertest');
var express = require('express');
var NodeRest = require( '../src/NodeRest.js' );

describe( 'Inline Test'
		, function() {
			it( 'should return the initial value'
			  , function( done ) {
				  var app = express();
				  NodeRest(app, 'foo' );
				  
				  request(app).get('/foo')
				  			  .expect('Content-Type', /text/)
			                  .expect(200)
				  			  .end( function( err, res ) {
				  				  if (err) {
				  					  throw err;
				  				  }
				  				  res.text.should.equal( 'Initial foo' );
				  				  done();
				  			  	} );
			  } );
			
			it( 'should return the initial value - badger'
					  , function( done ) {
						  var app = express();
						  NodeRest(app, 'badger' );
						  
						  request(app).get('/badger')
						  			  .expect('Content-Type', /text/)
					                  .expect(200)
						  			  .end( function( err, res ) {
						  				  if (err) {
						  					  throw err;
						  				  }
						  				  res.text.should.equal( 'Initial badger' );
						  				  done();
						  			  	} );
					  } );
			
			it( 'should remember the posted value'
					  , function( done ) {
						  var app = express();
						  app.use( express.json() )
						     .use( express.urlencoded() );
						  NodeRest(app, 'foo' );
						  
						  request(app).post( '/foo' )
						  			  .send( { thing: 'badger' } )
						  			  .expect( 'Content-Type', /text/ )
				                      .expect( 200 )
						  			  .end( function( err, res ) {
						  				  if (err) {
						  					  throw err;
						  				  }
						  				  res.text.should.equal( 'badger' );
						  				  request(app).get('/foo')
								  			  .expect('Content-Type', /text/)
							                  .expect(200)
								  			  .end( function( err, res ) {
								  				  if (err) {
								  					  throw err;
								  				  }
								  				  res.text.should.equal( 'badger' );
								  				  done();
								  			  	} );
						  			  	} );
					  } );
		} );