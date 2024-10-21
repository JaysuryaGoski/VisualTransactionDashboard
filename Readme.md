## Overview

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to manage and visualize product transaction data.

## Features

### Key Functionality
* Fetch transaction data from a third-party API and store it in MongoDB.
* API to list transactions with search, sorting, and pagination.
* API to generate statistical insights (total sales, sold/unsold items).
* API to display data for visualizations:
    * Bar chart (price range vs. number of items)
    * Pie chart (category vs. number of items)
* A single-page React application that integrates with the backend APIs to display and interact with the transaction data.

## API Endpoints

### 1. GET /api/transactions
* **Description:** List all transactions with search, sorting, and pagination.
* **Query Parameters:**
    * `search`: Filter transactions by name, product, etc.
    * `page`: Pagination page number (default: 1)
    * `limit`: Number of items per page (default: 10)

### 2. GET /api/statistics
* **Description:** Retrieve statistical insights including total sales, number of sold and unsold items.

### 3. GET /api/bar-chart?month={month}
* **Description:** Retrieve data for the bar chart showing the number of items in different price ranges for a specific month.
* **Query Parameters:**
    * `month`: The month for which to retrieve data (e.g., January, February)

### 4. GET /api/pie-chart
* **Description:** Retrieve data for the pie chart, displaying the number of items per category.

### 5. GET /api/seed
* **Description:** Fetches transaction data from the third-party API and seeds the MongoDB database.
