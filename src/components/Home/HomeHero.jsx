import React from 'react';
import Data from '../../Data';
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
            <BodyContainer>
                <Container width={80} leftAlign bottom={2}>
                    <h1>{Data.home.title}</h1>
                </Container>

                <Container leftAlign bottom={6} width={65}>
                    <p>{Data.home.description}</p>
                </Container>
                <Container style={{ alignSelf: 'flex-end' }} bottom={-10} width={65}>
                 <img src="/Glocafe.svg" alt="Logo" style={{ maxHeight: '20vw', marginLeft: '20vw' }} />
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
