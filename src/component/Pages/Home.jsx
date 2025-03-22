import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import Footer from './Footer';
import Header from './Header';
import axios from 'axios';
import { BASE_URL, IMG_URL } from '../utils/BaseUrl';
import $ from 'jquery'

export default function Home() {

    const [data, setData] = useState([])
    const [book, setBook] = useState([])

    // async function getbookthumb() {
    //     axios.get(`${BASE_URL}/getthumbdata`)
    //         .then((res) => {
    //             console.log(res.data)
    //             setData(res.data)
    //         })
    // }

    async function getdeliverylisting(e) {
        const parcleList = localStorage.getItem('LoadingID')
        const formData = new FormData();


        formData.append('parcleDeliveredList', parcleList);


        const queryString = new URLSearchParams(formData).toString();

        fetch(`https://susmitpublishers.com/weblogin/appbook.php`)
            .then(response => {
                return response.text();

            })
            .then(data => {
                 setBook(data)
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }


    useEffect(() => {
        // getbookthumb()
        getdeliverylisting()
    }, [])


    const navigate = useNavigate()

    useEffect(() => {
        $('body').on('click', '.bookclick', function () {

            var bookid = $(this).attr('data-id');

            localStorage.setItem('booid' , bookid)


            navigate(`/chapter/${bookid}`)
        
        });
        

     
    }, []);



    const name = localStorage.getItem('firstName')
    return (

        <div>

            <Header />
            <div className="title_box my-2">
                <h1>Hey, {name} </h1>
                {/* <button>See All</button> */}
            </div>


            <div className='book_box row' id="booklistbk">
                <div dangerouslySetInnerHTML={{ __html: book }} />
            </div>

            <Footer />
        </div>
    )
}
