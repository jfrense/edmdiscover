import soundcloud
import re
from pymongo import MongoClient

# make connection to mongo DB
mongoclient = MongoClient('localhost', 27017)
db = mongoclient.edmdiscover
remixcollection = db.remixes
setcollection = db.sets
trackcollection = db.tracks


# create client object with app and user credentials
client = soundcloud.Client(client_id='3841a8fc406be5f2a25c4a248813f7f5')


bad = client.get('/users/' + '2580498')
print (bad.username)

djkey = open('/Users/Justin/Dropbox/edmdiscover/tasks/djkey.txt').read().splitlines()
#print (djkey)
for x in djkey:
	tracks = client.get('/users/' + x + '/tracks', limit=10)
	print (x)
	myTitle = tracks[0].title
	print (myTitle)
#
#	searchObj = re.search('remix', myTitle, re.IGNORECASE)


#	if searchObj:
#		print ("...inserting REMIX into DB if it does not exist already")
	track = { "_id" : tracks[0].id ,
				 "title" : tracks[0].title ,
				 "duration" : tracks[0].duration ,
				 "created_at": tracks[0].created_at}
	if trackcollection.find_one({"_id" : tracks[0].id}) == None:
			trackcollection.insert_one(track)
	
#	if tracks[0].duration > 480000:
#		print ("...inserting SET into DB if it does not exist already")

#		setTrack = { "_id" : tracks[0].id ,
#				  "title" : tracks[0].title ,
#				  "duration" : tracks[0].duration}
#		if setcollection.find_one({"_id" : tracks[0].id}) == None:
#			setcollection.insert_one(setTrack)

	