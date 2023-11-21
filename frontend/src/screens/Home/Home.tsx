import React, {ReactElement} from "react";
import {useParams} from "react-router-dom";
import "./styleHome.css";

const Home = (): ReactElement => {
    const { username } = useParams<{ username: string }>();

    const paramUsername = (): string => {
        return username as string;
    };

    // @ts-ignore
    return (
        <div className="screen-start-onboarding">
            <div className="overlap-group-wrapper">
                <div className="overlap-group">
                    <div className="overlap-group-left">
                        <div className="title">
                            Bienvenue ! {paramUsername()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;