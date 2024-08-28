const { getCollection, toObjectId } = require('../../services/db.service');
const { getDateISO } = require('../../services/util.service');

const COLLECTION_NAME = 'user';

module.exports = {
    add,
    get,
    update,
    remove
};

async function add(user) {
    const collection = await getCollection(COLLECTION_NAME);
    const userModel = _createUserModel(user);
    userModel.createdAt = getDateISO();
    const doc = await collection.insertOne(userModel);
    return doc.ops[0];
}

async function get(userId) {
    const collection = await getCollection(COLLECTION_NAME);
    return collection.findOne({ _id: toObjectId(userId) });
}

async function update(user) {
    const collection = await getCollection(COLLECTION_NAME);
    const updatedUser = {
        ...user,
        updatedAt: getDateISO(),
        _id: toObjectId(user._id)
    };
    await collection.updateOne({ _id: updatedUser._id }, { $set: updatedUser });
    return updatedUser;
}

async function remove(userId) {
    const collection = await getCollection(COLLECTION_NAME);
    const { result } = await collection.deleteOne({ _id: toObjectId(userId) });
    return result.n > 0;
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
