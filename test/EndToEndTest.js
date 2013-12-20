var should  = require('should'); 
var assert  = require('assert');
var request = require('supertest');
var nimble  = require('nimble');
var url     = 'http://localhost:8080';

describe( 'NodeRest - del is tested by inference in the before'
		, function() {
			var resetInstance = function( path, complete ) {
				request(url).del(path)
	  						.expect(200, complete );
			};
			
			beforeEach( function( done ) {
				nimble.series( [ function( complete ) { resetInstance( '/foo', complete ); }
							   , function( complete ) { resetInstance( '/bar', complete ); }
							   , function( complete ) { done(); complete(); }
				               ] );
			} );
			
			it( 'should return the initial value'
			  , function( done ) {
				  request(url).get('/foo')
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
			
			it( 'should update the value on post'
			  , function( done ) {
				  request(url).post( '/foo' )
				  			  .send( { thing: 'badger' } )
				  			  .expect( 'Content-Type', /text/ )
		                      .expect( 200 )
				  			  .end( function( err, res ) {
				  				  if (err) {
				  					  throw err;
				  				  }
				  				  res.text.should.equal( 'badger' );
				  				  done();
				  			  	} );
			  } );
			
			it( 'should remember the posted value'
					  , function( done ) {
						  request(url).post( '/foo' )
						  			  .send( { thing: 'badger' } )
						  			  .expect( 'Content-Type', /text/ )
				                      .expect( 200 )
						  			  .end( function( err, res ) {
						  				  if (err) {
						  					  throw err;
						  				  }
						  				  res.text.should.equal( 'badger' );
						  				  request(url).get('/foo')
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
			
			it( 'should have the same behaviour on put as post'
					  , function( done ) {
						  request(url).put( '/foo' )
						  			  .send( { thing: 'badger' } )
						  			  .expect( 'Content-Type', /text/ )
				                      .expect( 200 )
						  			  .end( function( err, res ) {
						  				  if (err) {
						  					  throw err;
						  				  }
						  				  res.text.should.equal( 'badger' );
						  				  request(url).get('/foo')
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
			
			it( 'should return bad request when thing is missing'
					  , function( done ) {
						  request(url).post( '/foo' )
				                      .expect( 400 )
						  			  .end( function( err, res ) {
						  				  if (err) {
						  					  throw err;
						  				  }
						  				  done();
						  			  	} );
					  } );
			
			it( 'should not be effected by posts to a different mounted version'
					  , function( done ) {
						  request(url).post( '/foo' )
						  			  .send( { thing: 'badger' } )
						  			  .expect( 'Content-Type', /text/ )
				                      .expect( 200 )
						  			  .end( function( err, res ) {
						  				  if (err) {
						  					  throw err;
						  				  }
						  				  res.text.should.equal( 'badger' );
						  				  request(url).get('/bar')
								  			  .expect('Content-Type', /text/)
							                  .expect(200)
								  			  .end( function( err, res ) {
								  				  if (err) {
								  					  throw err;
								  				  }
								  				  res.text.should.equal( 'Initial bar' );
								  				  done();
								  			  	} );
						  			  	} );
					  } );
		} );