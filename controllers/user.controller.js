const { createUserJwtToken, Assert, hashPassword } = require('../utility');

const UserController = {
    async createUser(req, res, { User }) {
        let { name, email, password } = req.body;

        // normalize the email
        email = email.toLowerCase();

        Assert.userEmailExists(await User.findOne({ email }), email);

        const { hashedPassword, salt } = await hashPassword(password); // hash password, generate salt

        const user = new User({
            email,
            name,
            hashedPassword,
            salt,
            created: new Date(),
            updated: new Date()
        });

        await user.save();

        const token = createUserJwtToken(user);
        res.cookie('access_token', token, { expire: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE) });

        return user;
    },
    async listUsers(req, res, { User }) {
        return await User.find({});
    },
    async fetchUser(req, res, { User }) {
        const { userId } = req.params;

        Assert.authorizedUserId(userId, req.jwt._id);

        return await User.findOne({
            _id: userId
        });
    },
    async updateUser(req, res, { User }) {
        const { userId } = req.params;
        let { name, email, password } = req.body;

        Assert.authorizedUserId(userId, req.jwt._id);

        email = email ? email.toLowerCase() : '';

        const user = await User.findOne({ _id: userId });

        // if not the same email, make sure no conflict
        if (email && email != user.email) {
            Assert.userEmailExists(await User.findOne({ email }), email);
        }

        Assert.userExists(user);

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const { hashedPassword } = await hashPassword(password, user.salt);
            user.hashedPassword = hashedPassword;
        }

        user.updated = new Date();

        return await user.save();
    },
    async deleteUser(req, res, { User }) {
        const { userId } = req.params;

        Assert.authorizedUserId(userId, req.jwt._id);

        return await User.deleteOne({
            _id: userId
        });
    },
};

module.exports = UserController;
