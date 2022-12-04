import {Component} from 'react'
import Loader from 'react-loader-spinner'

class LoaderComponent extends Component {
  render() {
    return (
      <div className="loader-container" testid="loader" style={{margin: 0}}>
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    )
  }
}

export default LoaderComponent
