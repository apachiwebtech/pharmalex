import React, { useRef, useState, useEffect } from 'react';
import '../Layout/App1.css';
import back from '../images/arrow-left.svg'
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import $ from 'jquery'

const Section = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState('')

  async function getchapter(e) {

    const formData = new FormData();
    formData.append('id', id);

    const queryString = new URLSearchParams(formData).toString();

    fetch(`https://susmitpublishers.com/weblogin/appchapter.php?${queryString}`)
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
    getchapter()
  }, [])

  useEffect(() => {
    $('body').on('click', '.appchapter', function () {

      var chaptid = $(this).attr('data-id');

      localStorage.setItem('booid', chaptid)

      navigate(`/detailpage/${chaptid}`)

    });



  }, []);


  return (
    <div className="app" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>
      <div className='d-flex align-items-center'>
        <img src={back} onClick={() => navigate(-1)} alt="" />
        <span className='read'><b>Read</b></span>
      </div>

      <div dangerouslySetInnerHTML={{ __html: data }} />

    </div>
  );
};

export default Section;
