import { useEffect, useState } from 'react'
import useFetch from 'use-http'

import Results from './Results'

function Generator() {
  const [images, setImages] = useState([])
  const [url, setUrl] = useState('')
  const [error, setError] = useState(false)

  const { get, response, loading } = useFetch('https://oohuzinyb7.execute-api.us-east-1.amazonaws.com')

  const getTweetId = () => {
    try {
      const tweet_url = new URL(url)
      const tweet_id = tweet_url.pathname.split('/').pop()
  
      return tweet_id
    } catch(e) {
      return '0'
    }
  }

  const grabImages = async(tweetId) => {
    if( !url ) return false;

    setImages([])
    setError(false)

    const generatedImages = await get(`?tweet_id=${tweetId}`)
    if( response.ok ) {
      setImages(generatedImages)
    } else {
      setError(true)
      //console.log(response.data.message)
    }
  }

  const tryHandler = (event) => {
    event.preventDefault()

    setUrl('https://twitter.com/steve_hanke/status/1497192404008333312')
  }

  useEffect(() => {
    grabImages( getTweetId() )
  }, [url])

  return (
    <>
    <div id="generator">
        <form onSubmit={(event) => { event.preventDefault() }}>
            <div className="form-input">
                <input onChange={(e) => setUrl(e.target.value)} type="text" value={url} placeholder="Paste a Tweet URL!" /> 
            </div>
            <div className="help-text">Not sure what tweet to use? <a href="#" onClick={tryHandler}>Try an example</a></div> 
        </form>
    </div>

    {error && (
      <div className="error-text">
        <p>Please type an valid tweet URL!</p>
      </div>
    )}

    {images.length ? <Results loading={loading} images={images} /> : null}
    </>
  )
}

export default Generator