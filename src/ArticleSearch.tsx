import React, {ChangeEvent, useState} from 'react';

interface IProps {
    search: (searchText: string) => void;
    reset: () => void;
}

const ArticleSearch: React.FC<IProps> = ({search, reset}) => {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    const resetClick=()=>{
        reset();
        setInputText('')
    }
    return (
        <div className='container'>
            <div className='row-cols-6'>
                <div className="input-group mb-3">
                    <input className="form-control" type="text" placeholder="Search Article..."
                           aria-label="Recipient's username" aria-describedby="basic-addon2"
                           onChange={handleInputChange}
                           value={inputText}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button"
                                onClick={() => search(inputText)}>Search
                        </button>
                        <button className="btn btn-outline-secondary" type="button" onClick={resetClick}>Reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticleSearch;
