import {ChangeEvent, ReactElement, useState} from "react";
import {useNavigate} from 'react-router-dom';
import "./styleChoose.css";

const OnboardingChooseAuth = (): ReactElement => {
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const navigateToLogin = () => {
        navigate(`/login/${username}`); // Passez le nom d'utilisateur comme paramètre d'URL
    };

    const navigateToRegister = () => {
        navigate(`/register/${username}`); // Passez le nom d'utilisateur comme paramètre d'URL
    };

    return (
        <div className="screen-middle-onboarding">
            <div className="overlap-group-wrapper-choose">
                <div className="overlap-group-choose">
                    <div className="overlap-group-top">
                        <div className="title-choose">Avant de commencer !</div>
                        <div className="description">
                            <div className="subtitle">Choisissez votre authentification</div>
                            <div className="subtitle">
                                Veuillez inserer votre nom d'utilisateur
                            </div>
                        </div>
                    </div>
                    <input
                        className='input-choose'
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <div className="overlap-group-bottom">
                        <button onClick={navigateToLogin} className="overlap-group-button login">Login</button>
                        <button onClick={navigateToRegister} className="overlap-group-button register">Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OnboardingChooseAuth;