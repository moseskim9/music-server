### Directions

Please setup a database to house the provided data (labels, artists, releases)and create a dynamic API endpoint that can serve data as follows:

Based on an artist name or ID - return all of the associated releases and relevant data. Please include the artist information and label information in your JSON response.

For example, when querying for the artist "Banks", the response would include Banks's artist info (spotify id, genres), multiple releases, as well as her associated label info (region, distributor).

Please commit this to a public repo, provide instructions on how to run the code locally, as well as the shape of the request through something like cURL or Postman. Aside from working within node, the db and server-side framework is your choice.

If you have any questions please don't hesitate to ask.

##### Extra credit

- Query by multiple artist id's or names
- Query by type "album" or "single" release
- Query by label id
- Query by UPC

###### Moses' Instructions

Dependencies: Express, Mongoose, Mongodb
To start server: npm start

For database, I have hooked it up to Mongodb Atlas. The credentials to login to the mongodb atlas if needed will be provided in the email.
The connection is defined in app.js via mongoose.
Also, I have already loaded all the data in Atlas, so you shouldn't worry about loading in any data.

One thing I want to note is I decided to use body as a way to access the request data instead of using url params, but for no particular reason. Might have been simpler to just use params looking back. Also, because I wasn't really sure in the beginning what the response body should look for the original instructions and the extra credit, I separated the each collection by its url, assuming the need to query by collection. However, after speaking to you via email, I realized that since all responses should be the same, queried by different criteria, I just decided to use the base /artist url and chain further queries. Although you said it's fine, I did want to include at least one extra credit (type) just to show you.

I defintely could have used data validators like JOI to describe my data input/output at the beginning of each routes, but I didn't know what the scope of the assignment was, so I didn't want to over-bulk it. However, I decided to simply handle errors with try/catch blocks.

Please use any REST client preferably Postman and these are the instructions as follows (for headers, please use Content-Type: application/json):

1. To get info based on artist name OR id

- verb: GET
- url: localhost:3000/artist
- body: {
  "id": "111123",
  "name": "Lil Silva"
  }

  OR

- body: {
  "id": "111123"
  }

  OR

- body: {
  "name": "Lil Silva"
  }

2. To get by album type

- verb: GET
- url: localhost:3000/release/type
- body: {
  "type": "single"
  }

OR

- body: {
  "type": "album"
  }

3. To get by upc

- verb: GET
- url: localhost:3000/release/upc
- body: {
  "upc": "00602547762931"
  }

4. To get by label id

- verb: GET
- url: localhost:3000/label/id
- body: {
  "id": "222129"
  }

5. To get artists info by RELEASE TYPE (Extra Credit)

- verb: GET
- url: localhost:3000/artist/type
- body: {
  "type": "single"
  }
