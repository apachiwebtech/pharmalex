import React, { useRef, useState, useEffect } from 'react';
import '../Layout/App1.css';
import back from '../images/arrow-left.svg'
import { Link, useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

import { useParams } from 'react-router-dom';
import book from '../images/book.jpg';
import axios from 'axios';
import { BASE_URL } from '../utils/BaseUrl';
import Slider from "react-slick";

const Section = () => {
  const [data, setData] = useState([])
  const {id} = useParams()
  const [selectedText, setSelectedText] = useState("");
  const [note, setNote] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);


  const handleCopyText = () => {
    navigator.clipboard.writeText(selectedText).then(() => {
      alert("Text copied to clipboard!");
    });
  };

  const handleTextSelection = (e) => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    if (selectedText) {
      // Store the selected text
      setSelectedText(selectedText);
      // Open the note modal
      setIsNoteModalOpen(true);
      // Clear the selection (optional)
      selection.removeAllRanges();
    }
  };
  const handleSaveNote = async () => {
    if (!selectedText || !note) return;


    localStorage.setItem('notes' , selectedText)

    try {
      const response = await axios.post("/api/save-note", {
        slide: currentSlide,
        text: selectedText,
        note: note,
      });
      if (response.data.success) {
        alert("Note saved successfully!");
        setNote(""); // Clear note input after saving
        setIsNoteModalOpen(false); // Close the modal
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
    setIsNoteModalOpen(false)
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    // Disable swiping if the user is scrolling down
    // swipe: false,
    beforeChange: (oldIndex, newIndex) => {
      // Scroll to the top when a new slide is about to be shown
      window.scrollTo({ top: 0, behavior: "smooth" });
      setCurrentSlide(newIndex);
    },
  };



  async function getbookthumb() {

    const data = {
      chapterid: id
    }

    axios.post(`${BASE_URL}/getsection`, data)
      .then((res) => {
        console.log(res.data)
        setData(res.data)
      })
  }

  useEffect(() => {
    getbookthumb()
  }, [])


  const navigate = useNavigate()

  return (
    <div className="app" style={{ userSelect: 'text', WebkitUserSelect: 'text' }}>
      <div className='d-flex align-items-center'>
        <img src={back} onClick={() => navigate(-1)} alt="" />
        <span className='read'><b>Read</b></span>
      </div>
      <Slider  {...settings} >

        {data.map((item) => {
          return (
            <div className='animate__animated animate__fadeInUp book-content' onTouchEnd={handleTextSelection}>

              <div className="mt-5 text-start">
                <h1><b>{item.title}</b></h1>
              </div>
              <p className="content" dangerouslySetInnerHTML={{ __html: item.description }} >
                 
              </p>
            </div>
          )
        })}



    
      </Slider>

      {isNoteModalOpen && (
        <div className="note-modal">
          <div className="note-modal-content">
            <h4>Selected Text:</h4>
            <p>{selectedText}</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your note here..."
            />
            
            <button className='mx-2' onClick= {handleSaveNote}>Save Note</button>
            <button onClick={() => setIsNoteModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section;
