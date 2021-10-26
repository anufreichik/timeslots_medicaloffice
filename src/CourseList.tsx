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
export function getLowerLimitIndex(page:number, itemsPerPage:number){
    return (page-1)*itemsPerPage;
}
export function getUpperLimitIndex(page:number,itemsPerPage:number){
    return page*itemsPerPage;
}
const CourseList:React.FC = () => {
    const [list, setList] = useState<Course[]>([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [totalCourses,setTotalCourses]=useState(0);
    const ITEMS_PER_PAGE = 2;

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
                setTotalCourses(myJson.length);
            });
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='container'>
            {list
                .filter((_,i)=>i>=getLowerLimitIndex(currentPage,ITEMS_PER_PAGE) && i<getUpperLimitIndex(currentPage, ITEMS_PER_PAGE))
                .map((el) =>
                <CourseItem key={el.id} course={el}/>
            )}
            {(totalCourses>ITEMS_PER_PAGE && currentPage<totalCourses/ITEMS_PER_PAGE) && <button onClick={()=>setCurrentPage(prev=>prev+1)}>Next</button>}
            {currentPage>1 &&  <button onClick={()=>setCurrentPage(prev=>prev-1)}>Prev</button>}
        </div>
    );
}

export default CourseList;
