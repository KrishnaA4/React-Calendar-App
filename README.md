# React Calendar App

## Overview
The React Calendar App is a dynamic and user-friendly tool designed to manage and track communications with multiple companies. The app has two main modules: the User Dashboard and the Admin Dashboard.

### Key Features
- **User Dashboard:**
  - Notifications and Calendar icons to display relevant details when clicked.
  - Log new communications with specific companies.
  - View a table of companies, their last five communications, and the next scheduled communication.
  - Color-coded highlights for overdue (red) and due-today (yellow) communications.
  - Hover tooltips to display notes for past communications.
  - Calendar view to manage past and upcoming communications.
- **Admin Dashboard:**
  - Add new companies to the database.
  - Edit existing company details, including past communications and future schedules.

## Setup Instructions

### Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A code editor like [Visual Studio Code](https://code.visualstudio.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd react-calendar-app
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Build for Production
To create an optimized production build:
```bash
npm run build
# or
yarn build
```

### Deployment
1. Upload the contents of the `build` folder to your hosting platform.
2. For GitHub Pages deployment, follow these steps:
   - Install the `gh-pages` package:
     ```bash
     npm install gh-pages --save-dev
     ```
   - Add the following scripts to your `package.json`:
     ```json
     "homepage": "http://<your-github-username>.github.io/<repository-name>",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
     ```
   - Deploy the app:
     ```bash
     npm run deploy
     ```

## Application Functionality

### User Dashboard
- **Notifications:** Displays overdue and due-today communications.
- **Calendar View:** Manage past and upcoming communications.
- **Log Communication:** Add a new communication entry for one or multiple companies, specifying type, date, and notes.
- **Table View:** Displays company details, recent communications, and upcoming schedules with interactive features like hover tooltips and highlight toggling.

### Admin Dashboard
- **Add New Companies:** Admins can add new companies, specifying their details and schedules.
- **Edit Companies:** Admins can update information for existing companies, including past communications and future schedules.

## Known Limitations
- The app currently does not support user authentication or role-based access control.
- No backend integration; data is stored in-memory and resets on page refresh.

## Technologies Used
- **Frontend:** React.js
- **Styling:** Tailwind CSS
- **Icons:** FontAwesome
- **Tooltips:** React Tooltip

## Folder Structure
```plaintext
src
├── components
│   ├── Admin
│   │   ├── AddCompanyForm.js
│   │   ├── EditCompanyForm.js
│   ├── User
│   │   ├── Notifications.js
│   │   ├── CommunicationActionModal.js
│   │   ├── CalendarView.js
├── pages
│   ├── AdminDashboard.js
│   ├── UserDashboard.js
├── App.js
├── index.js
```

## Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

## Live Demo
[React Calendar App](https://react-calendar-app-krishna.netlify.app)
