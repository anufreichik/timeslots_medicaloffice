import React, {ChangeEvent, useState} from 'react';

/**
 * Create a webpage with a form to hire a taxi from Heathrow and Gatwick.
 Next fields should be included into the form:
 Your full name (required)
 Your mobile phal (required, valid date)
 Airport (optione (required, valid UK phone number format)
 Date of arrivons: "Heathrow", "Gatwick", required)
 If "Heathrow" is selected, then show additional field: Terminal (options: "1", "2", "3", "4", "not sure")
 Airflight number (required, valid airflight number format)
 When the form is submitted, the above enquiry should be sent to a server (or a server mock) using the GraphQL protocol, the data should be additionally saved to a local storage and the confirmation popup should be shown followed by a link to unbiased.co.uk site (opens in new tab).
 * @returns {JSX.Element}
 * @constructor
 */

const TaxiForm: React.FC = () => {
    interface IValidator {
        isValid: boolean;
        message: string;
    }

    interface ITaxiForm {
        name: string;
        phone: string;
        arrivalDate: string;
        airport: string;
        terminal?: string;
        flightNumber: string;
    }

    interface IAirport{
        id:number;
        name:string;
        gates:number[]|[];
    }
    const airports:IAirport[] = [
        {id: 0, name: "Heathrow", gates: [1, 2, 3, 4]},
        {id: 1, name: "Gatwick", gates: []},
    ]

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [airport, setAirport] = useState<IAirport>({id:-1, name:'', gates:[]});
    const [terminal, setTerminal] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [showTerminals, setShowTerminals] = useState(false);

    const [nameValidator, setNameValidator] = useState<IValidator>({isValid: true, message: ''})
    const [phoneValidator, setPhoneValidator] = useState<IValidator>({isValid: true, message: ''})
    const [airportValidator, setAirportValidator] = useState<IValidator>({isValid: true, message: ''});
    const [terminalValidator, setTerminalValidator] = useState<IValidator>({isValid: true, message: ''});


    const handleAirportChange = (e: ChangeEvent<HTMLSelectElement>) => {
        //setAirport(e.target.value);
        //setShowTerminals(e.target.value === 'Heathrow');

        const selectedAirport:IAirport|undefined = airports.find(el=>el.id===+e.target.value);
        if(selectedAirport)
        setAirport(selectedAirport);

    }

    const validateName = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value.length > 0 && e.target.value.length < 20) {
            setNameValidator({isValid: true, message: ''})
        } else {
            setNameValidator({isValid: false, message: 'Invalid Name!'})
        }
    }

    const validatePhone = (e: React.FocusEvent<HTMLInputElement>) => {
        const phoneRex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (e.target.value.match(phoneRex)) {
            setPhoneValidator({isValid: true, message: ''})
        } else {
            setPhoneValidator({isValid: false, message: 'Invalid Phone!'})
        }
    }

    const validateAirport = () => {
        if (airport && airport.id !=-1) {
            setAirportValidator({isValid: true, message: ''})
        } else {
            setPhoneValidator({isValid: false, message: 'Invalid Airport!'})
        }
    }

    const validateTerminal = (val: string) => {
        // if ((airport === 'Heathrow' && terminal.length > 0) || (airport !== 'Heathrow')) {
        //     setTerminalValidator({isValid: true, message: ''})
        // } else {
        //     setTerminalValidator({isValid: false, message: 'Invalid Airport!'})
        // }
    }


    const handleSubmit = () => {
        const curAirport = airport?airport.name:'';
        const result: ITaxiForm = {
            name, phone, arrivalDate, airport:curAirport,  terminal, flightNumber
        }
        localStorage.setItem('taxiForm', JSON.stringify(result));
    }


    return (
        <div className='container'>
            <div className="row">
                <label htmlFor="nameInput" className="form-label">Name</label>
                <input type="text" className="form-control" id='nameInput' value={name}
                       placeholder="Your Name" onChange={(e) => setName(e.target.value)} onBlur={validateName}/>
                {!nameValidator.isValid && <span className='text-danger mt-1'>{nameValidator.message}</span>}
            </div>

            <div className="row">
                <label htmlFor="phoneInput" className="form-label">Mobile Phone</label>
                <input type="text" className="form-control" id='phoneInput' value={phone}
                       placeholder="888-555-5555" onChange={(e) => setPhone(e.target.value)} onBlur={validatePhone}/>
                {!phoneValidator.isValid && <span className='text-danger mt-1'>{phoneValidator.message}</span>}
            </div>

            <div className="row">
                <label htmlFor="arrivalDate" className="form-label">Arrival Date</label>
                <input type="text" className="form-control" id='arrivalDate' value={arrivalDate}
                       onChange={(e) => setArrivalDate(e.target.value)}
                />
            </div>

            <div className="row">
                <label htmlFor="airport" className="form-label">Airport</label>
                <select className="form-select" aria-label="Select Airport" id='airport' value={airport.id}
                        onChange={handleAirportChange}>
                    <option defaultValue='-1'>Select Airport</option>
                    {airports.map(airport=><option value={airport.id}>{airport.name}</option>)}
                </select>
            </div>

            {airport?.gates[0] &&
            <div className="row">
                <label htmlFor="terminal" className="form-label">Terminal</label>
                <select className="form-select" aria-label="Select Terminal" id='terminal' value={terminal}
                        onChange={(e) => setTerminal(e.target.value)}>
                    <option defaultValue='-1'>Select Terminal</option>
                    {
                        airport.gates.map(gate=><option value={gate}>{gate}</option>)
                    }
                </select>
            </div>
            }
            <div className="row">
                <label htmlFor="flightNumber" className="form-label">Flight #</label>
                <input type="text" className="form-control" id='flightNumber' value={flightNumber}
                       onChange={(e) => setFlightNumber(e.target.value)}
                       placeholder="AB4590"/>
            </div>
            <div className='row'>
                <button className='btn btn-primary mt-3' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default TaxiForm;
