REM https://conemu.github.io/en/NewConsole.html
REM https://conemu.github.io/en/ConEmuArgs.html
REM https://conemu.github.io/en/TableOfContents.html
REM https://superuser.com/questions/593612/run-series-of-commands-in-different-tabs-in-conemu
start /d "C:\Program Files\ConEmu\" ConEmu64.exe /cmdlist ^> cmd -cur_console:t:"Project":d:C:\MyLearn\MeanCricket  ^|^|^| cmd -cur_console:t:"NodeBackend":d:C:\MyLearn\MeanCricket\backend-api /k "nodemon app.js" ^|^|^| cmd -cur_console:t:"AngularFrontend":d:C:\MyLearn\MeanCricket\frontend /k "ng serve"

REM https://stackoverflow.com/questions/36969586/running-visual-studio-code-in-the-current-folder-with-batch-file
start /d "C:\Users\jaypal\AppData\Local\Programs\Microsoft VS Code\" Code.exe C:\MyLearn\MeanCricket\backend-api
start /d "C:\Users\jaypal\AppData\Local\Programs\Microsoft VS Code\" Code.exe C:\MyLearn\MeanCricket\frontend

ping 127.0.0.1 -n 8
start /d "C:\Program Files\Git\cmd\" git-gui.exe --working-dir C:\MyLearn\MeanCricket

start "" "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "http://localhost:4200/"
