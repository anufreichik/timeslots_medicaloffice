import React,{useState} from 'react';
import ArticleItem from "./ArticleItem";
import ArticleSearch from "./ArticleSearch";

const Articles:React.FC=() =>{
    const articlesListInit=[
        {
            id:1,
            title:'Dine L.A. Restaurant Week is back with new flavors, huge deals after',
            text:'Dine L.A. Restaurant Week is back with deals and specials to tempt the heartiest of diets.' +
                'The dining festival, which runs Oct. 1-15, features hundreds of restaurants offering prix fixe ' +
                'lunch and dinner menus, with special items and two-week-only combos.Participating restaurants are offering a mix of indoor and outdoor dining plus takeout options. ' +
                'To find out more about which restaurants are involved, visit the event’s website.'
        },
        {
            id:2,
            title:'Would-be carjacker shot by victim: Pomona Police Department',
            text:'Posted: Oct 2, 2021 / 07:04 PM PDT / Updated: Oct 2, 2021 / 07:04 PM PDT ' +
                'Police are investigating after a man attempted to carjack another man, but the would-be robber was shot Saturday afternoon in a potential act of self-defense, ' +
                'according to the Pomona Police Department.'
        },
        {
            id:3,
            title:'October child tax credits: Monday marks next deadline to unenroll from monthly payments',
            text:'Monday is the next deadline to unenroll from the monthly child tax credits, the fourth installment of which is slated to go out in mid-October.' +
                'Taxpayers may wish to opt out of the advance payments for a variety of reasons, such as if they’d like a larger amount in a single lump-sum next year, or they are concerned that their changing circumstances (a higher income in 2021 or a child aging out, for instance) will result in a potential overpayment from the IRS. '
        },
    ]
    const [articlesList, setArticlesList]=useState(articlesListInit);
    const searchArticle=(searchText:string)=>{
        const newList = articlesList.filter(el => {
            return (el.title.includes(searchText) || el.text.includes(searchText));
        })
        setArticlesList(newList);
    }

    const resetArticles=()=>{
        setArticlesList(articlesListInit);
    }
    return (
        <>
        <ArticleSearch search={searchArticle} reset={resetArticles}/>
        <div>
            {articlesList.map(el=><ArticleItem key={el.id} article={el}/>)}
        </div>
        </>
    );
}

export default Articles;
