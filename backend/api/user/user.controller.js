const userService = require('./user.service');

async function query(req, res) {
    try {
        const users = await userService.query(req.query);
        res.json(users);
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function get(req, res) {
    try {
        const user = await userService.get(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function add(req, res) {
    const user = req.body;
    try {
        const newUser = await userService.add(user);
        res.json(newUser);
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function remove(req, res) {
    try {
        await userService.remove(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function update(req, res) {
    const user = req.body;
    try {
        const updatedUser = await userService.update(user);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function removeAll(req, res) {
    try {
        const removedUsers = await userService.removeAll();
        res.json(removedUsers);
    } catch (err) {
        res.status(500).json({ err });
    }
}

module.exports = {
    add,
    query,
    get,
    remove,
    update,
    removeAll
};
