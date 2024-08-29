const contactService = require('./contact.service')

async function query(req, res) {
    try {
        const contacts = await contactService.query(req.query)
        res.json(contacts)
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function get(req, res) {
    try {
        const contact = await contactService.get(req.params.id)
        res.json(contact)
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function add(req, res) {
    const contact = req.body
    try {
        const newContact = await contactService.add(contact)
        res.json(newContact)
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function remove(req, res) {
    try {
        await contactService.remove(req.params.id)
        res.json({ success: true })
    } catch (err) {
        res.status(500).json({ err })
    }
}

async function update(req, res) {
    const contact = req.body
    try {
        const updatedContact = await contactService.update(contact)
        res.json(updatedContact)
    } catch (err) {
        res.status(500).json({ err })
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
    add,
    query,
    get,
    remove,
    update,
    // removeAll
}
