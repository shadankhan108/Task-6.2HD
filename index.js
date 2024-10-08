const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { title: 'Ice Cream Survey' });
});

app.post('/submitmembership', (req, res) => {
    const { firstname, surname, email, mobileNumber, inputNumCaps, capstyle, comments } = req.body;

    const errors = [];
    if (!firstname) errors.push("First Name is required.");
    if (!surname) errors.push("Last Name is required.");
    if (!email) {
        errors.push("Email is required.");
    } else if (!email.endsWith("@deakin.edu.au")) {
        errors.push("Email must end with @deakin.edu.au.");
    }
    if (!mobileNumber) errors.push("Mobile number is required.");
    if (!inputNumCaps) errors.push("Number of caps owned is required.");
    if (!capstyle) errors.push("Favourite cap style is required.");
    if (!comments) errors.push("Comments are required.");

    if (errors.length > 0) {
        return res.render('thankyou', {
            title: 'dKin Caps Membership',
            errors,
            firstname,
            surname,
            email,
            mobileNumber,
            inputNumCaps,
            capstyle,
            comments
        });
    }

    res.render('thankyou', {
        title: "Thank You",
        firstname,
        surname,
        email,
        mobileNumber,
        inputNumCaps,
        capstyle,
        comments,
        errors: []
    });
});

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).render('error', {
        title: 'Error',
        message: err.message || 'An Error Occurred',
        error: {
            status: statusCode,
            stack: process.env.NODE_ENV === 'development' ? err.stack : ''
        }
    });
});

app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found',
        message: "The URL you're looking for is not set",
        url: req.url
    });
});

// Export the app instance for testing
module.exports = app;

// Start the server if this script is being run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}