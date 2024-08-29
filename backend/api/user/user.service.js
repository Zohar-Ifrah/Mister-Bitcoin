const { getCollection, toObjectId } = require('../../services/db.service');
const { getDateISO } = require('../../services/util.service');
const logger = require('../../services/logger.service'); // Import your logger
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'user';
console.log("user.service");

module.exports = {
    add,
    get,
    update,
    remove
};

async function add(user) {
    try {
        const collection = await getCollection(COLLECTION_NAME);
        const userModel = _createUserModel(user);
        userModel.createdAt = getDateISO();
        const doc = await collection.insertOne(userModel);
        return doc.ops[0];
    } catch (err) {
        logger.error('Error adding user:', err);
        throw err; // Re-throw the error to be handled by the controller
    }
}

async function get(userId) {
    try {
        if (!ObjectId.isValid(userId)) {
            console.error('Invalid ObjectId format:', userId);
            return null;
        }

        console.log('Fetching user with ID:', userId);
        const collection = await getCollection(COLLECTION_NAME);
        const objectId = new ObjectId(userId);
        console.log('Converted ObjectId:', objectId);

        const result = await collection.findOne({ _id: objectId });
        console.log('User found:', result);
        
        return result;
    } catch (err) {
        console.error('Error fetching user:', err);
        return null;
    }
}

async function update(user) {
    try {
        const collection = await getCollection(COLLECTION_NAME);
        const updatedUser = {
            ...user,
            updatedAt: getDateISO(),
            _id: toObjectId(user._id)
        };
        await collection.updateOne({ _id: updatedUser._id }, { $set: updatedUser });
        return updatedUser;
    } catch (err) {
        logger.error('Error updating user:', err);
        throw err; // Re-throw the error to be handled by the controller
    }
}

async function remove(userId) {
    try {
        const collection = await getCollection(COLLECTION_NAME);
        const { result } = await collection.deleteOne({ _id: toObjectId(userId) });
        return result.n > 0;
    } catch (err) {
        logger.error('Error removing user:', err);
        throw err; // Re-throw the error to be handled by the controller
    }
}

function _createUserModel({ name, coins, moves }) {
    return {
        name,
        coins,
        moves,
        createdAt: null,
        updatedAt: null
    };
}
