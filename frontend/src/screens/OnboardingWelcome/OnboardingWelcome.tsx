import React, {ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import "./styleWelcome.css";

const OnboardingWelcome = (): ReactElement => {
    const navigate = useNavigate();

    const navigateToOnboarding = () => {
        // 👇️ navigate to /contacts
        navigate('onboarding');
    };

    // @ts-ignore
    return (
        <div className="screen-start-onboarding">
            <div className="overlap-group-wrapper">
                <div className="overlap-group">
                    <div className="overlap-group-left">
                        <div className="title">Let's Your Cloud</div>
                        <div className="subtitle">Une plateforme sécurisé permettant d'avoir ses fichiers près de soi ! </div>
                    </div>
                    <div className="overlap-group-right">
                        <button onClick={navigateToOnboarding} className="button">
                            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M27 52C33.6304 52 39.9893 49.3661 44.6777 44.6777C49.3661 39.9893 52 33.6304 52 27C52 20.3696 49.3661 14.0107 44.6777 9.32233C39.9893 4.63392 33.6304 2 29.1 2" opacity="0.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                <path opacity="0.5" d="M27 2C20.3696 2 14.0107 4.63392 9.32233 9.32233C4.63392 14.0107 2 20.3696 2 27C2 33.6304 4.63392 39.9893 9.32233 44.6777C14.0107 49.3661 20.3696 52 24.9 52" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                <circle cx="27" cy="27" r="20" fill="white"/>
                                <path d="M25 22L29.8586 26.8586C29.9367 26.9367 29.9367 27.0633 29.8586 27.1414L25 32" stroke="#01041D" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnboardingWelcome;