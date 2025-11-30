Project Idea : Bookmark Maker

What it can do :
Create a Bookmark with a:

1. title (name of bookmark)
2. Color (doesnt really show a color but lets pretend it does. There's a selection of colors to choose from in app.config.js)
3. Page Number (nothing to show page so we'll just input the page ourselves as an integer)
4. Notes (for the description of the text)

Commands to put in Postman :
GET :
(ALL): http://localhost:3000/api/bookmarks
(Specific): http://localhost:3000/api/bookmarks/[index]

POST : (make sure to specify it as raw and JSON). Write it down in the body according to the format and click send
http://localhost:3000/api/bookmarks/[index]

PUSH : (Write it down in the body according to the format and click send)
http://localhost:3000/api/bookmarks/[index]

DELETE :
http://localhost:3000/api/bookmarks/[index]
