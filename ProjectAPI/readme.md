# READ ME

This branch has several files but is intended to provide an API that can fetch information based
on searching for all cocktails, specific cocktails, cocktails that you can make with ingredients you 
select and allow you to add cocktails to a saved table.

To build/ test this I have made a very simple SQL file that is included. This will not be needed if we
are building bigger/ better ones but shows the functionality. I have tried to add comments where things
will need to change.

### Issues
1. I did however with struggle with building an endpoint for the query based on ingredients. It can hook 
to the database but I couldn't figure out how to add different strings/ ingredients into endpoint.
2. In the example table for the 'saved cocktails' I set user ID as a primary key so needs to be unique 
so this would need removing in built one so an individual could save multiple cocktails.


### The files

1. __init__.py = the initialisation file
2. config.py = the password/ connection dato to database. I have left setup the same but you will need 
to add you own password.
3. db_utils.py = links to the database and functions to run queries. 
4. app.py = endpoints (as mentioned one of these doesn't fully work- it is commented out)
5. runAPI_main.py =  This is a file that runs all the functions- I used it to test them out, but can 
also call all the code and be expanded if there are any issues with the front end.