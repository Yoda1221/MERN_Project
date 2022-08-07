# MERN_Project

## User Stories for techNotes

1. [ ] Replace current sticky note system
2. [ ] Add a public facing page with basic contact info 
3. [ ] Add an employee login to the notes app 
4. [ ] Provide a welcome page after login 
5. [ ] Provide easy navigation
6. [ ] Display current user and assigned role 
7. [ ] Provide a logout option 
8. [ ] Require users to login at least once per week
9. [ ] Provide a way to remove employee access asap if needed 
10. [ ] Notes are assigned to specific employees 
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
- npm i express date-fns uuid cookie-parser cors
- npm i nodemon -D

## Create files and folders (MacOSX Teminal)
- md public public/css public/js public/img routes views middlewares logs services
- touch server.js .gitignore public/css/style.scss
- touch routes/routes.js views/index.html views/404.html
- touch middlewares/logger.js middlewares/errorHandler.js
- touch services/corsOptions.js services/services.js
