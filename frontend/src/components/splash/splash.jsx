import React from 'react'
import SplashNavbarContainer from './splash_navbar_container'
import SplashFirstPageContainer from './splash-first-page'
import SplashInstructionPageContainer from './splash-instruction-page'
import ProblemGIF from '../../assets/images/problems.gif'

const SplashContainer = (props) => {

    const {joinPath, roomId} = props

    const content = () => {
        return (
          <div className='splash-container'>
              <SplashNavbarContainer  roomId={roomId} joinPath={joinPath}/>
              <section className='splash-first-page-container'>
                  <SplashFirstPageContainer/>
              </section>
              <section className='splash-second-page-container'>
                  <SplashInstructionPageContainer pageNumber={0} pageWord={"second"}/>
              </section>
              <section className='splash-third-page-container'>
                  <SplashInstructionPageContainer image={ProblemGIF} pageNumber={1} pageWord={"third"}/>
              </section>
              <section className='splash-fourth-page-container'>
                  <SplashInstructionPageContainer pageNumber={2} pageWord={"fourth"}/>
              </section>
          </div>
        )
    }

    return content()
}

export default SplashContainer