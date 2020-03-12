import { ipcMain as ipc } from 'electron-better-ipc'
import Datastore from 'nedb-promises'
import path from 'path'

const isBuild = process.env.NODE_ENV === 'production'

const dataPath = path.join(
    isBuild ? __dirname : __static,
    '../data/',
)
const db = {};


db.settings = new Datastore({ filename: `${dataPath}settings.db`, autoload: true })
db.transactions = new Datastore({ filename: `${dataPath}transactions.db`, autoload: true })
db.categories = new Datastore({ filename: `${dataPath}categories.db`, autoload: true })
db.accounts = new Datastore({ filename: `${dataPath}accounts.db`, autoload: true })

// First Launch
//if (isBuild) {
export async function initData() {
    //console.log(await db.settings.findOne({ init: false }).then(res => { return res }));
    if (await db.settings.findOne({ init: false }).then(res => { return res }) === null) {
        const initSettings = {
            init: false
        }
        const defaultAccount = {
            name: "default",
            type: "bank",
            currency: "CZK",
            description: "This is a default account",
            balance: 0
        }
        const defaultCategory = {
            name: "default",
            description: "",
            color: 0
        }
        db.settings.insert(initSettings)
        db.accounts.insert(defaultAccount)
        db.categories.insert(defaultCategory)
    }
}
//}


// Database queries

//methods
export async function updateBalance(account, diff) {
    return await db.accounts.findOne({ _id: account })
        .then(async (resolve) => {
            const newBalance = parseFloat(resolve.balance) + diff
            return await db.accounts.update({ _id: account }, { $set: { balance: newBalance } }, { returnUpdatedDocs: true });
        })
}

// find

ipc.answerRenderer('fetchTransactions', async () => {
    return await db.transactions.find({}).catch(err => {
        return err
    });
})

ipc.answerRenderer('fetchCategories', async () => {
    return await db.categories.find({})
})

ipc.answerRenderer('fetchAccounts', async () => {
    return await db.accounts.find({})
})

// add

ipc.answerRenderer('addTransaction', async (data, win) => {
    return await db.transactions.insert(data)
        .then(async (response) => {
            ipc.callRenderer(win, 'updateBalance', await updateBalance(data.account, data.value))
            return response
        })
})
ipc.answerRenderer('addCategory', async (data) => {
    return await db.categories.insert(data)
})
ipc.answerRenderer('addAccount', async (data) => {
    return await db.accounts.insert(data);
})


// update 

ipc.answerRenderer('updateTransaction', async (data, win) => {
    const old = await db.transactions.findOne({ _id: data._id })
    const difference = data.value - old.value

    return await db.transactions.update({ _id: data._id }, data, { returnUpdatedDocs: true })
        .then(async (resolve) => {
            ipc.callRenderer(win, 'updateBalance', await updateBalance(resolve.account, difference))
            return resolve
        })
        .catch(err => {
            throw err
        })
})

ipc.answerRenderer('updateCategory', async (data) => {
    return await db.categories.update({ _id: data._id }, data, { returnUpdatedDocs: true });
})

ipc.answerRenderer('updateAccount', async (data) => {
    return await db.accounts.update({ _id: data._id }, data, { returnUpdatedDocs: true });
})

// remove

ipc.answerRenderer('removeTransaction', async (data) => {
    await db.transactions.remove({ _id: data._id });
})

ipc.answerRenderer('removeCategory', async (data) => {
    await db.categories.remove({ _id: data._id });
})

ipc.answerRenderer('removeAccount', async (data, win) => {
    await db.transactions.remove({ account: data._id }, { multi: true })
        .then(async () => {
            await db.accounts.remove({ _id: data._id })
            ipc.callRenderer(win, 'removeTransactions', data._id)

        }
        );
})

export default {}