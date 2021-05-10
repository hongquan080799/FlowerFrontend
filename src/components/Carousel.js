import Slider from 'react-material-ui-carousel'
import React from 'react'
import hoa1 from '../image/hoa1.jpg'
import hoa2 from '../image/hoa2.jpg'
import hoa3 from '../image/hoa3.jpg'
import './Carousel.css'
function Carousel(){
    return (
        <div className='container-fluid mt-4 my-carousel'>
            <Slider>
                <div className='slide-item'>
                    <img src={hoa1} style={{width:'100%'}}/>
                </div>
                <div  className='slide-item' >
                    <img src={hoa2} style={{width:'100%'}} />
                </div>
                <div  className='slide-item'>
                    <img src={hoa3} style={{width:'100%'}}/>
                </div>
            </Slider>
        </div>
    )
}
export default Carousel