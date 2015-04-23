var _ = require('lodash');
var errors = require('../errors');
var nacl = require('tweetnacl');
var Seed = require('payshares-lib/src/js/ripple/seed').Seed;

function generateKeyPair(seed) {
  if(seed){
    seed = new Seed().parse_json(seed);
  } else {
    seed = new Seed().random();
  }
  var keyPair = seed.get_key();
  var address = keyPair.get_address();

  var publicKey = nacl.util.encodeBase64(keyPair._pubkey);
  var secretKey = nacl.util.encodeBase64(keyPair._secret);

  return {
    address: address.to_json(),
    secret: seed.to_json(),
    secretKey: secretKey,
    publicKey: publicKey
  };
}

module.exports = {
  generateKeyPair: generateKeyPair
};
