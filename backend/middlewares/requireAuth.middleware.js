// async function requireAuth(req, res, next) {
//   if (!req.session || !req.session.user) {
//     return res.status(401).end('Unauthorized!');
//   }
//   next();
// }

// async function requireAdmin(req, res, next) {
//   const user = req.session.user;
//   if (!user.isAdmin) {
//     return res.status(401).end('Unauthorized Enough..');
//   }
//   next();
// }

// module.exports = {
//   requireAuth,
//   requireAdmin
// }

// async function requireAuth(req, res, next) {
//   if (!req.session || !req.session.user) {
//     res.status(401).end('Unauthorized!');
//     return;
//   }
//   next();
// }

// async function requireAdmin(req, res, next) {
//   const user = req.session.user;
//   if (!user.isAdmin) {
//     res.status(401).end('Unauthorized Enough..');
//     return;
//   }
//   next();
// }


// // module.exports = requireAuth;

// module.exports = {
//   requireAuth,
//   requireAdmin
// }

