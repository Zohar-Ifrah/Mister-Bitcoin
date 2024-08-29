const { getCollection, toObjectId } = require('../../services/db.service')

const COLLECTION_NAME = 'contact'

module.exports = {
    query,
    add,
    get,
    update,
    remove,
}

async function query(filterBy) {
    try {
        // console.log("filterBy>>>", filterBy)
        const criteria = _buildCriteria(filterBy)

        const collection = await getCollection(COLLECTION_NAME)
        const contacts = await collection.find(criteria).toArray()

        return contacts
    } catch (err) {
        console.error('Error querying contacts:', err)
        throw err
    }
}

async function add(contact) {
    const collection = await getCollection(COLLECTION_NAME)
    const contactModel = _createContactModel(contact)

    const doc = await collection.insertOne(contactModel)
    return doc.ops[0]
}

async function get(contactId) {
    try {
        const objectId = toObjectId(contactId)
        const collection = await getCollection(COLLECTION_NAME)
        const contact = await collection.findOne({ _id: objectId })

        return contact
    } catch (err) {
        console.error('Error fetching contact:', err)
        return null
    }
}

async function update(contact) {
    const collection = await getCollection(COLLECTION_NAME)
    const updatedContact = {
        ...contact,
        _id: toObjectId(contact._id)
    }
    await collection.updateOne({ _id: updatedContact._id }, { $set: updatedContact })
    return updatedContact
}

async function remove(contactId) {
    const collection = await getCollection(COLLECTION_NAME)
    const { result } = await collection.deleteOne({ _id: toObjectId(contactId) })
    return result.n > 0
}

function _createContactModel({ name, email, phone }) {
    return {
        name,
        email,
        phone,
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}

    if (filterBy.name) {
        const txtCriteria = { $regex: filterBy.name, $options: 'i' }
        criteria.name = txtCriteria
    }

    if (filterBy.email) {
        const txtCriteria = { $regex: filterBy.email, $options: 'i' }
        criteria.email = txtCriteria
    }

    if (filterBy.phone) {
        const txtCriteria = { $regex: filterBy.phone, $options: 'i' }
        criteria.phone = txtCriteria
    }

    console.log("Criteria built:", criteria)
    return criteria
}
