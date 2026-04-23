const validator = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    const status = 400;
    const message = error.issues[0].message;
    next({ status, message });
  }
};

module.exports = validator;
