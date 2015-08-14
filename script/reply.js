exports.isMatch = function( msg ){ return /Lapis/i.test( msg ); }

exports.exec = function( lapis, channel, message )
{
	channel.send( "Hi! Do you need something?" );
}