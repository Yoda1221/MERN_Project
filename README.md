# MERN_Project BackEnd

## User Stories for techNotes

1.  [ ] Replace current sticky note system
2.  [ ] Add a public facing page with basic contact info 
3.  [ ] Add an employee login to the notes app 
4.  [ ] Provide a welcome page after login 
5.  [ ] Provide easy navigation
6.  [ ] Display current user and assigned role 
7.  [ ] Provide a logout option 
8.  [ ] Require users to login at least once per week
9.  [ ] Provide a way to remove user access asap if needed 
10. [ ] Notes are assigned to specific users 
11. [ ] Notes have a ticket #, title, note body, created & updated dates
12. [ ] Notes are either OPEN or COMPLETED 
13. [ ] Users can be Employees, Managers, or Admins 
14. [ ] Notes can only be deleted by Managers or Admins 
15. [ ] Anyone can create a note (when customer checks-in)
16. [ ] Employees can only view and edit their assigned notes  
17. [ ] Managers and Admins can view, edit, and delete all notes 
18. [ ] Only Managers and Admins can access User Settings 
19. [ ] Only Managers and Admins can create new users 
20. [ ] Desktop mode is most important but should be available in mobile 

## Start Project
- npm init -y
- npm i express express-async-handler express-rate-limit
- npm i bcrypt cookie-parser cors date-fns jsonwebtoken uuid
- npm i mongoose <!-- mongoose-sequence -->
- npm i nodemon -D

## Create folders (MacOSX Teminal)
- md controllers logs middlewares models public public/css public/js public/img routes services views 

## Create files (MacOSX Teminal)
- touch controllers/AuthController.js controllers/UsersController.js
- touch middlewares/ErrorHandler.js middlewares/Logger.js middlewares/LoginLimiter.js middlewares/VerifyToken.js
- touch models/user.js 
- touch server.js .gitignore public/css/style.scss
- touch services/corsOptions.js services/dbConn.js services/services.js
- touch routes/routes.js routes/authRoutes.js routes/userRoutes.js
- touch views/index.html views/404.html
