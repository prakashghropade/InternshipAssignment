
// here User is the user model 

app.get('/api/users/:username/profile', async (req, res) => {
  const { username } = req.params;
  const { fields} = req.query;

  const allowedFields = ['name', 'email', 'age', 'social'];


  if (fields) {
    const invalidFields = fields.split(',').filter(field => !allowedFields.includes(field));
    if (invalidFields.length) {
      return res.status(400).json({ status: 'error occure', message: `Some fields are invalid : ${invalidFields.join(', ')}` });
    }
  }

  try {
    // Find the user by its username 
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ status: 'error occure', message: 'Sorry, User is not found' });
    }

    // create the response on the basis of required fields
    let userProfile = user.toJSON();

    if (fields) {
      const requestedFields = fields.split(',');
      userProfile = Object.keys(userProfile)
        .filter(key => requestedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = userProfile[key];
          return obj;
        }, {});
    }

    res.json({ status: 'success', userdata: userProfile });
  } catch (error) {
    res.status(500).json({ status: 'error occure', message: 'Internal Server error' });
  }
});

