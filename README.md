# Plug and Play Numbers Game

А modular, interactive front-end system for creating, organizing, and connecting visual blocks called **cells**. Designed for flexibility and extensibility, it allows the dynamic construction of a network of cells that can generate, transform, and exchange data.

## Key Features

- Dynamic creation and management of cells
- Connecting cells to each other with validation rules
- Extensible architecture for adding new types of elements
- Reactive UI that updates instantly with every change

## Architecture Overview

### CellOrganizer

The central component that manages the layout and interactions between all cells. It supports:

- Adding new cells
- Organizing cells into rows and columns
- Managing connections between cells

### Cell Structure

Cells are arranged in a flexible grid layout:

- **Rows**: A collection of `Cols` and `Cells`
- **Cols**: A collection of `Rows` and `Cells`

This nesting allows for a dynamic and adaptable visual structure.

## Cell Elements

Each cell can contain an **element**, which falls into one of the following types:

### Generator – produces data:

- `Generate Random Number`
- `Generate Odd Number`
- `Generate Even Number`
- `Something Else` (always returns `42`)

### Transformator – transforms input data:

- `Add 5`
- `Multiply by 2`
- `Mod 10`
- `Delay` (waits 5 seconds before returning the result)

## Connections

Cells can be connected to each other, but must follow strict rules:

- Allowed: `Generator ➝ Transformator`
- Allowed: `Transformator ➝ Transformator`
- Not Allowed: `Generator ➝ Generator`
- Not Allowed: `Transformator ➝ Generator`

The direction of the connection defines the data flow. A single transformator cell can receive input from multiple generators or other transformators.

## Data Calculation Flow

1. Generator cells are evaluated first to produce initial data.
2. Each transformator waits until all its input data is available.
3. Once ready, the transformator applies its transformation and passes the result to the next connected cells.
4. This process continues until all cells with elements are processed.

The system keeps track of computed values for each cell.

## State Management

The application uses React's Context API for state management. Contexts are provided to share data between components, including:
The list of cells and their current configuration
Connections between cells
Calculated values and updates
This enables a centralized and reactive flow of data across the entire application. When a cell is added, updated, or connected, the UI reflects those changes instantly without requiring manual refresh.

## Tech Stack

- **React**
- **Vite**
- **TypeScript**
