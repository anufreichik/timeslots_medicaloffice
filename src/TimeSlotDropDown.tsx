import React, {useEffect, useMemo, useState} from 'react';
import {ISetup} from "./App";
import moment from "moment";

function getTimeSlots(start: string, end: string, length: number) {
    let startTime = moment(start, 'HH:mm');
    let endTime = moment(end, 'HH:mm');
    let ind = 0;

    if (endTime.isBefore(startTime)) {
        endTime.add(1, 'day');
    }

    let timeSlots: ITimeSlotItem[] = [];

    while (startTime < endTime) {
        let curStart = moment(startTime);
        let tempStart = moment(startTime);
        let curEnd = tempStart.add(length, 'minutes');

        let slot: ITimeSlotItem = {
            name: `${curStart.format('HH:mm')} - ${curEnd.format('HH:mm')}`,
            value: ind,
            disabled: false
        }

        timeSlots.push(slot);
        ind++;
        startTime = curEnd;
    }
    return timeSlots;
}

interface ITimeSlotItem {
    value: number;
    name: string;
    disabled: boolean;
}

interface ITimeSlotDropDownProps {
    timeSlotsSetup: ISetup;
    unavailableSlotIndexes: number[];
    updateUnavailableSlotIndexes: (ind: number) => void;
}

const TimeSlotDropDown: React.FC<ITimeSlotDropDownProps> = ({
                                                                timeSlotsSetup,
                                                                unavailableSlotIndexes,
                                                                updateUnavailableSlotIndexes
                                                            }) => {

    const [slots, setSlots] = useState<ITimeSlotItem[]>([]);
    const [selectedSlot, setSelectedSlot] =useState<number>(0);

   const memoizedSlots = useMemo(() =>  getTimeSlots(timeSlotsSetup.officeTimeStart, timeSlotsSetup.officeTimeEnd, timeSlotsSetup.appointmentSlot), [timeSlotsSetup]);

    useEffect(() => {
        const slotsList = memoizedSlots
            .map(el => {
                if (unavailableSlotIndexes.includes(el.value))
                    return {...el, disabled: true}
                else return el;
            })
        setSlots(slotsList);

    }, [unavailableSlotIndexes, memoizedSlots]);

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
       setSelectedSlot(+event.target.value);
    }
    const handleSubmit = () => {
        updateUnavailableSlotIndexes(selectedSlot);
    }

    return (
        <div>
            <select style={{width: '500px', height: '30px'}} onChange={handleSelectChange}>
                {slots.map(el => <option key={el.value} value={el.value} disabled={el.disabled} style={{color:`${el.disabled?'red':''}`}}>{el.name}</option>)}
            </select>
            <br/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default TimeSlotDropDown;
