import React from 'react';
import Data from '../../Data';
import { motion } from 'framer-motion';
import {
    Container,
    HeroContainer,
    BodyContainer
} from '../StyledComponents/StyledComponents';
import Button from '../Utility/Button';
import './home.css';

const HomeHero = () => {
    return (
        <HeroContainer
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 2, delay: 1 }}
            exit={{ opacity: 0 }}
        >
        <BodyContainer className="notepad" >

                 


                <Container className="responsive-title" width={80} leftAlign bottom={3} >
                    <h1>{Data.home.title}</h1>
                </Container>

                <Container
                    leftAlign
                    bottom={2}
                    width={65}
                    style={{
                        backgroundImage: 'url("/banner2.svg")',
                        backgroundPosition: 'bottom',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        minHeight: '200px',
                    }}
                >
                    <p>{Data.home.description}</p>
                </Container>
                <Container style={{ alignSelf: 'flex-end' }} width={65}>
                <motion.img className="logoImage" src="/Glocafe.svg" alt="Logo" 
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    transition={{ duration: 1, delay: 2 }}
    exit={{ opacity: 0 }}
/>
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
