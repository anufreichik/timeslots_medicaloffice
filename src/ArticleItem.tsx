import React from 'react';

type Article={id:number, title:string, text:string}
interface IProps{
    article:Article
}
const ArticleItem:React.FC<IProps>=({article})=>{
    return (
        <div className='container'>
           <div className='row'>
               <h3 className='col-12 p-3 text-black-50 text-decoration-underline'>{article.title}</h3>
           </div>
            <div className='row'>
                <div className='col-10 offset-2 text-muted   mb-3'>{article.text}</div>
                <hr/>
            </div>
        </div>
    );
}

export default ArticleItem;
