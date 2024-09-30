import React from 'react'
import Job from './Job'


const randomJobs=[1,2,3]
const Browse = () => {
  return (
    <div className='max-w-7xl mx-auto my-10'>
      <h1 className='font-bold text-xl my-10'>
        Search Results ({randomJobs.length})
        <div className=' grid grid-cols-3 gap-4'>
        {
        randomJobs.map((item, index)=>{
            return(
                <Job/>
            )
        })    
        }
        </div>
        
        </h1>  
    </div>
  )
}

export default Browse