const { createUserJwtToken, Assert, hashPassword } = require('../utility');

const AuthController = {
    async signin(req, res, { User }) {
        let { email, password } = req.body;

        // normalize the email
        email = email.toLowerCase(); 

        let user = await User.findOne({
            email: email,
        });

        // if we find the user, check their salted password
        const { hashedPassword } = await hashPassword(password, user.salt);
        //console.log(password);
        //console.log(hashedPassword);
        //console.log(user.hashedPassword);

        if (user && hashedPassword != user.hashedPassword) {
            // set user to null so the sign in fails
            user = null;
        }

        Assert.userSignInExists(user);

        const token = createUserJwtToken(user);
        res.cookie('access_token', token, { expire: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE) });

        return user;
    },
    async signout(req, res) {
        res.clearCookie('access_token');
        return { success: true };
    }
};

module.exports = AuthController;
