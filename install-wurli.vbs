Option Explicit

dim wsh: set wsh = WScript.CreateObject("WScript.Shell")
dim fso: set fso = WScript.CreateObject("Scripting.FileSystemObject")

dim path: path = Replace(WScript.ScriptFullName, WScript.ScriptName, "")
dim name: name = "wurli"
dim target: target = path & name & ".bat"
dim icon: icon = path & name & ".ico"
dim lnkFile: lnkFile = path & name & ".lnk"

dim lnk: set lnk = wsh.CreateShortcut(lnkFile)
lnk.TargetPath = target
lnk.IconLocation = icon
lnk.Description = name
'lnk.Arguments = ""
'lnk.HotKey = "ALT+CTRL+F"
'lnk.WindowStyle = "1"
'lnk.WorkingDirectory = "C:\Program Files\MyApp"
lnk.Save

dim yesnoButtons: yesnoButtons = 4
dim yes: yes = 6
dim answer: answer = MsgBox("A shortcut has been created. Would you like to place a copy in your 'Send To' context menu in Windows Explorer?", yesnoButtons, "wurli - Install to Send To?")

dim destination: destination = wsh.ExpandEnvironmentStrings("%AppData%\Microsoft\Windows\SendTo\")

if answer = yes then
	fso.CopyFile lnkFile, destination, true
end if