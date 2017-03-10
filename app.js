var express=require('express');
var app=express();
var path = require("path");
var mysql = require('mysql');
var bodyParser=require('body-parser');
var id_usuario=1;

app.use(express.static(path.resolve(__dirname,'css')));
app.use(express.static(path.resolve(__dirname,'js')));
app.use(express.static(path.resolve(__dirname, 'img')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs'); 

app.post("/consolidar",function(req,res){
    var cons_id_loja=req.body.cons_id_loja;
    var cons_selecionado=req.body.cons_selecionado;
    
   
    var connection = mysql.createConnection({
                            host     : '104.196.222.196',
                            user     : 'newtech',
                            password : 'newtech',
                            database : 'indicadores'});

    connection.connect(function(err){
        if(err) throw err;
        
        connection.query('delete from filtro_lojas where id_usuario=?',[id_usuario],function(err){
            if (err) throw err;    
        });
        
        for(i in cons_id_loja){
            if(cons_selecionado[i]=='1')
                {
                        connection.query('insert into filtro_lojas (id_usuario,id_loja) values (?,?)',[id_usuario,cons_id_loja[i]],function(err){
                            if (err) throw err;                            
                    });        
                }
        }
        
        connection.query('call buscaDados(?,?)',[1,id_usuario],function(err,rows){
        if(err) throw err;
            
        var top5vendedores=JSON.stringify(rows[0]);            
        var top5produtos=JSON.stringify(rows[1]);
        var top5grupos=JSON.stringify(rows[2]);
        var indicadores=JSON.stringify(rows[3]);
        var lojas=JSON.stringify(rows[4]);

        var valores={"tipo" : "Dia",
             "top5vendedores" : top5vendedores,
             "top5produtos" : top5produtos,
             "top5grupos" : top5grupos,
             "indicadores" : JSON.parse(indicadores),
             "lojas" : JSON.parse(lojas)};  

        res.render('dia',valores);
        
        connection.end();        
    });
});
});


app.post('/comparativoDias',function(req,res){
        
    var parametros=req.body;
    var datas=parametros.compDias_datas.split(',');
    var ids_lojas=parametros.compDias_id_loja;
    var selecionados=parametros.compDias_selecionado;
            
    //console.log(datas);
    //console.log(ids_lojas);
    //console.log(selecionados);
    
    var connection = mysql.createConnection({
                            host     : '104.196.222.196',
                            user     : 'newtech',
                            password : 'newtech',
                            database : 'indicadores'});
    
    
    connection.connect(function(err){
        if(err) throw err;
        
        connection.query('delete from filtro_lojas_movimentos_dia where id_usuario=?',[id_usuario],function(err){
            if (err) throw err;                
        });
        
        connection.query('delete from filtro_lojas_filtro_dias where id_usuario=?',[id_usuario],function(err){
            if (err) throw err;    
        });
            
        for(i in ids_lojas) {
            if(selecionados[i]=='1')
                {
                    connection.query('insert into filtro_lojas_movimentos_dia (id_usuario,id_loja) values (?,?)',
                         [id_usuario,ids_lojas[i]],function(err){
                                if (err) throw err;                            
                            });
                }            
        }
            
        for(i in datas)
            {
                var dia=datas[i].slice(0,2);
                var mes=datas[i].slice(3,5);
                var ano=datas[i].slice(6,10);
                                
                var dataSel=new Date(ano + "-" + mes + "-" + dia + " 00:00:00");
                                
                connection.query('insert into filtro_lojas_filtro_dias (id_usuario,data_selecionada) values (?,?)',                     [id_usuario,dataSel],function(err){
                                        if (err) throw err;                            
                    });
            }
        
        connection.query('call buscaDados(?,?)',[4,id_usuario],function(err,rows){
            if(err) throw err;
                
            var valores=JSON.stringify(rows[0]);            
            res.json(JSON.parse(valores));
        }); 
        
    });
            
   // var testeRetJson={"teste1" : "33", "teste3" : "55"};
    //res.json(JSON.stringify(testeRetJson));
});


app.post('/comparativoMeses',function(req,res){

});

app.post('/comparativoHoje',function(req,res){

});

app.get("/dia",function(req,res){    
            
   var connection = mysql.createConnection({
                            host     : '104.196.222.196',
                            user     : 'newtech',
                            password : 'newtech',
                            database : 'indicadores'});

    connection.connect(function(err){
        if(err) throw err;
        
        connection.query('call buscaDados(?,?)',[1,id_usuario],function(err,rows){
            if(err) throw err;
        
                var top5vendedores=JSON.stringify(rows[0]);            
                var top5produtos=JSON.stringify(rows[1]);
                var top5grupos=JSON.stringify(rows[2]);
                var indicadores=JSON.stringify(rows[3]);
                var lojas=JSON.stringify(rows[4]);
            
            var valores={"tipo" : "Dia",
                 "top5vendedores" : top5vendedores,
                 "top5produtos" : top5produtos,
                 "top5grupos" : top5grupos,
                 "indicadores" : JSON.parse(indicadores),
                 "lojas" : JSON.parse(lojas)};  
    
                res.render('dia',valores);
        });
        
        connection.end();        
    });          
});

app.get("/mes",function(req,res){
            
    var connection = mysql.createConnection({
                            host     : '104.196.222.196',
                            user     : 'newtech',
                            password : 'newtech',
                            database : 'indicadores'});

    connection.connect(function(err){
        if(err) throw err;
        
        connection.query('call buscaDados(?,?)',[2,id_usuario],function(err,rows){
           if(err) throw err;
            
                var top5vendedores=JSON.stringify(rows[0]);            
                var top5produtos=JSON.stringify(rows[1]);
                var top5grupos=JSON.stringify(rows[2]);
                var indicadores=JSON.stringify(rows[3]);
                var lojas=JSON.stringify(rows[4]);
                        
                var valores={"tipo" : "Mês",
                 "top5vendedores" : top5vendedores,
                 "top5produtos" : top5produtos,
                 "top5grupos" : top5grupos,
                 "indicadores" : JSON.parse(indicadores),
                 "lojas" : JSON.parse(lojas)};  
            
                res.render('dia',valores);
        });
        
        connection.end();        
    });       
});

app.get("/ano",function(req,res){
   var connection = mysql.createConnection({
                            host     : '104.196.222.196',
                            user     : 'newtech',
                            password : 'newtech',
                            database : 'indicadores'});

    connection.connect(function(err){
        if(err) throw err;
        
        connection.query('call buscaDados(?,?)',[3,id_usuario],function(err,rows){
           if(err) throw err;
            
                var top5vendedores=JSON.stringify(rows[0]);            
                var top5produtos=JSON.stringify(rows[1]);
                var top5grupos=JSON.stringify(rows[2]);
                var indicadores=JSON.stringify(rows[3]);
                var lojas=JSON.stringify(rows[4]);
            
                var valores={"tipo" : "Ano",
                 "top5vendedores" : top5vendedores,
                 "top5produtos" : top5produtos,
                 "top5grupos" : top5grupos,
                 "indicadores" : JSON.parse(indicadores),
                 "lojas" : JSON.parse(lojas)};  
    
                res.render('dia',valores);
        });
        
        connection.end();        
    });       
});

app.get("/login",function(req,res){
    res.render('login');
});

app.use(function(req,res){
    res.status(404).send("Arquivo não encontrado!");    
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});