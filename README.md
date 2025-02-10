# GymSaga

<img src="https://github.com/user-attachments/assets/d59159a1-7f35-45e0-916f-07f5e665682a" width="250">

## Unreleased

**PSA:** This is a personal project for learning purposes, so it may or may not be released.

GymSaga is a Progressive Web App (PWA) for gym enthusiasts that combines social networking with a crowdsourced gym map. It lets users share and discover gym details like available machines, cleanliness, and facilities. Accessible on both mobile and desktop, GymSaga helps you connect, explore, and stay motivated on your fitness journey! 💪🗺️

---

## Table of Contents

- [Local Installation](#local-installation)
  - [1. Install Node.js](#1-install-nodejs)
    - [Windows Automatic Installer (Recommended)](#windows-automatic-installer-recommended)
    - [Winget Terminal Script](#winget-terminal-script)
  - [2. Install Git](#2-install-git)
  - [3. Clone the Repository](#3-clone-the-repository)
  - [4. API Endpoints](#4-api-endpoints)
  - [5. Run the Frontend](#5-run-the-frontend)
  - [6. Run the Backend](#6-run-the-backend)
  - [7. Accessing the Application](#7-accessing-the-application)

---

## Local Installation

### 1. Install Node.js

Ensure [Node.js](https://nodejs.org/) is installed on your system. Choose one of the following methods:

#### Windows Automatic Installer (Recommended)

Download and install Node.js using the [Node.js MSI Installer](https://nodejs.org/dist/v23.7.0/node-v23.7.0-x64.msi).

#### Winget Terminal Script

Install Node.js via the Windows terminal using the Fast and Simple Node.js Manager:

1. **Install fnm:**
    ```
    winget install Schniz.fnm
    ```
2. **Install Node.js:**
    ```
    fnm install 23
    ```
3. **Verify Node.js installation:**
    ```
    node -v
    ```
4. **Verify npm installation:**
    ```
    npm -v
    ```

---

### 2. Install Git

Download and install Git using the [Git 64-bit Installer](https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.2/Git-2.47.1.2-64-bit.exe).

---

### 3. Clone the Repository

Open a terminal, navigate to your desired directory, and run:

```
git clone https://github.com/GCF14/GymSaga
```

---

### 4. API Endpoints

To obtain the API endpoints, contact the repository collaborators via the GitHub issues tab or through direct messaging.

---

### 5. Run the Frontend

1. Open a terminal (Windows or VSCode) and navigate to the GymSaga base directory.
2. Change to the `frontend` folder:
    ```
    cd frontend
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Run the development server:
    ```
    npm run dev
    ```

---

### 6. Run the Backend

1. Open a terminal (Windows or VSCode) and navigate to the GymSaga base directory.
2. Change to the `backend` folder:
    ```
    cd backend
    ```
3. Install dependencies:
    ```
    npm install
    ```
4. Run the development server:
    ```
    npm run dev
    ```

---

### 7. Accessing the Application

After starting the frontend server, open your browser and navigate to the localhost address with the port provided in your terminal output. Google Chrome is recommended, though any modern browser should work.
