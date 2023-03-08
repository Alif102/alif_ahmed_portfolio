import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/mypic1.png";
import Shape from "../assets/shape3.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import '../components/Cards/Cards.css'
import TrackVisibility  from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "Web Designer", "Team Leader" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Alif`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Web Designer", "Team Leder" ]'><span className="wrap">{text}</span></span></h1>
                <p>My full name is Alif Ahmed.I am a front-end web developer. I Can make the website more, more interactive with web animation and React JS framework.I love to Build an Amazing Web Application.I Design and develop conversion-focused websites to promote ecommerce success. Experience design and strategic marketing solutions for growing brands. </p>

                  <button onClick={()=> openInNewTab('https://drive.google.com/file/d/1-oMhLnsDu5Wh58FCowwLXJhkVyxIOpxo/view?usp=share_link')}>View Resume <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
          <div className="bannerImage">
                  <img src={Shape} alt="Header Img" className="shape"/>
                  <img src={headerImg} alt="Header Img" className="mypic"/>
                </div>
                </Col>
          
        </Row>
        
      </Container>
      
    </section>
  )
}
