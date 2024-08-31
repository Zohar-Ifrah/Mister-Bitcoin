const { getCollection, toObjectId } = require('../../services/db.service')

const COLLECTION_NAME = 'contact'

console.log("contact.service")

module.exports = {
    query,
    add,
    get,
    update,
    remove,
}

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)

        const collection = await getCollection(COLLECTION_NAME)
        const contacts = await collection.find(criteria).toArray()

        return contacts
    } catch (err) {
        console.error('Error querying contacts:', err)
        throw new Error(`Failed to query contacts: ${err.message}`)
    }
}

async function add(contact) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const contactModel = _createContactModel(contact)

        const doc = await collection.insertOne(contactModel)
        return { ...contactModel, _id: doc.insertedId }
    } catch (err) {
        console.error('Error adding contact:', err)
        throw new Error(`Failed to add contact: ${err.message}`)
    }
}

async function get(contactId) {
    try {
        const objectId = toObjectId(contactId)
        const collection = await getCollection(COLLECTION_NAME)
        const contact = await collection.findOne({ _id: objectId })

        if (!contact) throw new Error('Contact not found')
        return contact
    } catch (err) {
        console.error('Error fetching contact:', err)
        throw new Error(`Failed to fetch contact: ${err.message}`)
    }
}

async function update(contact) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const updatedContact = {
            ...contact,
            _id: toObjectId(contact._id)
        }
        const result = await collection.updateOne({ _id: updatedContact._id }, { $set: updatedContact })

        if (result.matchedCount === 0) throw new Error('Contact not found')
        return updatedContact
    } catch (err) {
        console.error('Error updating contact:', err)
        throw new Error(`Failed to update contact: ${err.message}`)
    }
}

async function remove(contactId) {
    try {
        const collection = await getCollection(COLLECTION_NAME)
        const result = await collection.deleteOne({ _id: toObjectId(contactId) })

        if (result.deletedCount === 0) throw new Error('Contact not found or already deleted')
        return true
    } catch (err) {
        console.error('Error removing contact:', err)
        throw new Error(`Failed to remove contact: ${err.message}`)
    }
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
    
    if (filterBy.term) {
        const txtCriteria = { $regex: filterBy.term, $options: 'i' }
        criteria.term = txtCriteria
    }
    // if (filterBy.email) {
    //     const txtCriteria = { $regex: filterBy.email, $options: 'i' }
    //     criteria.email = txtCriteria
    // }

    // if (filterBy.phone) {
    //     const txtCriteria = { $regex: filterBy.phone, $options: 'i' }
    //     criteria.phone = txtCriteria
    // }

    console.log("Criteria built:", criteria)
    return criteria
}
