// app.js
const express = require('express');
const dns = require('dns');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/create-subdomain', (req, res) => {
    const { subdomain } = req.body;

    // Validate subdomain (ensure it's alphanumeric, etc.)
    const isValidSubdomain = /^[a-zA-Z0-9-]+$/.test(subdomain);

    if (!isValidSubdomain) {
        return res.status(400).send('Invalid subdomain name');
    }

    // Call a function to create the subdomain
    createSubdomain(subdomain)
        .then(() => res.send(`Subdomain ${subdomain} created successfully`))
        .catch(error => res.status(500).send(`Error creating subdomain: ${error.message}`));
});

function createSubdomain(subdomain) {
    return new Promise((resolve, reject) => {
        // Use the dns module to add the subdomain to your DNS provider
        // This might vary based on your DNS provider's API

        // Example using a hypothetical DNS provider's API
        dns.addSubdomain(subdomain, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
