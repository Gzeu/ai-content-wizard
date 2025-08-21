# Cleanup script for the project

# Remove all files and directories except .git
Get-ChildItem -Path . -Force | Where-Object { $_.Name -ne '.git' } | Remove-Item -Recurse -Force

# Create a new empty .gitignore
echo "# Add files to ignore here" > .gitignore

echo "Project cleaned up. Ready for a fresh start!"
