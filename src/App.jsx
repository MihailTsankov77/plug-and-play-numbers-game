import './App.css'
import {CellOrganizer} from "./cell.collection/components/cell.organizer/CellOrganizer";
import {CellElementsProvider} from "./cell.collection/contextes/CellElementsContext";

function App() {
  return( 
    <CellElementsProvider>
      <CellOrganizer/>
    </CellElementsProvider>)
}

export default App
