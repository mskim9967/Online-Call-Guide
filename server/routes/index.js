var express = require('express');
var router = express.Router();

var mysql_dbc = require('../database')();
var connection = mysql_dbc.init();

mysql_dbc.ocg_open(connection);

router.get('/', (req, res) => {
});

router.get('/song_idol_cv', (req, res) => {
	var sql = 'SELECT * FROM SONG_IDOL INNER JOIN CV ON SONG_IDOL.idol_id=CV.idol_id INNER JOIN IDOL ON SONG_IDOL.idol_id=IDOL.idol_id WHERE song_id=' + req.query.song_id;
	connection.query(sql, function (error, rows, fields) {
    if (error) {
    	console.log('error : ' + error);
    } 
		else {
			res.json({rows: rows});  
    }
  });
});

router.get('/song_unit', (req, res) => {
	var sql = 'SELECT * FROM SONG_UNIT INNER JOIN UNIT ON SONG_UNIT.unit_id=UNIT.unit_id WHERE song_id=' + req.query.song_id;
	connection.query(sql, function (error, rows, fields) {
    if (error) {
    	console.log('error : ' + error);
    } 
		else {
			res.json({row: rows[0]});  
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

// router.get('/:table/:id', (req, res) => {
// 	var sql = 'SELECT * FROM ' + req.params.table.toUpperCase() + ' WHERE ' + req.params.table + '_id=' + req.params.id;
// 	connection.query(sql, function (error, rows, fields) {
//     if (error) {
//     	console.log('error : ' + error);
//     } 
// 		else {
// 			res.json({row: rows[0]});  
//     }
//   });
// });





router.get('/img/:table/:id', (req, res) => {
	res.sendFile(req.params.id+'.webp', { root: __dirname+'/../img/'+req.params.table});
});



module.exports = router;