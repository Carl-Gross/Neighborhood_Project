# Neighborhood App
This repo contains both the server-side and client-side code for the Neighborhood App.

## Summary
When the user accesses index.html with the server running, the user will see a map of Littleton,CO with a list of restaurants. The restaurants are marked on the map. Clicking on a restaurant name or marker will open up an infowindow with the restaurant's name, a picture from Yelp, the Yelp average review, and the number of Yelp reviews.

The server file (neighborhood_server.py) stores the restaurant array, communicates with the Yelp API to find Yelp-related information (as this API is not meant to be accessed directly by the client), and serves the page.

The client files communicate with the Google Maps API to create the map, and contain the javascript for interacting with the page elements.

## Instructions
Clone all the files to a local directory. Run neighborhood_server.py in Python. Connect to localhost:5000 in your browser. 

## Known Bugs
None