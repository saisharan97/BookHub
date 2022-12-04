import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = props => {
  const {eachBook} = props
  const {authorName, coverPic, id, rating, readStatus, title} = eachBook
  return (
    <Link to={`/books/${id}`} style={{color: 'black'}}>
      <li className="book-item-container">
        <div>
          <img alt={title} src={coverPic} className="cover-pic-img-prop" />
        </div>
        <div>
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
      </li>
    </Link>
  )
}

export default BookItem
