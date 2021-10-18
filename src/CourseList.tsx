import React, {useState, useEffect} from 'react';
import "./CourseList.css";
import CourseItem from "./CourseItem";

export interface Course {
    id: string;
    name: string;
    description: string;
    price: string;
    startDate: string;
}

const CourseList = () => {

    const [list, setList] = useState<Course[]>([]);
    const getData = () => {

        fetch('http://localhost:5000/courses'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setList(myJson);
            });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='container'>
            {list.map(el =>
                <CourseItem key={el.id} course={el}/>
            )}
        </div>
    );
}

export default CourseList;
