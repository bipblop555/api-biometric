import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import Slider from './components/Slider';
import OnboardingWelcome from "./screens/OnboardingWelcome/OnboardingWelcome";
import OnboardingChooseAuth from "./screens/OnboardingChooseAuth/OnboardingChooseAuth";
import OnboardingLogin from "./screens/OnboardingLogin/OnboardingLogin";
import OnboardingRegister from "./screens/OnboardingRegister/OnboardingRegister";
import Home from "./screens/Home/Home";

function App() {
    const styles = {
        app: {
            width: '100vw',
            height: '100vh'
        }
    }

    return (
        <div style={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<OnboardingWelcome />} />
                    <Route path="/onboarding" element={<OnboardingChooseAuth />} />
                    <Route path="/register/:username" element={<OnboardingRegister />} />
                    <Route path="/login/:username" element={<OnboardingLogin />} />
                    <Route path="/home/:username" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
