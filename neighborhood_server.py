from flask import Flask, render_template, request, jsonify
from flask import session as server_session
import requests, json

app = Flask(__name__)

@app.route('/')
def showIndex():
    myArray = arraySetup()
    #jsonify all objects in the restaurant array
    jsonArray= json.dumps([place.__dict__ for place in myArray])

    return render_template('index.html', myArray = jsonArray)

#Class to create all restaurant objects
class Restaurant(dict):
    def __init__(self, place):
        dict.__init__(self)
        self.name = place[0]
        self.lat = place[1]
        self.lng = place[2]
        self.googleID = place[3] #Currently not used

        #Get Yelp Data
        payload = {'term' : self.name, 'latitude' : str(self.lat), 'longitude' : str(self.lng)}
        headers = {'Authorization': 'Bearer 8yZV2gQUpATW0ijLR16sN3E60qwX2B7F87EIcHpyzkmY16aX5w58ZVULzaNdz8loSsj_cF8NGvgfEP56Q7yJYtT_mNytRFwSXi6qDYokvr6dmdvf75kjelZ5t0I8W3Yx'}
        r = requests.get('https://api.yelp.com/v3/businesses/search',
                            params = payload, headers = headers).content
        rj = json.loads(r)
        self.rating = rj['businesses'][0]['rating']
        self.review_count = rj['businesses'][0]['review_count']
        self.image = rj['businesses'][0]['image_url']

#Create array of initial restaurant data
def arraySetup():
    startingPlaces = [
    [
        "Breckenridge Brewery",
        39.5940147,
        -105.0232071,
        "ChIJc0lxrDt_bIcRnSfx7pY6cEY",
    ],
    [
        "Smokin Fins",
        39.6138879,
        -105.018104,
        "ChIJXWd_2TKAbIcRyrZDurIo2pI",
    ],
    [
        "Cafe Terracotta",
        39.6147285,
        -105.0186864,
        "ChIJS1p27jKAbIcRhyVrpIoFBkw",
    ],
    [
        "Damascus Grill",
        39.6135568,
        -105.0038794,
        "ChIJF6-bl7SBbIcRnVladO6SAmE",
    ],
    [
        "Wild Ginger",
        39.6135023,
        -104.9930285,
        "ChIJy8JIZ6yBbIcRhmHKz3EjFKM",
    ]
]
    restArray = []
    for place in startingPlaces:
        x = Restaurant(place)
        restArray.append(x)
    return restArray


if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port = 5000)