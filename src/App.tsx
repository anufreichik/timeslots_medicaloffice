import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TimeSlotDropDown from "./TimeSlotDropDown";
import TaxiForm from "./TaxiForm";

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
        <div>
            <TimeSlotDropDown timeSlotsSetup={timeSlotsSetup} unavailableSlotIndexes={unavailableSlotIndexes}
                              updateUnavailableSlotIndexes={updateUnavailableSlotIndexes}/>

            <TaxiForm/>
        </div>
    );
}

export default App;
