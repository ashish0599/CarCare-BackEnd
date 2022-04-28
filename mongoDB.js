const {MongoClient} = require ("mongodb")
const client = new MongoClient(process.env.MONGODB_URL);
module.exports = {
    db : null ,
    userData : null,
    appointment : null,
    async  connect(){
        await client.connect()
        console.log("connected to" , process.env.MONGODB_URL)
        this.db = client.db(process.env.MONGODB_NAME)
        console.log("connected to " , process.env.MONGODB_NAME)
        this.userData = this.db.collection("userData")
        this.appointment = this.db.collection("appointment")
    }
}
