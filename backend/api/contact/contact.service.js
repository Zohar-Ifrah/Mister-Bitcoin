const { getCollection, toObjectId } = require('../../services/db.service');
const { getDateISO } = require('../../services/util.service');

const COLLECTION_NAME = 'contact';

module.exports = {
    add,
    get,
    update,
    remove,
    query
};

async function add(contact) {
    const collection = await getCollection(COLLECTION_NAME);
    const contactModel = _createContactModel(contact);
    contactModel.createdAt = getDateISO();
    const doc = await collection.insertOne(contactModel);
    return doc.ops[0];
}

async function get(contactId) {
    const collection = await getCollection(COLLECTION_NAME);
    return collection.findOne({ _id: toObjectId(contactId) });
}

async function update(contact) {
    const collection = await getCollection(COLLECTION_NAME);
    const updatedContact = {
        ...contact,
        updatedAt: getDateISO(),
        _id: toObjectId(contact._id)
    };
    await collection.updateOne({ _id: updatedContact._id }, { $set: updatedContact });
    return updatedContact;
}

async function remove(contactId) {
    const collection = await getCollection(COLLECTION_NAME);
    const { result } = await collection.deleteOne({ _id: toObjectId(contactId) });
    return result.n > 0;
}

async function query(filterBy) {
    const criteria = _buildCriteria(filterBy);
    const collection = await getCollection(COLLECTION_NAME);
    return collection.find(criteria).toArray();
}

function _createContactModel({ name, email, phone }) {
    return {
        name,
        email,
        phone,
        createdAt: null,
        updatedAt: null
    };
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.term) {
        const txtCriteria = { $regex: filterBy.term, $options: 'i' };
        criteria.$or = [
            { name: txtCriteria },
            { email: txtCriteria },
            { phone: txtCriteria }
        ];
    }
    return criteria;
}
