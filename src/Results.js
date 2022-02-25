import Image from './Image'

const Results = ({loading, images}) => {
  
    return(
        <div className='results'>
            {loading && <p>Loading...</p>}
            
            {images.map((img, key) => <Image url={img} key={key} />)}
        </div>
    )

}

export default Results
