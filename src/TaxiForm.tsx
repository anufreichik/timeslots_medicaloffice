import React, {ChangeEvent, useState} from 'react';

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

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [airport, setAirport] = useState('');
    const [terminal, setTerminal] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [showTerminals, setShowTerminals] = useState(false);

    const [nameValidator, setNameValidator] = useState<IValidator>({isValid: true, message: ''})
    const [phoneValidator, setPhoneValidator] = useState<IValidator>({isValid: true, message: ''})
    const [airportValidator, setAirportValidator] = useState<IValidator>({isValid: true, message: ''});
    const [terminalValidator, setTerminalValidator] = useState<IValidator>({isValid: true, message: ''});


    const handleAirportChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setAirport(e.target.value);
        setShowTerminals(e.target.value === 'Heathrow');

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
        if (airport.length > 0) {
            setAirportValidator({isValid: true, message: ''})
        } else {
            setPhoneValidator({isValid: false, message: 'Invalid Airport!'})
        }
    }

    const validateTerminal = (val: string) => {
        if ((airport === 'Heathrow' && terminal.length > 0) || (airport !== 'Heathrow')) {
            setTerminalValidator({isValid: true, message: ''})
        } else {
            setTerminalValidator({isValid: false, message: 'Invalid Airport!'})
        }
    }


    const handleSubmit = () => {
        const result: ITaxiForm = {
            name, phone, arrivalDate, airport, terminal, flightNumber
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
                <select className="form-select" aria-label="Select Airport" id='airport' value={airport}
                        onChange={handleAirportChange}>
                    <option defaultValue=''>Select Airport</option>
                    <option value="1">Heathrow</option>
                    <option value="2">Gatwick</option>
                </select>
            </div>

            {showTerminals &&
            <div className="row">
                <label htmlFor="terminal" className="form-label">Terminal</label>
                <select className="form-select" aria-label="Select Terminal" id='terminal' value={terminal}
                        onChange={(e) => setTerminal(e.target.value)}>
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
