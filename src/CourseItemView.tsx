import React from 'react';
import {RouteComponentProps,useLocation, useHistory} from 'react-router-dom';
import {Course} from "./CourseList";
interface IProps{
    deleteCourse:(id:string)=>void;
}

interface stateType {
    course: Course
}

const CourseItemView:React.FC<IProps>=({deleteCourse})=> {
    const { state } = useLocation<stateType>();
    const history= useHistory();

    const handleDelete=()=>{
        deleteCourse(state.course.id);
        history.push(`/courses`);
    }

    return (
        <div>
            <div>{state.course.name}</div>
            <div>{state.course.description}</div>
            <div>{state.course.price}</div>
            <div>{state.course.startDate}</div>
            <div><button onClick={handleDelete}>Delete</button></div>
        </div>
    );
}

export default CourseItemView;
