let opt = {};
let ingress = process.env.CITDF_WPAPI || 'http://api-deeze.tk/citdf/wordpress/wp-json';

opt.NODE_ENV = '"production"';
opt.CITDF_WPAPI = JSON.stringify(ingress);

module.exports = opt;
