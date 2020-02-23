import { ipcMain } from 'electron'
import Datastore from 'nedb'

const db = {};

db.transactions = new Datastore({ filename: `src/assets/data/transactions.db`, autoload: true })
db.categories = new Datastore({ filename: `src/assets/data/categories.db`, autoload: true })
db.accounts = new Datastore({ filename: `src/assets/data/accounts.db`, autoload: true })

// Database queries

// find

ipcMain.on("findQuery", (e, type) => {
    switch (type) {
        case "transactions":
            db.transactions.find({}, (err, docs) => {
                e.sender.send("findQueryTs", docs)
            })
            break;
        case "category":
            db.categories.find({}).sort({ name: 1 }).exec((err, docs) => {
                e.sender.send("findQueryCy", docs)
            })
            break;
        case "accounts":
            db.accounts.find({}).sort({ name: 1 }).exec((err, docs) => {
                e.sender.send("findQueryAc", docs)
            })
            break;
    }
})

// add

ipcMain.on("addQuery", (e, type, data) => {
    switch (type) {
        case "transactions":
            db.transactions.insert(data, (err) => { e.sender.send("error", err); console.log(`${type} error`, err); });
            break;
        case "category":
            db.categories.insert(data, (err) => { e.sender.send("error", err); console.log(`${type} error 1`, err); });
            break;
        case "account":
            db.accounts.insert(data, (err) => { e.sender.send("error", err); console.log(`${type} error`, err); });
            break;
    }
})

// remove

ipcMain.on("removeQuery", (e, type, data) => {
    switch (type) {
        case "transactions":
            db.transactions.remove({ _id: data._id }, (err) => { e.sender.send("error", err); console.log(`${type} error`, err); })
            break;
        case "category":
            db.categories.remove({ _id: data._id }, (err) => { e.sender.send("error", err); console.log(`${type} error`, err); })
            db.transactions.update({ category: { _id: data._id } }, { $set: { category: { _id: null, name: "Deleted Category!!" } } }, { multi: true }, (err, num) => { e.sender.send("error", err); console.log(`${type} error`, err, num); })
            break;
        case "account":
            db.accounts.remove({ _id: data._id }, (err) => { e.sender.send("error", err); console.log(`${type} error`, err); })
            break;

    }
})

// update 

ipcMain.on("updateQuery", (e, type, data) => {
    switch (type) {
        case "transactions":
            db.transactions.update({ _id: data._id }, data, (err) => { e.sender.send("error", err); console.log(`${type} error`, err); })
            break;
        case "category":
            db.categories.update({ _id: data._id }, data, (err) => { e.sender.send("error", err); console.log(`${type} error`, err); })
            break;
        case "account":
            db.accounts.update({ _id: data._id }, data, (err) => { e.sender.send("error", err); console.log(`${type} error`, err); })
            break;
    }
})

export default {}