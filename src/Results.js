import Image from './Image'

const Results = ({images}) => {
    return(
        <div className='results'>            
            {images.map((img, key) => <Image url={img} key={key} />)}
        </div>
    )
}

export default Results
