setlocal
taskkill /F /IM node.exe
set "my_dir=%cd%"
cd %my_dir%\backend && start node server.js & 
cd %my_dir%\frontend-web && start npm run dev & 
cd %my_dir%\frontend-admin && start npm run dev