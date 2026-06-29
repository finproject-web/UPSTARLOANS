import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Enable CORS for all origins
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Proxy endpoint for Google Apps Script
app.post('/proxy/email', async (req, res) => {
  try {
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbzRXeE1s1Ez_lUv5V9FaiIakzBeKBSRoIqH0mF5bIbJ2k8SgJzI1omV1m8bOFvfoaGnbg/exec';
    
    console.log('Proxying email request to Google Apps Script');
    console.log('Request body type:', typeof req.body);
    console.log('Request body keys:', Object.keys(req.body));
    
    // Convert JSON body to URLSearchParams for Google Apps Script
    const urlEncodedBody = new URLSearchParams(req.body);
    console.log('URL encoded body sample:', urlEncodedBody.toString().substring(0, 200));
    
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlEncodedBody
    });
    
    const text = await response.text();
    console.log('Google Apps Script response status:', response.status);
    console.log('Response text:', text);
    
    res.status(response.status).send(text);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log(`Email proxy endpoint: http://localhost:${PORT}/proxy/email`);
});
