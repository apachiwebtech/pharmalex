import React, { useRef, useState, useEffect } from 'react';
import '../Layout/App1.css';
import back from '../images/arrow-left.svg'
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import $ from 'jquery'
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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


      navigate(`/detailpage/${chaptid}`)

    });



  }, []);


  return (
    <div className="app" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>
      <div className='d-flex align-items-center justify-content-between' style={{ marginBottom: "20px" }}>
        <div  >
          {/* <img src={back} alt="" /> */}
          <ArrowBackIcon onClick={() => navigate(-1)}/>
        </div>
        <div className='read'><HomeIcon onClick={() => navigate('/')}/></div>
      </div>

      <div dangerouslySetInnerHTML={{ __html: data }} />

    </div>
  );
};

export default Section;
