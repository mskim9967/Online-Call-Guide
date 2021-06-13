var express = require('express');
var router = express.Router();

var dbConn = require('../database')();
var connection = dbConn.init();

var parser = require('../lyricCallParser')

dbConn.ocg_open(connection);




router.get('/song_idol_cv/search', (req, res) => {
	var sql = 'SELECT * FROM SONG_IDOL NATURAL JOIN CV NATURAL JOIN IDOL NATURAL JOIN SONG';
	
	if(Object.keys(req.query).length !== 0) {
		sql += ' WHERE';
		for(key in req.query)
		sql += ` ${key} LIKE '%${req.query[key]}%' OR`;
		sql = sql.slice(0, -2);
	}
	connection.query(sql, function (error, rows, fields) {
    if (error) {
    	console.log('error : ' + error);
    } 
		else {
			res.json({rows: rows});  
    } 
  });
});

router.get('/song_unit_idol_cv_view/search', (req, res) => {
	var sql = 'SELECT * FROM SONG_UNIT_IDOL_CV_VIEW';
	
	if(Object.keys(req.query).length !== 0) {
		sql += ' WHERE';
		for(key in req.query)
		sql += ` ${key} LIKE '%${req.query[key]}%' OR`;
		sql = sql.slice(0, -2);
	}
	connection.query(sql, function (error, rows, fields) {
    if (error) {
    	console.log('error : ' + error);
    } 
		else {
			res.json({rows: rows});  
    } 
  });
});


router.get('/song_idol_cv', (req, res) => {
	var sql = 'SELECT * FROM SONG_IDOL NATURAL JOIN CV NATURAL JOIN IDOL NATURAL JOIN SONG';
	
	if(Object.keys(req.query).length !== 0) {
		sql += ' WHERE';
		for(key in req.query)
			sql += ' ' + key + '=' + req.query[key] + ' AND';
		sql = sql.slice(0, -3);
	}
	connection.query(sql, function (error, rows, fields) {
    if (error) {
    	console.log('error : ' + error);
    } 
		else {
			res.json({rows: rows});  
    } 
  });
});

router.get('/:table/search', (req, res) => {
	var div = req.params.table.indexOf('_');
	if(div >= 0) 
		var sql = `SELECT * FROM ${req.params.table.substring(0, div).toUpperCase()} NATURAL JOIN ${req.params.table.substring(div + 1, req.params.table.length).toUpperCase()}`;
	else 
		var sql = 'SELECT * FROM ' + req.params.table.toUpperCase();
		
	if(Object.keys(req.query).length !== 0) {
		sql += ' WHERE';
		for(key in req.query)
		sql += ` ${key} LIKE '%${req.query[key]}%' OR`;
		sql = sql.slice(0, -2);
	}
	
	connection.query(sql, function (error, rows, fields) {
		if (error) {
			console.log('error : ' + error);
		} 
		else {
			res.json({rows: rows});
		}
	});
});

router.get('/:table', (req, res) => {

		var sql = 'SELECT * FROM ' + req.params.table.toUpperCase();
	
	if(Object.keys(req.query).length !== 0) {
		sql += ' WHERE';
		for(key in req.query)
			sql += ' ' + key + '=' + req.query[key] + ' AND';
		sql = sql.slice(0, -3);
	}
	
	connection.query(sql, function (error, rows, fields) {
		if (error) {
			console.log('error : ' + error);
		} 
		else {
			res.json({rows: rows});
		}
	});
});


router.get('/img/:table/:id', (req, res) => {
	if(req.params.id !== 'undefined')	res.sendFile(req.params.id+'.webp', { root: __dirname+'/../img/'+req.params.table});
});

router.get('/audio/:id', (req, res) => {
	if(req.params.id !== 'undefined')	res.sendFile(req.params.id+'.mp3', { root: __dirname+'/../audio'});
});

router.get('/lyric_call/:lang/:id', (req, res) => {
	res.json(parser.parse(`${__dirname}/../lyric_call/${req.params.lang}/${req.params.id}`));  
});
module.exports = router;