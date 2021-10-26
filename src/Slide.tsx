import React,{useState} from 'react';
import {Box, ThemeProvider} from '@mui/material';
import Slide from '@mui/material/Slide';

function SlideCards() {
    const [currentSlide, setCurrentSlide] = useState(1);

    function nextSlide() {
        setCurrentSlide(prevState=>prevState+1);
    }
    function resetSlides() {
        setCurrentSlide(1);
    }
    return (
        <Box>

                <Box display={'flex'} flexDirection={'column'} style={{overflowX: "hidden", height: 400}}>

                    {/* <button onClick={nextSlide} disabled={currentSlide===3}>Change slide</button> */}

                    <div style={{display: 'flex', width: '100%', position: 'relative'}}>

                        <Slide  direction={"right"} in={currentSlide===1}
                                mountOnEnter unmountOnExit
                                timeout={{enter:1000, exit:1}}>
                            <div style={{backgroundColor: 'green', width: '100%', height:'100px'}}>
                                Slide one
                                <button onClick={nextSlide}>Next</button>
                            </div>
                        </Slide>

                        <Slide  direction={"right"} in={currentSlide===2}
                                mountOnEnter unmountOnExit
                                timeout={{enter:1000, exit:1}}>
                            <div style={{backgroundColor: 'red', width: '100%', height:'100px'}}>
                                Slide Two
                                <button onClick={nextSlide}>Next</button>
                            </div>
                        </Slide>
                        <Slide  direction={"right"} in={currentSlide===3}
                                mountOnEnter unmountOnExit
                                timeout={{enter:1000, exit:1}} >
                            <div style={{backgroundColor: 'blue', width: '100%', height:'100px'}}>
                                Slide Three!
                                <button onClick={resetSlides}>Reset</button>
                            </div>
                        </Slide>

                    </div>
                </Box>
        </Box>
    );
}

export default SlideCards;
