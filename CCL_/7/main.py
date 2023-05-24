import webapp2
import urllib2
import json

class MainPage(webapp2.RequestHandler):
   def get(self):

            self.response.write('<html><body>')
            self.response.write('<h1>Find Nearest Post Office</h1>')
            self.response.write('<form action="/result_1" method="post">')
            self.response.write('Zip Code: <input type="text" name="zipcode" pattern="[0-9]{6}" required><br><br>')
            #self.response.write('Branch Name: <input type="text" name="branch" required><br><br>')
            self.response.write('<input type="submit" value="Submit">')
            self.response.write('</form></body></html>')
        


# class subPage(webapp2.RequestHandler):
#     def get(self):
#         self.response.write('<html><body>')
#         self.response.write('<h1>Do You want to search by PINCODE or Branch Name?</h1>')
#         self.response.write('<form action="/selection" method="get">')
#         self.response.write('<label for="choice">Choose :</label>')
#         self.response.write('<select name="choice" id="choice">')
#         self.response.write('<option value="pincode" id="pincode_1">Pincode</option>')
#         self.response.write('<option value="Branch" id="branch_1">Branch Name</option>')
#         self.response.write('</select><br><br><input type="submit" value="Submit"></form>')
#         self.response.write('<html><body>')

class ResultPage_1(webapp2.RequestHandler):
    def post(self):
        zipcode = self.request.get('zipcode')
        branch = self.request.get('branch')
        if len(zipcode) != 6 or not zipcode.isdigit():
            self.response.write('<html><body><h1>Error</h1>')
            self.response.write('<p>Please enter a valid 6-digit zip code.</p>')
            self.response.write('<a href="/">Go back to form</a></body></html>')
        else:
            url = 'https://api.postalpincode.in/pincode/' + zipcode
            response = urllib2.urlopen(url).read()
            data = json.loads(response)
            if data[0]['Status'] == 'Error':
                self.response.write('<html><body><h1>Error</h1>')
                self.response.write('<p>' + data[0]['Message'] + '</p>')
                self.response.write('<a href="/">Go back to form</a></body></html>')
            else:
                found = False
                for post_office in data[0]['PostOffice']:
                    #if branch.lower() in post_office['Name'].lower():
                        self.response.write('<html><body><h1>Nearest Post Office</h1>')
                        self.response.write('<p>Pincode: '+ zipcode+ '</p>')
                        self.response.write('<p>Name: ' + post_office['Name'] + '</p>')
                        #self.response.write('<p>Pin Code: ' + post_office['PINCode'] + '</p>')
                        self.response.write('<p>Branch Type: ' + post_office['BranchType'] + '</p>')
                        
                        self.response.write('<p>District: ' + post_office['District'] + '</p>')
                        self.response.write('<p>Division: '+ post_office['Division']+ '</p>')
                        self.response.write('<p>State: ' + post_office['State'] + '</p>')
                        self.response.write('</body></html>')
                        found = True
                        
                        if not found:
                             self.response.write('<html><body><h1>Error</h1>')
                #    self.response.write('<html><body><h1>Error</h1>')
                             self.response.write('<p>No post office found with the given Pincode.</p>')
                             self.response.write('<a href="/">Go back to form</a></body></html>')
# class ResultPage_2(webapp2.RequestHandler):
#     def post(self):
#         #zipcode = self.request.get('zipcode')
#             branch = self.request.get('branch')
#         # if len(zipcode) != 6 or not zipcode.isdigit():
#         #     self.response.write('<html><body><h1>Error</h1>')
#         #     self.response.write('<p>Please enter a valid 6-digit zip code.</p>')
#         #     self.response.write('<a href="/">Go back to form</a></body></html>')
#         # else:
#             url = 'https://api.postalpincode.in/postoffice/' + branch
#             response = urllib2.urlopen(url).read()
#             data = json.loads(response)
#             if data[0]['Status'] == 'Error':
#                 self.response.write('<html><body><h1>Error</h1>')
#                 self.response.write('<p>' + data['Message'] + '</p>')
#                 self.response.write('<a href="/">Go back to form</a></body></html>')
#             else:
#                 found = False
#                 for post_office in data[0]['PostOffice']:
#                     if branch.lower() in post_office['Name'].lower():
#                         self.response.write('<html><body><h1>Nearest Post Office</h1>')
#                         self.response.write('<p>Pincode: '+ post_office['PINCode']+ '</p>')
#                         self.response.write('<p>Name: ' + post_office['Name'] + '</p>')
#                         #self.response.write('<p>Pin Code: ' + post_office['PINCode'] + '</p>')
#                         self.response.write('<p>Branch Type: ' + post_office['BranchType'] + '</p>')
                        
#                         self.response.write('<p>District: ' + post_office['District'] + '</p>')
#                         self.response.write('<p>Division: '+ post_office['Division']+ '</p>')
#                         self.response.write('<p>State: ' + post_office['State'] + '</p>')
#                         self.response.write('</body></html>')
#                         found = True
                        
#                     if not found:
#                         self.response.write('<html><body><h1>Error</h1>')
#                         self.response.write('<p>No post office found with the given branch name.</p>')
#                         self.response.write('<a href="/">Go back to form</a></body></html>')




app = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/result_1', ResultPage_1)
], debug=True)


#py google-cloud-sdk/bin/dev_appserver.py C:\Users\sahil\CCL_trial\7\app.yaml