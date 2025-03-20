import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import book1 from '../images/book1.jpg';
import book2 from '../images/book2.jpg';
import book3 from '../images/book3.jpg';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import Footer from './Footer';
import Header from './Header';
import axios from 'axios';
import { BASE_URL, IMG_URL } from '../utils/BaseUrl';

export default function Home() {

    const [data, setData] = useState([])

    async function getbookthumb() {
        axios.get(`${BASE_URL}/getthumbdata`)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
    }

    useEffect(() => {
        getbookthumb()
    }, [])


    const name = localStorage.getItem('firstName')
    return (

        <div>

            <Header />
            <div className="title_box my-2">
                <h1>Hey, {name} </h1>
                {/* <button>See All</button> */}
            </div>


            <div className='book_box row'>
                {data.map((item) => {
                    return (
                        <Link to={`/detailpage/${item.id}`} className="col-5">
                            <div className='book_img'>
                                <img src={`${IMG_URL}/book1/${item.image}`} alt="" className='book' />
                            </div>
                            <div className="book_info">
                                <h5>{item.title}</h5>
                                {/* <small>{item.desc}</small> */}
                            </div>
                        </Link>
                    )
                })}



            </div>




            <Footer />
        </div>
    )
}
