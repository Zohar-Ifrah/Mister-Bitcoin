const userService = require('./user.service')
const logger = require('../../services/logger.service')

console.log("user.controller")

async function query(req, res) {
    try {
        const users = await userService.query(req.query)
        res.json(users)
    } catch (err) {
        logger.error('Error querying users:', err)
        res.status(500).json({ message: 'Error querying users', error: err.message })
    }
}

async function get(req, res) {
    try {
        const user = await userService.get(req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(user)
    } catch (err) {
        logger.error('Error fetching user:', err)
        res.status(500).json({ error: 'Internal server error' })
    }
}

async function add(req, res) {
    const user = req.body
    
    try {
        const newUser = await userService.add(user)
        res.json(newUser)
    } catch (err) {
        logger.error('Error adding user:', err)
        res.status(500).json({ err })
    }
}

async function remove(req, res) {
    try {
        await userService.remove(req.params.id)
        res.json({ success: true })
    } catch (err) {
        logger.error('Error removing user:', err)
        res.status(500).json({ err })
    }
}

async function update(req, res) {
    const user = req.body
    try {
        const updatedUser = await userService.update(user)
        res.json(updatedUser)
    } catch (err) {
        logger.error('Error updating user:', err)
        res.status(500).json({ err })
    }
}

// async function removeAll(req, res) {
//     try {
//         const removedUsers = await userService.removeAll()
//         res.json(removedUsers)
//     } catch (err) {
//         logger.error('Error removing all users:', err)
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
