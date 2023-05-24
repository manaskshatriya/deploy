import webapp2
import urllib2
import json

class MainPage(webapp2.RequestHandler):
    def get(self):
                self.response.write('<html><body>')
                self.response.write('<form action="/forecast" method="post">')
                self.response.write('Latitude: <input type="text" name="lat"><br>')
        
                self.response.write('Longitude: <input type="text" name="lon"><br>')
                
                self.response.write('<input type="submit" value="Search">')
                self.response.write('</form></body></html>')

class ForecastHandler(webapp2.RequestHandler):
    def post(self):
            lat = self.request.get('lat')
            lon = self.request.get('lon')
            forecast_type = '&current_weather=TRUE'

            
            url = 'https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+forecast_type
    
            response = urllib2.urlopen(url).read()
            data = json.loads(response)
            
            self.response.write('<html><body>')
            #self.response.write('<h1>Weather Forecast for '+'('+lat+','+lon+')</h1>')
            self.response.write('<h1>Weather Forecast for '+'('+lat+','+lon+') - '+'is</h1><ul>')
            self.response.write('<h2> Current Temperature is '+str(data['current_weather']['temperature'])+'</h2></body></html>')

        #except Exception as e:
            #self.response.write('<html><body><h1>Error: '+e+'</h1>')
            #self.response.write('<p>Please try again with correct input.</p></body></html>')

app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/forecast', ForecastHandler)
], debug=True)

#py google-cloud-sdk/bin/dev_appserver.py C:\Users\sahil\CCL_trial\8\app.yaml