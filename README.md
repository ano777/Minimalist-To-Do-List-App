# Minimalist-To-Do-List-App

A functional, responsive, and styled To-Do List web application built for my internship challenge.

## Live Demo
[Insert your Netlify link here once deployed]

## Features Implemented
- **Task Management:** Users can add tasks via an input field or by pressing the 'Enter' key.
- **Priority Levels:** Assign Low, Medium, or High priority to tasks, with color-coded visual badges.
- **Task Status:** Mark tasks as complete, which visually fades them, applies a strikethrough, and automatically moves them to the bottom of the list.
- **Edit & Delete:** Full CRUD capabilities allow users to edit existing task text or delete tasks entirely.
- **Dynamic Filtering:** Filter the view by 'All', 'Pending', or 'Completed' tasks without losing data.
- **Clean UI:** Responsive design using CSS Flexbox with smooth hover transitions and animations.

## Bonus Features
- **Dark Mode Toggle:** Added a fully functional Dark/Light theme toggle for better user experience.

## Challenges Faced

- **1. Corrupted Local Storage Data:** During development, I encountered an `Uncaught SyntaxError` where `"undefined" is not valid JSON`. I realized this was caused by residual, corrupted data left in the browser's local storage from previous sessions. I resolved this by using the Chrome Developer Console to run `localStorage.clear()` to wipe the slate clean, and ensured my JavaScript had a reliable fallback (`|| []`) so the app wouldn't crash if the storage was empty.
- **2. Preserving Data while Filtering:** When building the "Pending" and "Completed" filter buttons, I initially struggled with how to hide tasks without permanently deleting them from the list. I solved this by creating a separate `displayTasks` array inside my render function. This allowed me to safely use the `.filter()` method to change what the user sees on the screen, while keeping the master `tasks` array completely intact in the background.

## How to Run the App
No installation or build steps are required. 
1. Clone this repository or download the ZIP file.
2. Open the `index.html` file directly in any modern web browser.
