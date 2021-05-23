import express from 'express';
import votifier from 'votifier-send';

const app = express();

app.use(express.json())

app.post('/', (req, res) => {
  const { settings } = req.body as any;
  settings.data.timestamp = new Date().getTime();
  try {
    votifier.send(settings, (err: any) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Something went wrong - Server could be offline'
        });
      }
      return res.status(500).json({ success: true, message: 'Votifier signal forwarded' });
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e,
      friendly: 'Data provided (public key or IP) could be invalid'
    });
  }
});

app.get('/', (req, res) => {
  return res.redirect('https://crafty.gg');
});

app.listen(2000, () => {
  console.log('Votifier-sender service started');
});

module.exports = app;
