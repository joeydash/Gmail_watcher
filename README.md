# Gmail Watcher for IIT Madras
![InstituteWebOps](https://avatars2.githubusercontent.com/u/26603004?s=200&v=4)

install npm and nodejs

install npm modules
`npm install inbox mailparser-mit --save`

enter your email id and password in routes/index.js

run joeydash's program
`node bin/www`

filename test.js is a shorthand test file

Used to get data from the given e-mail and parse the important data as a JSON string
## How to use: 
* parsing function is the parse.js

#### IMPORTANT NOTE!!!: THe data which has to be parsed should be given inside '~< >~'(tilded-angular brackets),to separate it from the rest of the message junk in the original mail.for eg: ~< Date: 1-01-2018 >~

* The data which all are parsed are : 
  * Title 
  * DateTime 
  * Venue 
  * Contact 
  * Students
  * Addressed To
  * Organizer
  * Details
  * Tags
  * Interested No.

#### (Note: The interested people and Students Addressed are to be got from the From and To mail-id's respectively,so they are initially left null)

* The function to be called is parser(str), where the str is the subject of the mail to be given as a string

* The function outputs a JSON string with the respective tags for the data.

####  Example : 
![SampleMail](https://i.imgur.com/lrJWygh.png)
Parse Data :
`{
  "Title" : "Anime Quiz",
  "DateTime" : "2017-08-28T13:30:00.000Z",
  "Venue" : "Hsb 354"
  ,"Organizer" : null,
  "Details" : "Anime quiz for freshies",
  "Tags" : null,
  "Contact" : "Sukruth (9790469683)" ,
  "Interested" : null,
  "StudentsAddr" : null
  }`

