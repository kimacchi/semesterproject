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
  <br></br>
 Minor:
  * There are some performance issues with the whole app.  

Fixed problems:
<br></br>
  * Fixed the lifecycle bug where there would be hundreds of requests to the backend because of the some requests being used outside of their related states.
  * Fixed patch request, and issues connecting to the database.
  * Fixed the bug where switching between projects would copy the todo information of the previous project to the next one. That bug is no longer present and you now can have as many projects as you like and have seperate todo data in them without any issue.
  * Fixed the bug where the entire app crashes on certain actions with todo widget. Appearently the problem was when moving something from the Done column it was checking for the To do column instead, which crashed the app.


##### Note for my teachers: This app has two seperate backends. The app was initially created with pure sql queries, and is also useable with that version of the local API. However, I wanted to upload the app to online so that anyone can use it. I also wanted to develop it further so I can put more to my portfolio. The backend API I initially created was not supported by Azure, which is (as per my knowledge) was the only way to deploy an .Net Core app to online. So I created a second API using AspNet Core MVC functions and Entity Framework Core, which are required to connect to an online database and get HTTP requests. That version of API uses specialized functions instead of pure SQL Queries. In both cases, I used MSSQL. The initially created local database is on my computer. The database used online is not local and is not editable unless used with SSDT(SQL Server Data Tools). Both of the databases are relatively same though, both having the same relational structure and the same variables(except for two rows Username and UserId, which are automatically renamed to username and userId in the Azure Database, since Azure database doesn't allow uppercase first letters.).

##### If you want to run the server locally, which I will also do during presentation, there must be some changes made to the frontend files. Current release is tied to online database which I will not share the link of due to concerns of missuse. Although I plan on creating another repository for locally hostable frontend server.

##### Initial backend: https://github.com/kimacchi/semesterproject_backend
##### Online backend: https://github.com/kimacchi/FocusAzureBackend


### Screenshots

##### Login/Register Page: 
![image](https://user-images.githubusercontent.com/85843873/163808312-b4155038-557b-4c77-8cb3-1c4bc64e4f8f.png)
![image](https://user-images.githubusercontent.com/85843873/163808369-9eaac5dd-45fe-42af-9815-73f5acae4dd7.png)
![image](https://user-images.githubusercontent.com/85843873/163808397-b21d863a-ace3-4138-b3d1-f6f485c2531b.png)

##### Home Page:
![image](https://user-images.githubusercontent.com/85843873/163808557-999fd2f7-f232-4602-b8ce-980e5f93456c.png)

##### Adding An Activity
![image](https://user-images.githubusercontent.com/85843873/163808641-2674884c-4866-4596-9086-1cb5f7f2472d.png)

##### Adding A Project (same widget with adding a to do task)
![image](https://user-images.githubusercontent.com/85843873/163808748-6981d3ed-a483-488c-8d26-aac955b1637b.png)
