exports.list = function(req, res){
  req.getConnection(function(err,connection){
       
     connection.query('SELECT * FROM persons',function(err,rows)     {
            
        if(err){
           console.log("Error Selecting : %s ",err );
     }else{
            res.render('person',{data:rows});
           }                
         });
       
    });
  
};

