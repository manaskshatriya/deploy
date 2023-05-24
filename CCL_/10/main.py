import webapp2
import urllib2
import json


class MainPage(webapp2.RequestHandler):
    def get(self):
                self.response.write('<html><body>')
                self.response.write('<h1> Enter the name of the university:</h1>')
                self.response.write('<form action="/uni" method="post">')
                self.response.write('Name: <input type="text" name="nm"><br>')
        
                #self.response.write('Country: <input type="text" name="country"><br>')
                
                self.response.write('<input type="submit" value="Search">')
                self.response.write('</form></body></html>')

class UniversityLocator(webapp2.RequestHandler):
        def post(self):
                name=self.request.get('nm')
                #country=self.request.get('country')
                
                url='http://universities.hipolabs.com/search?name='+name
                response=urllib2.urlopen(url).read()
                data=json.loads(response)

                self.response.write('<html><body>')
                self.response.write('<h1> Showing results for the Name: '+name+'</h1>')
                for obj in data:
                        # for x in obj:
                        #     self.response.write('<p>Objects are '+ x+'</p><br>')
                        self.response.write('<p>Name: '+obj['name']+'</p>')
                        self.response.write('<p>Country: '+obj['country']+'</p>')
                        #for x in range(len(obj['web_pages'])):
                        self.response.write('<p>Website Link: '+obj['web_pages'][0]+'</p>')
                        #for x in range(len(obj['domains'])):
                        self.response.write('<p>Domain link: '+obj['domains'][0]+'</p>')
                        #self.response.write('<p>Domain: '+obj['domains']+'</p><br><br>')
                        self.response.write('<br><br>')
                self.response.write('</body></html>')

app=webapp2.WSGIApplication([
        ('/',MainPage),
        ('/uni',UniversityLocator)
],debug=True)

#py google-cloud-sdk/bin/dev_appserver.py C:\Users\sahil\CCL_trial\10\app.yaml