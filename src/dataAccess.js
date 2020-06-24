import { ipcMain as ipc, ipcRenderer as ipcR } from 'electron-better-ipc'
import Datastore from 'nedb-promises'
import path from 'path'

const isBuild = process.env.NODE_ENV === 'production'

const dataPath = isBuild ? path.join(__dirname, '../data/') : path.join(__static, '../data/')

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
            init: false,
            currency: 'EUR',
            fullscreen: false,
            trayMinimize: false
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
        await db.settings.insert(initSettings)
        await db.accounts.insert(defaultAccount)
        await db.categories.insert(defaultCategory)
    }
}

export async function fetchSettings() {
    return await db.settings.findOne({}).then(data => data).catch(err => err);
}


// Database queries

//methods
export async function updateBalance(data) {
    const account = await db.accounts.findOne({ _id: data._id })
    const value = Number(account.balance) + Number(data.value)
    return await db.accounts.update({ _id: data._id }, { $set: { balance: value } }, { returnUpdatedDocs: true });
}

/**
 * Settings
 */
ipc.answerRenderer('updateCurrency', async (data) => {
    const id = await db.settings.findOne({})
    await db.settings.update({ _id: id._id }, { $set: { currency: data } }, { upsert: true }).catch(err => { throw new Error(err) })
})

ipc.answerRenderer('updateSettings', async (data, win) => {
    const oldSettings = await db.settings.findOne({})
    if (data.hasOwnProperty('currency')) {
        oldSettings.currency = data.currency
    }
    if (data.hasOwnProperty('fullscreen')) {
        oldSettings.fullscreen = data.fullscreen
        data.fullscreen ? win.maximize() : win.restore()
    }
    if (data.hasOwnProperty('trayMinimize')) {
        oldSettings.trayMinimize = data.trayMinimize
    }
    return await db.settings.update({ _id: oldSettings._id }, { $set: oldSettings }, { upsert: true, returnUpdatedDocs: true }).catch(err => { throw new Error(err) })

})


// find

ipc.answerRenderer('fetchTransactions', async () => {
    return await db.transactions.find({}).catch(err => err);
})

ipc.answerRenderer('fetchCategories', async () => {
    return await db.categories.find({}).catch(err => err);
})

ipc.answerRenderer('fetchAccounts', async () => {
    return await db.accounts.find({}).catch(err => err);
})

ipc.answerRenderer('fetchSettings', async () => {
    return await db.settings.findOne({}).then(data => data).catch(err => err);
})

// add

ipc.answerRenderer('addTransaction', async (data, win) => {
    return await db.transactions.insert(data)
        .then(async resolve => {
            const account = await updateBalance({ _id: resolve.account, value: resolve.value })
            await ipc.callRenderer(win, 'updateBalance', account)
            return resolve
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
            const account = await updateBalance({ _id: resolve.account, value: difference })
            await ipc.callRenderer(win, 'updateBalance', account)
            return resolve
        })
        .catch(err => {
            throw new Error(err)
        })
})

ipc.answerRenderer('updateCategory', async (data) => {
    return await db.categories.update({ _id: data._id }, data, { returnUpdatedDocs: true });
})

ipc.answerRenderer('updateAccount', async (data) => {
    return await db.accounts.update({ _id: data._id }, data, { returnUpdatedDocs: true });
})

ipc.answerRenderer('updateBalance', async (data) => {
    const account = await db.accounts.findOne({ _id: data._id })
    const value = account.balance + data.value
    return await db.accounts.update({ _id: data._id }, { $set: { balance: value } }, { returnUpdatedDocs: true });
})


// remove

ipc.answerRenderer('removeTransaction', async (data, win) => {
    const removed = await db.transactions.findOne({ _id: data._id })
    await db.transactions.remove({ _id: data._id })
        .then(async () => {
            const account = await updateBalance({ _id: removed.account, value: -removed.value })
            await ipc.callRenderer(win, 'updateBalance', account)
        })
        .catch(err => {
            throw new Error(err)
        })
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