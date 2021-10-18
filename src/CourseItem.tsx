import React from 'react';
import "./CourseItem.css";
import {Course} from "./CourseList";
import {Link} from 'react-router-dom';

interface IProps{
    course:Course;
}
const CourseItem:React.FC<IProps> =({course}) =>{
    return (
        <div className='item-container'>
            <div>{course.name}</div>
            <div>{course.description}</div>
            <div>{course.price}</div>
            <div>{course.startDate}</div>
            <div>
                {/*<Link to={`/courses/${course.id}`}>View</Link>*/}
                <Link to={{
                    pathname: `/courses/${course.id}`,
                    state: {
                        course,
                    },
                }}>View</Link>

            </div>
        </div>
    );
}

export default CourseItem;
