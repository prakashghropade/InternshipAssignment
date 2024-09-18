
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error occured', message: 'Email and password Both are required.' });
    
    }

    // here users is the model of the user where we can create from the user  schema

    const user = users.find(userdata => userdata.email === email);

    if (!user) {
      return res.status(401).json({ status: 'error occured', message: 'Invalid email or password.' });
    }

    // here when we compare the password we bcrypt package because our password is encoded

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ status: 'error occured', message: 'Password is invalid' });
    }
  
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ status: 'success', message: 'User Login successful', token });

  } 
  
  catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ status: 'error occured', message: 'An unexpected error occurred.' });

  }
});

