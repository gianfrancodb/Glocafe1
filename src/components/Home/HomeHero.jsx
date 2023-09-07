import React from 'react';
import Data from '../../Data';
import { motion } from 'framer-motion';
import {
    Container,
    HeroContainer,
    BodyContainer
} from '../StyledComponents/StyledComponents';
import Button from '../Utility/Button';

const HomeHero = () => {
    return(
        <HeroContainer
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 2, delay: 1 }}
            exit={{ opacity: 0 }}
        >
        
            <BodyContainer style={{
                    width: '80%',
                   height:'70vh',
                   marginTop: 'calc(10vw - 80px)',
                   backgroundColor:'#d5bdaf',
                   borderRadius:'20px',
                   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                   position: 'relative',
                }}>
                <Container width={80} leftAlign bottom={2} top={12}>
                    <h1>{Data.home.title}</h1>
                </Container>
               
                <Container  
                leftAlign 
                bottom={6} 
                width={65}
                style={{
                    backgroundImage: 'url("/banner2.svg")',
                    backgroundPosition: 'bottom',
                    // Adjust as per your requirements
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    minHeight: '200px',  // Adjust based on the size of the image or content
                }}
            >
                    <p>{Data.home.description}</p>
                </Container>
                <Container style={{ alignSelf: 'flex-end' }} width={65} >
                <motion.img src="/Glocafe.svg" alt="Logo" style={{
    maxHeight: '20vw',
    position: 'absolute',
    top: '-7vw',
    right: '-10vw'
}} 
animate={{ opacity: 1 }}
initial={{ opacity: 0 }}
transition={{ duration: 1, delay: 2 }}
exit={{ opacity: 0 }}/>

    </Container>

                <a href="/about">
                    <Button
                        route="/about"
                        text="About Us"
                        right
                    />
                </a>
            </BodyContainer>
        </HeroContainer>
    )
}

export default HomeHero;
