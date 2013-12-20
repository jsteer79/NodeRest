exports = module.exports = GetInstance;

function GetInstance( oExpress, path ) {
    return new NodeRest( oExpress, path );
}

function NodeRest( oExpress, path ) {
    this.path = path;
    this.reset();
    var oThis = this;
    oExpress.get(  '/' + this.path , function( req, res ) { oThis.get( req, res ); } );
    oExpress.del(  '/' + this.path , function( req, res ) { oThis.del( req, res ); } );
    oExpress.post( '/' + this.path , function( req, res ) { oThis.post( req, res ); } );
    oExpress.put(  '/' + this.path , function( req, res ) { oThis.post( req, res ); } );
}

NodeRest.prototype.reset = function() {
    this.thing = 'Initial ' + this.path;
};

NodeRest.prototype.get = function( req, res ) {
    res.status( 200 );
    res.setHeader('Content-Type', 'text/plain' );
    res.setHeader('Content-Length', this.thing.length );
    res.end( this.thing );
};

NodeRest.prototype.post = function( req, res ) {
    if( !req.param( 'thing' ) ) {
        res.status( 400 );
        res.end();
    } else {
        this.thing = req.param( 'thing' );
        this.get( req, res );
    }
};

NodeRest.prototype.del = function( req, res ) {
    this.reset();
    this.get( req, res );
};