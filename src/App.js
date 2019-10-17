import React from 'react';
import BloodBanksTable from './components/BloodBanksTable';
import { createBloodBank } from './mockerUtils';

const data = [
  ...createBloodBank("Ramallah", "Ramallah Hospital"),
  ...createBloodBank("Ramallah", "Arab Care Hospital"),
  ...createBloodBank("Nablus", "Najah University Hospital"),
]

function App() {
  return (
    <div >
        <h1>
          Blood Banks
        </h1>
        <BloodBanksTable rows={data} />
    </div>
  );
}

export default App;
