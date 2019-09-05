let opt = {};
let ingress = process.env.CITDF_WPAPI || 'http://18.222.190.185/citdf/wordpress/wp-json';

opt.NODE_ENV = '"production"';
opt.CITDF_WPAPI = JSON.stringify(ingress);

module.exports = opt;
