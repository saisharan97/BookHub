import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItemFullDetails = props => {
  const {eachBook} = props
  const {
    aboutAuthor,
    aboutBook,
    authorName,
    coverPic,
    id,
    rating,
    readStatus,
    title,
  } = eachBook
  return (
    <Link to={`/books/${id}`} style={{color: 'black'}}>
      <li>
        <div className="book-item-container1">
          <div>
            <img alt={title} src={coverPic} className="cover-pic-img-prop1" />
          </div>

          <div style={{alignSelf: 'center'}}>
            <h4 style={{margin: '10px'}}>{title}</h4>
            <p style={{margin: '10px'}}>{authorName}</p>
            <p style={{margin: '10px'}}>
              Avg Rating:{' '}
              <BsFillStarFill color="gold" style={{marginRight: '5px'}} />
              {rating}
            </p>
            <p style={{margin: '10px'}}>
              Status: <span style={{color: 'blue'}}>{readStatus}</span>
            </p>
          </div>
        </div>

        <hr />

        <h3>About Author</h3>
        <p>{aboutAuthor}</p>

        <h3>About Book</h3>
        <p>{aboutBook}</p>
      </li>
    </Link>
  )
}

export default BookItemFullDetails
