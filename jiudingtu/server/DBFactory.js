var mysql=require("mysql");
var Defferd = require('./deffered');
//var queues = require('mysql-queues');

//var pool = mysql.createPool({
//    host: 'mysql56.rdsmv4pzksoikpq.rds.bj.baidubce.com',
//    user: 'jiud_zjd_rot_adm',
//    password: '1q2w3e4rjiudinzjd',
//    database: 'jiudin',
//    port: 3306
//});

var pool = mysql.createPool({
    host: 'jiudin.rdsm8833unmye07.rds.bj.baidubce.com',
    user: 'root1',
    password: '1q2w3e4r',
    database: 'jiudin',
    port: 3306
});

var getConnection = function(){
    return Defferd.Deferred(function(defferd){
        pool.getConnection(function(err, conn){
            if(err){
                console.log(err);
                defferd.reject(err);
            }else{
                defferd.resolve(conn);
                return conn;
            }
        });
    }).promise();
}

var query = function(conn,sql){
    return Defferd.Deferred(function(deffer){
        conn.query(sql, function(qerr, vals, fields){
            if(qerr){
                console.log(qerr);
                deffer.reject(conn, qerr);
            }else{
                deffer.resolve(vals, fields);
            }
        });
    }).promise();
}

var beginTransaction = function(conn){
    return Defferd.Deferred(function(deffer){
        conn.beginTransaction(function(err){
            if(err){
                deffer.reject(err,conn);
            }else{
                deffer.resolve(conn);
                return conn;
            }
        });
    }).promise();
}

var rollback = function(conn){
    return Defferd.Deferred(function(deffer){
        conn.rollback(function(){
            deffer.resolve();
            conn.release();
        });
    }).promise();
}

var commit = function(conn){
    return Defferd.Deferred(function(deffer){
        conn.commit(function(err){
            if(err){
                rollback(conn).then(function(){
                    deffer.reject(err);
                });
            }else{
                conn.release();
                deffer.resolve();
            }
        });
    }).promise();
}

JDB = {
    query: function(sql){
        var q = function(defferd){
            getConnection().then(function(conn){
                return query(conn,sql).then(function(vals, fields){
                    defferd.resolve(vals, fields);
                    return conn;
                });
            }).fail(function(conn, err){
                if(conn && conn.release)conn.release();
                return defferd.reject(err);
            }).done(function(conn){
                conn.release();
            });
        }
        return Defferd.Deferred(q).promise();
    },
    oper: function(sqls){
        return Defferd.Deferred(function(defferd){
            getConnection().then(beginTransaction).then(function(conn){
                var defs = [];
                if(sqls instanceof Array){
                    sqls.forEach(function(sql){
                        defs.push(query(conn, sql));
                    });
                }else{
                    defs.push(query(conn, sqls));
                }
                Defferd.when.apply(Defferd, defs).then(function(){
                    commit(conn).then(function(){
                        defferd.resolve();
                    }).fail(function(conn, err){
                        rollback(conn).then(function(){
                            defferd.reject(err);
                        });
                    });
                }).fail(function(conn, err){
                    rollback(conn).then(function(){
                        defferd.reject(err);
                    });
                });
            }).fail(function(err, conn) {
                conn && conn.rollback(function () {
                    conn.release();
                });
                console.log('error--' + err);
                defferd.reject(err);
            });
        }).promise();
    }
}

module.exports=JDB;