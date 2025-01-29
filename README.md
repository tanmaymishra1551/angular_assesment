## Screenshot 🖼️

<img src="https://github.com/tanmaymishra1551/angular_assesment/blob/main/form1.png?raw=true">
<img src="https://github.com/tanmaymishra1551/angular_assesment/blob/main/form2.png?raw=true">

### Step 1: Frontend Setup

1. Open a terminal (PowerShell or equivalent).
2. In folder angular_assesment:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```

---

### Step 2: Backend Setup

1. Open another terminal (PowerShell or equivalent).
2. Navigate to the backend directory:
   ```bash
   cd .\backend
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Navigate to the `src` folder:
   ```bash
   cd src
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

---

### Step 3: Configure Environment Variables

1. In the `backend` folder, create a new file named `.env`.
2. Add the following content to the `.env` file
   ```env
   PORT=8000
   CORS_ORIGIN=http://localhost:4200
   ```

---

### Step 4: Test the Application

1. Open your browser and navigate to:
   ```
   http://localhost:4200/
   ```

# AngularStaterTemplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Creaate new project
Run `ng new project-name` and press enter
Here ng new angular_starter_template

## Development server
Run `ng serve` for a dev server. 
Navigate to `http://localhost:4200/`. 
The application will automatically reload if you change any of the source files.

## Components (Feauters)
Run `ng generate component component-name` 
Verify in `app.module.ts` file under `@NgModule -> declarations` component name should be added.

## Angular Material
Run `ng add @angular/material` to add angular material in project
Verify in `package.json` file under `dependencies` `"@angular/material` should be present

## How to use angular material components
In `app.module.ts` file import components
Add selectors in `app.component.html` file
Add html in `component-name.component.html` file

### How to use tailwindCSS with Angular16
In root folder (not in src folder)
Run `npm install -D tailwindcss@3.0.0 postcss autoprefixer`
Run `npx tailwindcss init`
Note: `tailwind.config.js` file is created in root folder

`tailwind.config.js`
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

`src/styles.css`
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

### Run Development server (`ng serve`) in root folder not in src folder

### Routing
In `app.module.ts`
Step 1: import { RouterModule, Routes } from '@angular/router';

Step 2: Make a const with Routes type & path should not contain leading slash
const appRoutes: Routes = [{path: 'home', component:HomeComponent},]

Step 3: In imports add
RouterModule.forRoot(appRoutes)

Step 4: In anchor tag replace href with routerLink
<a routerLink="/home">

Step 5: Use router-outlet tag at place where you have to display component.

### Data Sharing 
1. Parent-Child -> Use @Input() decorator
NOTE: input value is assigned only after the component is initialized by the Angular framework.
2. Child-Parent -> User @Output() decorator
@Output() dataEmitter = new EventEmitter<string>();

emitData() {
    this.dataEmitter.emit('Tanmay Mishra');
  }
3. Sibling-Sibling
