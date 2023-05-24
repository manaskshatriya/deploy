import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        #self.response.write("Hello guys welcome to my page")
        for i in range(10):
            #these 3 lines for 1-3 statements.
            self.response.write("Name: Sahil Kothari<br>")
            self.response.write("Seat Number: 33243<br>")
            self.response.write("Department: IT<br>")

app =webapp2.WSGIApplication([('/',MainPage)],debug=True)