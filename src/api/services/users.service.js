const { MongoClient } = require('mongodb');

const DB_URL = 'mongodb://localhost:27017/Cookmaster';
const DB_NAME = 'Cookmaster';

const InternalServerError = require('../exceptions/internal-server-error.exception');

module.exports = {
    create: async (user) => {
        const client = await MongoClient.connect(DB_URL, 
            { useNewUrlParser: true, useUnifiedTopology: true });
    
        const db = client.db(DB_NAME);
        
        try {
            return await db.collection('users').insertOne(user).then(({ ops }) => ops[0]);
        } catch (err) {
            throw InternalServerError(`Not possible to persist' ${err}`);
        } finally {
            client.close();
        }
    },
    
    findByEmail: async (user) => {
        const client = await MongoClient.connect(DB_URL, 
            { useNewUrlParser: true, useUnifiedTopology: true });
    
        const db = client.db(DB_NAME);
    
        try {
             return await db.collection('users').findOne({ email: user.email });
        } catch (err) {
            throw InternalServerError(`Unexpected error: ' ${err}`);
        } finally {
            client.close();
        }
    },        

    login: async (credentials) => {
        const client = await MongoClient.connect(DB_URL, 
            { useNewUrlParser: true, useUnifiedTopology: true });
    
        const db = client.db(DB_NAME);
    
        try {
            return await db.collection('users').findOne({ 
                email: credentials.email, 
                password: credentials.password });
        } catch (err) {
            throw InternalServerError(`Unexpected error: ' ${err}`);
        } finally {
            client.close();
        }
    },        

};
