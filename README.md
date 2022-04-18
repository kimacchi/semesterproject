## This is my project for finishing the second semester in computer engineering

# Focus

### Released! Check out the beta version: focus-rouge.vercel.app

#### Note: This project was previously planned to be a Nonogram Web Puzzle game. However, this idea is now completely removed from the project. I will now explain what this project is about.

##### <bold>What is this project all about?</bold>

This project is a combination of several tools that aims to help you manage your life better and improve your quality of life. It has some core features like managing your appointments, viewing your budget etc. It also has a project-orianted to-do feature where you can manage your projects and how to accomplish them step by step. 


Progress:
 - [x] REST API for the project
 - [x] Login/register page
 - [x] Activity list
 - [x] Page to organize activities
 - [x] Projects list widget
 - [x] To do widget
 - [x] Pomodoro widget
 - [ ] Settings page (this is not official but I've been wanting to make a theme change feature and add some customization to the app)
 - [ ] Social page (this will happen only if I want to experiment with P2P messaging, social media features etc. )


Known problems:
<br></br>
 Major:
  * There are unreasonable amounts of requests to the backend when someone signs in. Resulting in the backend server crashing and reseting the database.
  <br></br>
 Minor:
  * There are some performance issues with the whole app.  

Fixed problems:
<br></br>
  * Fixed patch request, and issues connecting to the database.
  * Fixed the bug where switching between projects would copy the todo information of the previous project to the next one. That bug is no longer present and you now can have as many projects as you like and have seperate todo data in them without any issue.
  * Fixed the bug where the entire app crashes on certain actions with todo widget. Appearently the problem was when moving something from the Done column it was checking for the To do column instead, which crashed the app.


##### Note for my teachers: This app has two seperate backends. The app was initially created with pure sql queries, and is also useable with that version of the local API. However, I wanted to upload the app to online so that anyone can use it. I also wanted to develop it further so I can put more to my portfolio. The backend API I initially created was not supported by Azure, which is (as per my knowledge) was the only way to deploy an .Net Core app to online. So I created a second API using AspNet Core MVC functions and Entity Framework Core, which are required to connect to an online database and get HTTP requests. That version of API uses specialized functions instead of pure SQL Queries. In both cases, I used MSSQL. The initially created local database is on my computer. The database used online is not local and is not editable unless used with SSDT(SQL Server Data Tools). Both of the databases are relatively same though, both having the same relational structure and the same variables(except for two rows Username and UserId, which are automatically renamed to username and userId in the Azure Database, since Azure database doesn't allow uppercase first letters.).

##### If you want to run the server locally, which I will also do during presentation, there must be some changes made to the frontend files. Current release is tied to online database which I will not share the link of due to concerns of missuse. Although I plan on creating another repository for locally hostable frontend server.

##### Initial backend: https://github.com/kimacchi/semesterproject_backend
##### Online backend: https://github.com/kimacchi/FocusAzureBackend

