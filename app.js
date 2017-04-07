var
childProc   = require('child_process'),
fs          = require('fs'),
http        = require('http'),
socketio    = require('socket.io'),
exec        = childProc.exec,
app         = {
    init:function(){
        app.monitor.nginx();
        return false;
    },
    monitor:{
        nginx:function(){
            //check for nginx process
            if(!fs.existsSync('/var/run/nginx.pid')){
                //nginx is not running, start it
                console.log('STARTING NGINX');

                var nginx = exec('nginx');
                console.log(nginx);
                    fs.writeFileSync('/var/run/nginx.pid','123');
                nginx.stdout.on('data', function(data) {
                    console.log('NGINX DATA: ' + data);
                });
                nginx.stderr.on('data', function(data) {
                    console.log('NGINX ERROR: ' + data);
                });
                nginx.on('close', function(code) {
                    console.log('NGINX CLOSE: ' + code);
                });
                return;
            }
            setTimeout(app.monitor.nginx,1000);
        }
    }
};
app.init();