let opt = {};
let ingress = process.env.CITDF_WPAPI || '"http://api-deeze.tk/citdf/wordpress/wp-json"';

console.log("ingress: "+ingress);
opt.NODE_ENV = '"production"';
opt.CITDF_WPAPI = JSON.stringify(ingress);
opt.CITDF_API = '"http://api-deeze.tk:3031"'

module.exports = opt;
