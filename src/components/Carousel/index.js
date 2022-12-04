import {Link} from 'react-router-dom'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const ReactSlick = props => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  const {topRatedBooks} = props

  return (
    <div className="slider-container">
      <div style={{display: 'flex'}}>
        <h1 className="carousel-heading" style={{flexGrow: 1}}>
          Top Rated Books
        </h1>
        <div style={{alignSelf: 'center'}}>
          <Link to="/shelf">
            <button type="button" className="button">
              Find Books
            </button>
          </Link>
        </div>
      </div>

      <Slider {...settings}>
        {topRatedBooks.map(eachBook => (
          <Link
            to={`/books/${eachBook.id}`}
            style={{color: 'black', listStyle: 'none'}}
            key={eachBook.id}
          >
            <div key={eachBook.id}>
              <img
                src={eachBook.coverPic}
                alt={eachBook.title}
                className="top-rated-book-img-prop"
              />
              <h1 style={{color: 'black', fontSize: '20px'}}>
                {eachBook.title}
              </h1>
              <p style={{color: 'black', margin: 0}}>{eachBook.authorName}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  )
}

export default ReactSlick
