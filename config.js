const PORT = 80;
const LOCAL_VARIABLE="localhost:"+PORT;
const GLOBAL_VARIABLE="gelistiricim.herokuapp.com";
module.exports={
    api_secret_key:'gelistiricimSECRETKEY2020!',
    //gelistiricim.herokuapp.com ve ya localhost:3000
    host:GLOBAL_VARIABLE,
    domain:GLOBAL_VARIABLE,
    port:80,
    smtpSetting:{
        host:"smtp.gmail.com",
        port:587,
        email:"y.penava@gmail.com",
        pass:""
    }
};