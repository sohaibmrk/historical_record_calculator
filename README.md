# Historical Record Calculator

Web calculator for filling in the *Assembly Historical Record* (log card) of
aviation components: given the **installation** data and the aircraft hours /
landings at **removal**, it calculates the values with which the component
is signed off (Time, Time Component and Time Since Overhaul).

## Features

- Hours (HH:MM format) and landings calculation at removal.
- Live **HH:MM ⇄ decimal** converter in the header.
- Validation: if the removal reading is lower than the installation, it warns and blocks the calculation.
- Static interface, no dependencies or backend required.

## Usage

Open `index.html` in any browser. No installation required.

1. Fill in the **INSTALLATION** section (A/C Total, Assy Total and Time Since Overhaul).
2. Fill in the **REMOVAL** section with the current hours and landings reading.
3. Press **CALCULATE** to see the results under *VALUES AT REMOVAL*.

## Structure

- `index.html` — page structure.
- `style.css` — styles (aeronautical log card aesthetic).
- `script.js` — calculation logic and converter.

## Technology

Pure HTML, CSS and JavaScript (no frameworks).
