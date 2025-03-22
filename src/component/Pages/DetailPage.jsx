import React, { useEffect, useState } from 'react';
import '../Layout/App1.css';
import back from '../images/arrow-left.svg'

import { Link, useNavigate, useParams } from 'react-router-dom';
import book from '../images/book.jpg';
import axios from 'axios';
import { BASE_URL, IMG_URL } from '../utils/BaseUrl';
import $ from 'jquery'

const App = () => {
  const [data, setData] = useState([])
  const [chapter, setChapter] = useState([])
  const { bookid } = useParams()

  async function getdetails(e) {

    const formData = new FormData();


    formData.append('cid', bookid);


    const queryString = new URLSearchParams(formData).toString();

    fetch(`https://susmitpublishers.com/weblogin/appsec.php?${queryString}`)
        .then(response => {
            return response.text();

        })
        .then(data => {
          setData(data)
        })
        .catch(error => {
            console.error('Error:', error);
        });

}
  useEffect(() => {
    getdetails()
  }, [])


  const navigate = useNavigate()


    useEffect(() => {
      $('body').on('click', '.detail-button', function () {
  
        var detailid = $(this).attr('data-id');
  
        localStorage.setItem('detailid', detailid)
  
        // navigate(`/detailpage/${detailid}`)

        window.location.pathname = `/detailpage/${detailid}`
  
      });
  
  
  
    }, []);


  return (
    <div className="app">

      <div className="header">
        <img src={back} onClick={() => navigate(-1)} alt="" />
        {/* <h5>GIGL Summary & Analy...</h5> */}
      </div>

      <div>
        {/* <div className="book-card">
          <img
            src={`${IMG_URL}/book1/${data.image}`}
            alt="Bhagwad Geeta Chapter-1"
            className="book-image"
            style={{ width: "300px" }}
          />
        </div> */}


        <div className="about-book">
          <h2 style={{fontWeight :"900"}}>{data.title}</h2>
           <div dangerouslySetInnerHTML={{ __html: data.desc }}></div>
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>


      </div>

    </div>



  );
};

export default App;
