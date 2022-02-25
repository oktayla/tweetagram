import { shareImage } from './Share'

function Image({url}) {
  return <img src={url} onClick={() => shareImage(url)} alt="tweet-img" />
}

export default Image