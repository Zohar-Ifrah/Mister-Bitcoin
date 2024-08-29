const { getCollection, toObjectId } = require('../../services/db.service')
const logger = require('../../services/logger.service')
const { ObjectId } = require('mongodb')

const COLLECTION_NAME = 'user'

module.exports = {
    query,
    add,
    get,
    update,
    remove,
    // removeALl
}

async function query(queryParams) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const users = await collection.find(queryParams).toArray()
        return users
    } catch (err) {
        logger.error('Error querying users:', err)
        throw err
    }
}

async function add(user) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const userModel = _createUserModel(user)
        const doc = await collection.insertOne(userModel)

        return doc.ops[0]
    } catch (err) {
        logger.error('Error adding user:', err)
        throw err
    }
}

async function get(userId) {
    try {
        if (!ObjectId.isValid(userId)) {
            console.error('Invalid ObjectId format:', userId)
            return null
        }
        const collection = await getCollection(COLLECTION_NAME)
        const objectId = new ObjectId(userId)

        const result = await collection.findOne({ _id: objectId })
        return result
    } catch (err) {
        console.error('Error fetching user:', err)
        return null
    }
}

async function update(user) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const updatedUser = {
            ...user,
            _id: toObjectId(user._id)
        }
        await collection.updateOne({ _id: updatedUser._id }, { $set: updatedUser })
        return updatedUser
    } catch (err) {
        logger.error('Error updating user:', err)
        throw err
    }
}

async function remove(userId) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const { result } = await collection.deleteOne({ _id: toObjectId(userId) })
        return result.n > 0
    } catch (err) {
        logger.error('Error removing user:', err)
        throw err
    }
}

// async function removeAll() {
//     try {

//     } catch (err) {

//     }
// }

function _createUserModel({ name = 'new', coins = 100, moves = [] }) {
    return {
        name,
        coins,
        moves,
    }
}
