const Gt06 = require('../gt06');

const location = new Buffer.from('787822221401030d1532cb0596a9ba00e56911001400010601390a004fb40000000052fc540d0a', 'hex')
try {
  var gt06 = new Gt06();
  gt06.parse(location);
  console.log(gt06);
} catch (e) {
  console.log(e);
}
