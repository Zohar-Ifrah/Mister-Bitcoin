const contactService = require('./contact.service')
console.log("contact.controller")

async function query(req, res) {
    try {
        const contacts = await contactService.query(req.query)
        res.json(contacts)
    } catch (err) {
        console.error('Failed to query contacts:', err)
        res.status(500).json({ error: 'Failed to query contacts', details: err.message })
    }
}

async function get(req, res) {
    try {
        const contact = await contactService.get(req.params.id)
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' })
        }
        res.json(contact)
    } catch (err) {
        console.error('Failed to get contact:', err)
        res.status(500).json({ error: 'Failed to get contact', details: err.message })
    }
}

async function add(req, res) {
    const contact = req.body
    try {
        const newContact = await contactService.add(contact)
        res.json(newContact)
    } catch (err) {
        console.error('Failed to add contact:', err)
        res.status(500).json({ error: 'Failed to add contact', details: err.message })
    }
}


async function remove(req, res) {
    try {
        const success = await contactService.remove(req.params.id)
        if (!success) {
            return res.status(404).json({ error: 'Contact not found or already deleted' })
        }
        res.json({ success: true })
    } catch (err) {
        console.error('Failed to remove contact:', err)
        res.status(500).json({ error: 'Failed to remove contact', details: err.message })
    }
}

async function update(req, res) {
    const contact = req.body
    try {
        const updatedContact = await contactService.update(contact)
        if (!updatedContact) {
            return res.status(404).json({ error: 'Contact not found' })
        }
        res.json(updatedContact)
    } catch (err) {
        console.error('Failed to update contact:', err)
        res.status(500).json({ error: 'Failed to update contact', details: err.message })
    }
}

// async function removeAll(req, res) {
//     try {
//         const removedContacts = await contactService.removeAll()
//         res.json(removedContacts)
//     } catch (err) {
//         res.status(500).json({ err })
//     }
// }

module.exports = {
    query,
    get,
    add,
    remove,
    update,
    // removeAll
}
