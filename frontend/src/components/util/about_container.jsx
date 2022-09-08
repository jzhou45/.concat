import React from "react";
import logo from "../../assets/images/concat_logo.png"
import Arrow from '../../assets/images/left-arrow-icon.png'
import Alex from '../../assets/images/alex.png'
import Deborah from '../../assets/images/deborah.png'
import Jonathan from '../../assets/images/jonathan.png'
import Victor from '../../assets/images/victor.png'
import Github from '../../assets/images/github.png'
import Linkedin from '../../assets/images/linkedin.png'
import AngelList from '../../assets/images/angel-list.png'
import PersonalSite from '../../assets/images/person.png'

const AboutContainer = () => {
    
    const handleClick = () => {
        window.history.back()
    };

    return (
        <div className="about-container">
            <div className="about-header">
                <img src={Arrow} className="about back-to-rooms" onClick={handleClick} />
                <div className="about-title">
                    <div className="about-logo">
                        <p>.con</p>
                        <img src={logo}/>
                        <p>at</p>
                    </div>
                    <div>'s team</div>
                </div>
            </div>
            <div className="about-content">
                <div className="about-row">
                    <div className="deborah member-container">
                        <img src={Deborah} alt="" />
                        <div className="member-content">
                            <h1>Deborah Wei</h1>
                            <div className="socials">
                                <a href="https://github.com/deborahwei" target="_blank">
                                    <img src={Github} alt="Deborah's GitHub" />
                                </a>
                                <a href="https://www.linkedin.com/in/deborah-wei-163b10152/" target="_blank">
                                    <img src={Linkedin} alt="Deborah's LinkedIn" />
                                </a>
                                <a href="https://angel.co/u/deborahwei" target="_blank">
                                    <img src={AngelList} alt="Deborah's AngelList" />
                                </a>
                                <a href="https://deborahwei.dev/" target="_blank">
                                    <img src={PersonalSite} alt="Deborah's Personal Site" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="alex member-container">
                         <img src={Alex} alt="" />
                        <div className="member-content">
                            <h1>Alexander Malos</h1>
                            <div className="socials">
                                <a href="https://github.com/alexmalos" target="_blank">
                                    <img src={Github} alt="Alex's Github" />
                                </a>
                                <a href="https://www.linkedin.com/in/alexander-malos/">
                                    <img src={Linkedin} alt="Alex's LinkedIn" />
                                </a>
                                <a href="https://angel.co/u/alexander-malos" target="_blank">
                                    <img src={AngelList} alt="Alex's AngelList" />
                                </a>
                                <a href="">
                                    <img src={PersonalSite} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-row">
                    <div className="jonathan member-container">
                        <img src={Jonathan} alt="" />
                        <div className="member-content">
                            <h1>Jonathan Zhou</h1>
                            <div className="socials">
                                <a href="https://github.com/jzhou45" target="_blank">
                                    <img src={Github} alt="Jonathan's GitHub" />
                                </a>
                                <a href="https://www.linkedin.com/in/jonathanzhou77/" target="_blank">
                                    <img src={Linkedin} alt="Jonathan's LinkedIn" />
                                </a>
                                <a href="https://angel.co/u/jonathan-zhou-5" target="_blank">
                                    <img src={AngelList} alt="Jonathan's AngelList" />
                                </a>
                                <a href="https://jzhou45.github.io/" target="_blank">
                                    <img src={PersonalSite} alt="Jonathan's Personal Site" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="victor member-container">
                        <img src={Victor} alt="" />
                        <div className="member-content">
                            <h1>Victor Hoang</h1>
                            <div className="socials">
                                <a href="https://github.com/victorhoang07" target="_blank">
                                    <img src={Github} alt="Victor's GitHub" />
                                </a>
                                <a href="https://www.linkedin.com/in/victorhoang07/" target="_blank">
                                    <img src={Linkedin} alt="Victor's LinkedIn" />
                                </a>
                                <a href="https://angel.co/u/victor-hoang-07" target="_blank">
                                    <img src={AngelList} alt="Victor's AngelList" />
                                </a>
                                <a href="">
                                    <img src={PersonalSite} alt="" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutContainer

