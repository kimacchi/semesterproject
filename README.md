## This is my project for finishing the second semester in computer engineering

# Undecided Name

#### Note: This project was previously planned to be a Nonogram Web Puzzle game. However, this idea is now completely removed from the project. I will now explain what this project is about.

##### <bold>What is this project all about?</bold>

This project is a combination of several tools that aims to help you manage your life better and improve your quality of life. It has some core features like managing your appointments, viewing your budget etc. It also has a project-orianted to-do feature where you can manage your projects and how to accomplish them step by step. 


Progress:
 - [x] REST API for the project
 - [x] Login/register page
 - [x] Activity list
 - [x] Page to organize activities
 - [x] Projects list widget
 - [x] To do widget (has some major bugs, it is not usable if you have more than one project linked to your account. Although it works just fine if you have one project.)
 - [ ] Analytics widget
 - [ ] Page to manage budget
 - [ ] Settings page (this is not official but I've been wanting to make a theme change feature and add some customization to the app)
 - [ ] Social page (this will happen only if I want to experiment with P2P messaging, social media features etc. )


Known problems:
<br></br>

  <br></br>
 Minor:
  * There are some performance issues with the whole app, but they are more appearent when using To do widget.  

Fixed problems:
<br></br>
  * Fixed the bug where switching between projects would copy the todo information of the previous project to the next one. That bug is no longer present and you now can have as many projects as you like and have seperate todo data in them without any issue.
  * Fixed the bug where the entire app crashes on certain actions with todo widget. Appearently the problem was when moving something from the Done column it was checking for the To do column instead, which crashed the app.
