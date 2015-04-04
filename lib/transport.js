var clone = require('./utils').clone;

var http = require('http');

var options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

/*
hostname: 'www.google.com',
    port: 80,
    path: '/upload',*/

var createRequest = function(config, obj, cb) {
    var requestOpt = clone(options)
    requestOpt.hostname = config.hostname
    requestOpt.port = config.port
    requestOpt.path = config.path
    requestOpt.headers["Content-Length"] = JSON.stringify(obj).length

    cb({options : requestOpt, body : JSON.stringify(obj)});
};

var httpClient = function(request, cb) {
    var req = http.request(request.options, cb);
    req.write(request.body);
    req.end();
};

module.exports = {
    createRequest : createRequest,
    httpClient : httpClient
};