import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        self.response.write("<h1>Table of 5:</h1>")
        self.response.write("<ul>")
        for i in range(1, 11):
            result = i * 5
            self.response.write("<li>5 x " + str(i) + " = " + str(result) + "</li>")
        self.response.write("</ul>")

app = webapp2.WSGIApplication([('/', MainPage)], debug=True)


#py google-cloud-sdk/bin/dev_appserver.py C:\Users\sahil\CCL_trial\4_5\app.yaml