import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./GitHubRepos.css";
import Loader from "./Loader";

/**
 // Develop a small app that shows a list of all JavaScript repos on Github, sorted by number of stars.
//
//     Requirements:
// * List's columns: name, url (link), owner, forks, open issues.
// * Should have pagination on scroll
// * Should show loader when data is being loaded.
// * Should look nice and have some styling
// * Please, store sources in a public repo (bitbucket, github, gitlab)
// * Have a live version of an app deployed via netlify
//
// Note:
//     * You can use GitHub API for that (https://api.github.com)
// * Use React.js. Any flavor you're comfortable with.
// * You can use any other libraries (but no UI libries like Vuetify/Element/Material as we want to see custom styling).
 */
export interface IRepo{
    id:string;
    name:string;
    url:string;
    owner:string;
    forks:number;
    openIssues:number;
}
//https://api.github.com/search/repositories?q=language:javascript&page=1&per_page=2&sort=stars&order=desc
const GitHubRepos:React.FC=()=> {
    const PAGE_LIMIT = 5;
    const apiURLDomain = 'https://api.github.com/search/repositories';
    const [totalItems, setTotalItems]=useState(0);
    const[page,setPage]=useState(0);
    const [pagesArray, setPagesArray]=useState<number[]|[]>([]);
    const [repos,setRepos]=useState<IRepo[]>([]);
    const [loading, setLoading]=useState(true);

    //paging and filtering
    function getReposByPage(page = 1) {
        axios.get(`${apiURLDomain}?q=language:JavaScript&page=${page}&per_page=${PAGE_LIMIT}&sort=stars&order=desc`)
            .then(data => {
                setRepos(data.data.items);
                setLoading(false);
            })
    }

    useEffect(()=>{
        setLoading(true);
        getReposByPage(page);
    },[page])

    useEffect( () => {
        axios.get(`${apiURLDomain}?q=language:JavaScript`)
            .then(data=>{
                setTotalItems(data.data.items.length);
                 let numberPages=Math.ceil(data.data.items.length/PAGE_LIMIT);
                 let arr:number[] = Array.from({length: numberPages}, (_, i) => i + 1);
                setPagesArray( arr);
                setPage(1);
            });
    }, []);



    const pagingOnClick=(page:number)=>{
        setPage(page);
    }
   return(
        <div className='dashboard' >
            <div>Total JavaScript Repos: {totalItems}</div>
            { loading &&  <Loader/>}

            <div  className='github-list-item-container'>
                <div className='github-list-item-col col-name col-header'>NAME</div>
                <div className='github-list-item-col col-url col-header'>URL</div>
                <div className='github-list-item-col col-owner col-header'>OWNER</div>
                <div className='github-list-item-col col-issues col-header'>ISSUES</div>
                <div className='github-list-item-col col-forks col-header'>FORKS</div>
            </div>

            {repos?.length &&
            <div >
                {repos.map((el:any)=>
                    <div key={el.id} className='github-list-item-container'>
                        <div className='github-list-item-col col-name'>{el.name}</div>
                        <div className='github-list-item-col col-url'>{el.html_url}</div>
                        <div className='github-list-item-col col-owner'>{el.owner.login}</div>
                        <div className='github-list-item-col col-issues'>{el.open_issues}</div>
                        <div className='github-list-item-col col-forks'>{el.forks}</div>
                    </div>
                )}
            </div>
            }
            <div>
            {
                pagesArray.map(el=>{
                    return (
                        <button className={`pagerButton ${page===el?'pagerSelectedButton':''}`} key={`btn_${el}`} onClick={()=>pagingOnClick(el)}>{el}</button>
                    )
                })
            }
            </div>
        </div>
    )
   }

export default GitHubRepos;
