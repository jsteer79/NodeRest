var   Express = require( 'Express' )
    , NodeRest = require( './src/NodeRest.js' )
    , app     = Express();

app.use( Express.logger() );
app.use( Express.bodyParser() );
app.use( Express.static( __dirname + '/public' ) );
NodeRest( app, 'foo' );
NodeRest( app, 'bar' );
app.listen( 8080 );

