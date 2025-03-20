import React, { useEffect, useState } from 'react';
import '../Layout/App1.css';
import back from '../images/arrow-left.svg'

import { Link, useNavigate, useParams } from 'react-router-dom';
import book from '../images/book.jpg';
import axios from 'axios';
import { BASE_URL, IMG_URL } from '../utils/BaseUrl';
const App = () => {
  const [data, setData] = useState([])
  const [chapter, setChapter] = useState([])


  const { bookid } = useParams()

  async function getbookthumb() {
    const data = {
      bookid: bookid
    }
    axios.post(`${BASE_URL}/getdetaildata`, data)
      .then((res) => {
        console.log(res.data)
        setData(res.data[0])
      })
  }
  async function getchapter() {
    const data = {
      bookid: bookid
    }
    axios.post(`${BASE_URL}/getchapter`, data)
      .then((res) => {
        console.log(res.data)
        setChapter(res.data)
      })
  }

  useEffect(() => {
    getbookthumb()
    getchapter()
  }, [])


  const navigate = useNavigate()


  return (
    <div className="app">

      <div className="header">
        <img src={back} onClick={() => navigate(-1)} alt="" />
        {/* <h5>GIGL Summary & Analy...</h5> */}
      </div>

      <div>
        <div className="book-card">
          <img
            src={`${IMG_URL}/book1/${data.image}`}
            alt="Bhagwad Geeta Chapter-1"
            className="book-image"
            style={{ width: "300px" }}
          />
        </div>
        {/* <div className="interaction-buttons">
          <button className="button">
            <Link to={`/chapter/${data.id}`} >📖 Read</Link>
          </button>
        </div> */}

        <div className="about-book py-3">
          <h2 style={{fontWeight :"900"}}>{data.title}</h2>
           <p dangerouslySetInnerHTML={{ __html: data.desc }}>
      
          </p>
        </div>

        {chapter.map((item, index) => {
          return (
            <div className='chapt-list py-3'>
              <Link to={`/chapter/${item.id}`}>
                <div className='d-flex align-items-center '>
                  <p >{'>'}</p>
                  <h2 className='mx-2'>{item.title}</h2>
                </div>
              </Link>
            </div>
          )
        })}

      </div>

    </div>



  );
};

export default App;
