var express = require('express');

var path = require('path');
//load customers route
var persons = require('./routes/persons'); 
var app = express();
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
// all environments
app.set('port', process.env.PORT || 4300);
//app.set('views', path.join(__dirname, 'views'));
app.set('views','./views');

app.set('view engine', 'ejs');

//app.use(express.favicon());

app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
// development only

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/
app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        //port : 3306, //port mysql
        database:'node_table',
         debug    : true
    },'request')
);//route index, hello world

var router = express.Router();

router.use(function(req, res, next) {
    //console.log(req.method, req.url);
    next();
});
/*------------------------------------------------------
*  This is router middleware,invoked everytime
*  we hit url /api and anything after /api
*  like /api/user , /api/user/7
*  we can use this for doing validation,authetication
*  for every route started with /api
--------------------------------------------------------*/


app.get('/p',persons.list);


app.get('/p.json', (req, res) => {
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM persons',function(err,rows)     {
            
        if(err){
           console.log("Error Selecting : %s ",err );
     }else{
            
            res.json({data:rows});
           }                
         });
       
    });
});
app.listen(3000);

console.log('3080 is the magic port');
