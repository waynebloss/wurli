add-type -assemblyName "Microsoft.VisualBasic"
[Microsoft.VisualBasic.FileIO.FileSystem]::DeleteFile("$($args[0])",'OnlyErrorDialogs','SendToRecycleBin')