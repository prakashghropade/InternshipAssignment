app.post('/book', async (req, res) => {
  const { userId, eventId} = req.body;

  try {

    const existingBooking = await Booking.findOne({
      where: { eventId, userId }});

    if (existingBooking) {
      throw new Error('You are alredy booked the event');
    }

    await Booking.create({ userId, eventId});

    res.status(201).json({ message: 'Event Booking successful' });
    
  } catch (error) {
    res.status(400).json({ message: 'Internal server error' });
  }
});


