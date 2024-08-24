# Show Symlink Source

## Features

This extension shows the source of symlink files in Visual Studio Code.

When you open a symlink file in VS Code, the extension will automatically display the path to the original file in the status bar. This helps you quickly identify the actual location of the file you're editing.

## How it works

- The extension activates for all file types.
- When a file is opened, it checks if the file is a symlink.
- If it is a symlink, the path to the original file is displayed in the status bar.
- The path is shown as relative to the workspace root if possible, or as an absolute path if the file is outside the workspace.
- A link icon ($(link)) is used to indicate that the displayed path is for a symlink.

## Usage

1. Open a file that is a symlink in VS Code.
2. Look at the status bar at the bottom of the VS Code window.
3. You will see a link icon followed by the path to the original file.

No additional commands or actions are needed - the extension works automatically in the background.

## Requirements

This extension doesn't have any special requirements or dependencies.

## Extension Settings

This extension doesn't add any VS Code settings.

## Known Issues

Currently, there are no known issues. If you encounter any problems, please report them on the GitHub repository.

## Release Notes

### 1.0.0

Initial release of Show Symlink Source.

- Automatically detects symlink files
- Displays the source path in the status bar
- Shows relative paths when possible

---

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**