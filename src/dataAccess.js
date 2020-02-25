import { ipcMain, contextBridge } from 'electron'
import { ipcMain as ipc } from 'electron-better-ipc'
import Datastore from 'nedb-promises'

const db = {};

db.transactions = new Datastore({ filename: `src/assets/data/transactions.db`, autoload: true })
db.categories = new Datastore({ filename: `src/assets/data/categories.db`, autoload: true })
db.accounts = new Datastore({ filename: `src/assets/data/accounts.db`, autoload: true })

// Database queries

// find

ipc.answerRenderer('fetchTransactions', async () => {
    return await db.transactions.find({}, (err) => {
    })
})

ipc.answerRenderer('fetchCategories', async () => {
    return await db.categories.find({}, (err) => {
    })
})

ipc.answerRenderer('fetchAccounts', async () => {
    return await db.accounts.find({}, (err) => {
    })
})


/*ipcMain.on("findQuery", (e, type) => {
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
})*/

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