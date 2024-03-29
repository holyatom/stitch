import error from './error';


export default function (req, res, next) {
  if (req.authorized) {
    return res.redirect(`/${req.user.username}`);
  }

  next();
}
