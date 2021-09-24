import React, {useState} from 'react';
import './App.css';
import TimeSlotDropDown from "./TimeSlotDropDown";

export interface ISetup {
    officeTimeStart: string;
    officeTimeEnd: string;
    appointmentSlot: number;
}

const timeSlotsSetup: ISetup = {
    officeTimeStart: '08:00:00',
    officeTimeEnd: '17:00:00',
    appointmentSlot: 30
}

function App() {

    const [unavailableSlotIndexes, setUnavailableSlotIndexes] = useState<number[]>([]);

    const updateUnavailableSlotIndexes = (ind: number) => {
        if (ind >= 0) {
            setUnavailableSlotIndexes([...unavailableSlotIndexes, ind]);
        }
    }

    return (
        <div className="App">
            <TimeSlotDropDown timeSlotsSetup={timeSlotsSetup} unavailableSlotIndexes={unavailableSlotIndexes}
                              updateUnavailableSlotIndexes={updateUnavailableSlotIndexes}/>
        </div>
    );
}

export default App;
