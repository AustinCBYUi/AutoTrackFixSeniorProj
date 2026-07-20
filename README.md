# AutoTrack Client Management System

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.
#### Written and Developed by Austin Campbell Copyright 2026

Instructor login to test features if needed
username: teacher@byui.edu
password: teach1

## Application Plan
#### Purpose
 * This Full-Stack Web Application is a senior project, it is a client management system to track clients and their vehicles for a automotive business.
#### Features
>*Core Features*
>* Robust customizable Client Management system (Different fields as needed)
>* Project and task tracking
>* User management system for employees

>*Technical Requirements*
> * Angular
> * JavaScript
> * Node.JS
> * MongoDB?
 
### Hosting
Backend needs to be hosted on Render, remove NPM run build command from the build.
Entire application needs to then be hosted on Netlify. Make sure to remove localhost
private development strings from the services and put the Render connection strings
in instead.

#### Architecture
>*Frontend*<br>
> The frontend will be designed and developed in the Angular Framework

> *Backend*<br>
> Node.js and Express

> *Database*<br>
> MongoDB

## Directory Scaffolding
>- core/
>For singleton services, global configurations, and modules that should only be loaded once (e.g., authentication, app-wide interceptors).
>
>- shared/
>For reusable components, directives, and pipes used across multiple features.
>
>- features/
>Contains feature-specific modules and components. Each feature should ideally have its own module.
>
>- app-routing.module.ts
>Defines routes for the application. Can import routes from feature modules.


## Development

To start a local development server, run:
Running the front end: *ng serve*
Running the back end: "cd backend", then node server.js.
// For more information, visit: https://go.microsoft.com/fwlink/?linkid=827846

In the services, all service URLs must reflect the production URL instead of a development localhost, this includes
the auth service in the auth folder:
`export class ServiceService {
  private baseUrl =
    'https://autotrackfixseniorproj.onrender.com/services';`

needs to be 

`export class ClientService {
  // private baseUrl = 'this is for production urls like https://salesinspectorcms-1-q08b.onrender.com/clients'
  //private baseUrl = 'http://localhost:3000/clients'; //Replace with proper API endpoint`

## Model / Schema Modification
Database Models must be changed in the backend (models), and anywhere they are referenced.

### Todos
- Finish Client component
- Integrate client edit form

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
