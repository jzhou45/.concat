import React from 'react'
import { connect } from 'react-redux'
import { instructionsHeading, instructionsText } from '../../util/constants_util'

const SplashInstructionPageContainer = (props) => {

    const {pageNumber, pageWord, image} = props

    const content = () => {
        return (
        <div className={`splash-${pageWord}-page`}>
            <div className='splash-instructions-left'>
                <div className={`splash-text ${pageNumber % 2 === 0? "hide" : ""}`}>
                    <h1>{instructionsHeading[pageNumber]}</h1>
                    <p>{instructionsText[pageNumber]}</p>
                </div>
                <div className={`splash-image ${pageNumber % 2 !== 0? "hide" : ""}`}>
                    <img src={image} alt="" />
                </div>  
            </div>
            <div className='splash-instructions-right'>
                <div className={`splash-text ${pageNumber % 2 !== 0? "hide" : ""}`}>
                        <h1>{instructionsHeading[pageNumber]}</h1>
                        <p>{instructionsText[pageNumber]}</p>
                    </div>
                    <div className={`splash-image ${pageNumber % 2 === 0? "hide" : ""}`}>
                        <img src={image} alt="" />
                    </div>
                </div>
        </div>
        )
    }

    return content()
}

export default SplashInstructionPageContainer