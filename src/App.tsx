import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TimeSlotDropDown from "./TimeSlotDropDown";
import TaxiForm from "./TaxiForm";
import GitHubRepos from "./GitHubRepos";
import {
    Switch,
    Route,
    Link
} from "react-router-dom";
import Articles from "./Articles";
import CourseList from "./CourseList";
import CourseItemView from "./CourseItemView";
import SlideCards from "./Slide";

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

    const deleteCourse = (id: string) => {

        return fetch(`http://localhost:5000/courses/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response);
        })
            .catch(err=>console.log(err))
    }

    return (
        <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Github Repos for JavaScript</Link>
                        </li>
                        <li>
                            <Link to="/taxi">Taxi Form</Link>
                        </li>
                        <li>
                            <Link to="/slots">Time Slots Dropdown</Link>
                        </li>
                        <li>
                            <Link to="/articles">Articles</Link>
                        </li>
                        <li>
                            <Link to="/courses">Courses</Link>
                        </li>
                        <li>
                            <Link to="/slides">Slide Example</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/articles">
                        <Articles/>
                    </Route>
                    <Route path="/taxi">
                        <TaxiForm/>
                    </Route>
                    <Route path="/slots">
                        <TimeSlotDropDown timeSlotsSetup={timeSlotsSetup} unavailableSlotIndexes={unavailableSlotIndexes}
                                          updateUnavailableSlotIndexes={updateUnavailableSlotIndexes}/>
                    </Route>

                    <Route path="/courses/:id">
                        <CourseItemView deleteCourse={deleteCourse}/>
                    </Route>
                    <Route path="/courses">
                        <CourseList/>
                    </Route>
                    <Route path="/slides">
                        <SlideCards />
                    </Route>
                    <Route path="/">
                        <GitHubRepos />
                    </Route>
                </Switch>
        </div>
    );
}

export default App;
