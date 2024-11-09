import React from 'react';
// import './About.css'; // Make sure you have this CSS file or style it accordingly
import tanisha from '../Images/Passport size picture.jpg'
import tushar from '../Images/IMG20241011165420[1].jpg'
import aizab from '../Images/WhatsApp Image 2024-11-09 at 18.05.41_85c16dd3.jpg'
import saumya from '../Images/WhatsApp Image 2024-11-09 at 18.03.20_2deb7006.jpg'

function About() {
  return (
    <div className="about-container" style={{
      backgroundImage: `
        radial-gradient(circle at top left, rgba(138, 43, 226, 0.4), transparent 50%),
        radial-gradient(circle at bottom right, rgba(138, 43, 226, 0.4), transparent 50%)
      `,
      backgroundColor: '#020035'
     }}>
      <div className="about-content" style={{transform: "translateY(40px)"}}>
        <h1 className="about-title" style={{borderRadius:"30px"}}>Welcome to <span style={{color: "wheat"}}>EcoTrack</span></h1>
        <p className="about-description">
          At EcoTrack, our mission is to empower individuals and organizations to track their carbon footprint and make informed decisions to reduce their impact on the environment. We provide cutting-edge tools and analytics that help you understand your environmental impact, offering personalized suggestions to lead a more sustainable life.
        </p>
        <p className="about-description">
          Join us on our journey to make the world a greener place, one step at a time. Whether you're an individual looking to make a difference or a business aiming to achieve sustainability goals, EcoTrack is your partner in this vital mission.
        </p>
      </div>
      <br />
      <br />
      <h2 style={{ textAlign: "center", color:"#fff" }}>Our Team</h2> <br />
      <div className="image-gallery">
        <div className="gallery-item">
          <img  src={tushar} alt="Team Member 1" className="gallery-image" />
          <div className="image-text">Tushar Mishra: Project Manager</div>
        </div>
        <div className="gallery-item">
          <img  src={tanisha} alt="Team Member 2" className="gallery-image" />
          <div className="image-text">Tanisha Kumar: Frontend Developer</div>
        </div>
        <div className="gallery-item">
          <img  src={aizab} alt="Team Member 3" className="gallery-image" />
          <div className="image-text">Aizab Khan: Team Leader </div>
        </div>
        <div className="gallery-item">
          <img  src={saumya} alt="Team Member 4" className="gallery-image" />
          <div className="image-text">Saumya Mishra: UX/UI Designer</div>
        </div>
      </div>
    </div>
  );
}

export default About;
