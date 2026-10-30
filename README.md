# Paradise Nursery

Repository: e-plantShopping

Paradise Nursery is a shopping cart web application for an online houseplant shop.
Browse plants by category, add them to your cart, change quantities, and see your running total.

## Features
- Landing page with a "Get Started" button
- Product listing with 3 categories and 6 plants each (thumbnail, name, price)
- "Add to Cart" button that disables after a plant is added
- Navbar with Home, Plants, and Cart links and a live cart count
- Cart page with per-plant subtotals, total amount, quantity +/- buttons, delete, checkout ("Coming Soon"), and Continue Shopping

## Tech stack
React, Redux Toolkit, React-Redux, Vite

## Getting started
```bash
npm create vite@latest paradise-nursery -- --template react
cd paradise-nursery
npm install @reduxjs/toolkit react-redux
# copy the files from src/ into your project's src/
npm run dev
```
