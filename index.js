const server  = require('./app')({logger:false});
const { client } = require('./database');
const port = 4000;

(async()=>{
    try{
        await server.listen(port);
    }catch(err){
        server.log.error(err);
        process.exit(1);
    }
})();