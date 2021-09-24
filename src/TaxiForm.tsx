import React, {ChangeEvent, useState} from 'react';

const TaxiForm: React.FC = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [airport, setAirport] = useState('');
    const [terminal, setTerminal] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [showTerminals, setShowTerminals] = useState(false);


    interface ITaxiForm {
        name: string;
        phone: string;
        arrivalDate: string;
        airport: string;
        terminal?: string;
        flightNumber: string;
    }

    const handleAirportChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setAirport(e.target.value);
        setShowTerminals(e.target.value === 'Heathrow');

    }


    const handleSubmit = () => {
        const result:ITaxiForm = {
            name, phone, arrivalDate, airport, terminal, flightNumber
        }
        localStorage.setItem('taxiForm',JSON.stringify(result));
    }



return (
    <div className='container'>
        <div className="row">
            <label htmlFor="nameInput" className="form-label">Name</label>
            <input type="text" className="form-control" id='nameInput'
                   placeholder="Your Name" onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className="row">
            <label htmlFor="phoneInput" className="form-label">Mobile Phone</label>
            <input type="text" className="form-control" id='phoneInput'
                   placeholder="888-555-5555" onChange={(e) => setPhone(e.target.value)}/>
        </div>

        <div className="row">
            <label htmlFor="arrivalDate" className="form-label">Arrival Date</label>
            <input type="text" className="form-control" id='arrivalDate'
                   onChange={(e) => setArrivalDate(e.target.value)}
            />
        </div>

        <div className="row">
            <label htmlFor="airport" className="form-label">Airport</label>
            <select className="form-select" aria-label="Select Airport" id='airport' onChange={handleAirportChange}>
                <option defaultValue=''>Select Airport</option>
                <option value="1">Heathrow</option>
                <option value="2">Gatwick</option>
            </select>
        </div>

        {showTerminals &&
        <div className="row">
            <label htmlFor="terminal" className="form-label">Airport</label>
            <select className="form-select" aria-label="Select Terminal" id='terminal' onChange={(e) => setTerminal(e.target.value)}>
                <option defaultValue=''>Select Terminal</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">Not Sure</option>

            </select>
        </div>
        }
        <div className="row">
            <label htmlFor="flightNumber" className="form-label">Flight #</label>
            <input type="text" className="form-control" id='flightNumber' onChange={(e) => setFlightNumber(e.target.value)}
                   placeholder="AB4590"/>
        </div>
        <div className='row'>
            <button className='btn btn-primary mt-3' onClick={handleSubmit}>Submit</button>
        </div>
    </div>
);
}

export default TaxiForm;
