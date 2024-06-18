<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <h1>Room Finder API Documentation</h1>
    <h2>Introduction</h2>
    <p>Welcome to the Room Finder API! This API allows you to search for available rooms based on various criteria such as location, check-in and check-out dates, and more.</p>
    <h2>Usage</h2>
    <h3>Searching for Rooms</h3>
    <p>To search for rooms, send a GET request to the endpoint specifying the parameters:</p>
    <pre><code>/api/search?location=<em>{location}</em>&amp;type=<em>{roomtype}</em>&amp;price=<em>{price}</em></code></pre>
    <p>Replace <code><em>{location}</em></code>, <code><em>{roomtype}</em></code>, and <code><em>{price}</em></code> with your desired values.</p>
    <h3>Example</h3>
    <p>Example of searching for rooms:</p>
    <pre><code>GET /api/search?location=New York&amp;type=2bhk&amp;price=6000</code></pre>
    <h2>Response</h2>
    <p>The API will respond with a JSON array of rooms matching the criteria:</p>
    <pre><code>[
    {
        "name": "Luxury Suite",
        "price": 250,
        "location": "New York",
        "type":2bhk
    },
    {
        "name": "Standard Room",
        "price": 120,
        "location": "New York",
        "type":""
    }
    ]</code></pre>
    <h2>Error Handling</h2>
    <p>If there are any errors, the API will respond with an appropriate HTTP status code and an error message in JSON format.</p>
    <h2>Conclusion</h2>
    <p>Thank you for using the Room Finder API. For more details and advanced usage, please refer to the full API documentation.</p>
</body>
</html>
