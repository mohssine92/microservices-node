module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    post: { 
        port: process.env.POST_PORT || 3002,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || '127.0.0.1', // or localhost 
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || 'password',
        database: process.env.MYSQL_DB || 'red_social',
        insecureAuth : true
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001,
    },
    apiToken :process.env.API_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFwaSIsImlhdCI6MTUxNjIzOTAyMn0.yx83Eg8ZzjmDQ4TBYxga4TNtMTmiu9op0eIrOUcLMD4',
    sercret : process.env.SECRETORPRIVATEKEY || 'secrets'

}