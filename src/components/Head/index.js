import React from 'react'

// eslint-disable-next-line react/prop-types
function Head({title}) {
  return (
    <div>
    <h1 className="text-2xl text-[#1679AB]">LyricSync</h1>
        <h1  className="text-2xl text-[#1679AB]">
            {title}
        </h1>

    </div>

  )
}

export default Head