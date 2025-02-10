# GymSaga

<img src="https://github.com/user-attachments/assets/d59159a1-7f35-45e0-916f-07f5e665682a" width="250">

## (Unreleased)

PSA: This is a personal project for learning so it may or may not be released

A Progressive Web App (PWA) for gym enthusiasts, combining social networking with a crowdsourced gym map. GymSaga lets users share and discover gym details like available machines, cleanliness, and facilities. Accessible on both mobile and desktop, GymSaga helps you connect, explore, and stay motivated in your fitness journey! 💪🗺️

## 📥 Local Installation
The first step is to install Node.js. You can either do this by either downloading the automatic windows installer or install it from PowerShell using Winget
<br></br>
### 1. Node.js Windows Automatic Installer (Recommended)
Download and install Node.js using [Node.js MSI Installer](https://nodejs.org/dist/v23.7.0/node-v23.7.0-x64.msi)

### Node.js Winget Terminal Script
Download Node.js through the Fast and Simple Node.js Manager using the Windows terminal
1. Download fnm
  ```
  winget install Schniz.fnm
  ```
2. Download Node.js
  ```
  fnm install 23
  ```
3. Verify Node.js installation
  ```
  node -v
  ```
4. Verify npm installation
  ```
  npm -v
  ```

<br></br>

### 2. Git Windows Installer
Download and install Git using [Git 64-bit Installer](https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.2/Git-2.47.1.2-64-bit.exe)

<br></br>

### 3. Clone this repository
Select the directory you want this repository to be downloaded in using the terminal then clone it to the directory
  ```
  git clone https://github.com/GCF14/GymSaga
  ```

<br></br>

### 4. Contact the repo collaborators for the API endpoints through the issues tab or directly messaging them through personal platforms

<br></br>

### 5. Run the frontend
Use either the Windows terminal or the VSCode terminal and navigate to the GymSaga base directory
1. Change directory to the frontend folder
  ```
  cd frontend
  ```
2. Install all dependencies
  ```
  npm install
  ```
3. Run the program
  ```
  npm run dev
  ```

<br></br>

### 6. Run the backend
Use either the Windows terminal or the VSCode terminal and navigate to the GymSaga base directory
1. Change directory to the backend folder
  ```
  cd backend
  ```
2. Install all dependencies
  ```
  npm install
  ```
3. Run the program
  ```
  npm run dev
  ```

<br></br>

### 7. Open the localhost connection through the port returned by the frontend npm run dev
Google Chrome is recommended but it should support any other browsers
