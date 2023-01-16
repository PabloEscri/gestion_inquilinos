exports.KeyrockTokenValid = function (time) {
  var tokenExpirado = false;
  if (moment() - time > 0) {
    tokenExpirado = true;
  }

  
  return tokenExpirado;
};
