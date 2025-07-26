# Raffle Application

This is a responsive React application for a raffle where users can choose a number from 1 to 100. The application allows users to select numbers, categorize them, and provide their contact information.

## Project Structure

```
guel-raffle
├── public
│   └── index.html
├── src
│   ├── components
│   │   ├── NumberTable.tsx
│   │   ├── CategorySelector.tsx
│   │   ├── UserForm.tsx
│   │   └── ExampleComponent.tsx
│   ├── images
│   │   └── bg_1.jpg
│   ├── App.tsx
│   ├── index.tsx
│   └── styles
│       └── App.css
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **Number Selection**: Users can select numbers from 1 to 100.
- **Category Display**: Selected numbers are categorized into specified ranges (Fralda P, M, G, GG).
- **User Input**: Users can enter their name and contact number after making a selection.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/guel-raffle.git
   ```

2. Navigate to the project directory:
   ```
   cd guel-raffle
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- Select a number from the table displayed on the main page.
- The selected number will be highlighted.
- Choose the appropriate category for your selection.
- Fill in your name and contact number in the form provided.
- Submit the form to complete your entry into the raffle.

## License

This project is licensed under the MIT License.