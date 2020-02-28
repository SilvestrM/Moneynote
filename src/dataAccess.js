import { ipcMain as ipc } from 'electron-better-ipc'
import Datastore from 'nedb-promises'

const db = {};

db.transactions = new Datastore({ filename: `src/assets/data/transactions.db`, autoload: true })
db.categories = new Datastore({ filename: `src/assets/data/categories.db`, autoload: true })
db.accounts = new Datastore({ filename: `src/assets/data/accounts.db`, autoload: true })

// Database queries

//methods
async function updateBalance(account, diff) {
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
    await db.transactions.insert(data)
        .then(async () => {
            ipc.callRenderer(win, 'updateBalance', await updateBalance(data.account, data.value))
        })
})
ipc.answerRenderer('addCategory', async (data) => {
    await db.categories.insert(data);
})
ipc.answerRenderer('addAccount', async (data) => {
    await db.accounts.insert(data);
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

ipc.answerRenderer('removeAccount', async (data) => {
    await db.accounts.remove({ _id: data._id });
})

export default {}