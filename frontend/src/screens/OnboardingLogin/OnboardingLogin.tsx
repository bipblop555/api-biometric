import { ReactElement, useEffect, useRef, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import Webcam from "react-webcam";
import { io, Socket } from "socket.io-client";
 import "./styleLogin.css";

const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user",
    audio: false,
    screenshotFormat: "image/jpeg",
};

interface StreamData {
    data: {
        attributes: {
            face_position: number[];
            face_match: boolean;
        };
    };
}


const OnboardingLogin = (): ReactElement => {
    const { username } = useParams<{ username: string }>();
    const webcamRef = useRef<Webcam | null>(null);
    const socket = useRef<Socket | null>(null);
    const [isSending, setIsSending] = useState(true);
    const [streamData, setStreamData] = useState<StreamData | null>(null);
    const navigate = useNavigate();

    const paramUsername = (): string => {
        return username as string;
    };


    const navigateToHome = () => {
        // 👇️ navigate to /contacts
        navigate('/home/' + paramUsername());
    };



    useEffect(() => {

        if (paramUsername() === 'undefined') {
            return;
        }

        const initializeSocket = () => {
            socket.current = io("http://localhost:5000");

            socket.current.on("login", (data: StreamData) => {
                console.log("Received data from server:", data);
                // @ts-ignore
                const json = JSON.parse(data);
                setStreamData(json);
                console.log(json);
            });
        };

        const sendVideoStream = async () => {
            if (webcamRef.current && isSending) {
                const videoFrame = webcamRef.current.getScreenshot();

                if (videoFrame) {
                    const binaryData = await fetch(videoFrame).then((res) => res.arrayBuffer());

                    if (socket.current) {
                        console.log("Sending data to server:");
                        socket.current.emit("login", [paramUsername(), new Uint8Array(binaryData)]);
                    }
                }
            }
        };

        initializeSocket();

        const intervalId = setInterval(() => {
            sendVideoStream();
            if (streamData && streamData.data !== undefined) {
                console.log(streamData.data);
                console.log('test', streamData.data.attributes.face_position[0])
            }
        }, 1000);

        // Arrêtez l'envoi après 3 secondes
        setTimeout(() => {
            clearInterval(intervalId);
            setIsSending(false);
            if (socket.current) {
                if (streamData && Array.isArray(streamData.data.attributes.face_position) && streamData.data.attributes.face_position.length > 0) {
                    navigateToHome();
                }
                socket.current.disconnect();
            }
        }, 5500);

        return () => {
            clearInterval(intervalId);

            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [isSending]);

    return (
        <div className='overflow-hidden'>
            <Webcam videoConstraints={videoConstraints} ref={webcamRef} />
            {streamData && Array.isArray(streamData.data.attributes.face_position) && (
                <div
                    style={{
                        position: 'absolute',
                        left: streamData.data.attributes.face_position[0] * 0.55 + "px",
                        top: streamData.data.attributes.face_position[2] + 150 + "px",
                        width: streamData.data.attributes.face_position[1] + 150 + "px",
                        height: streamData.data.attributes.face_position[3]+ 250 +"px",
                        border: '2px solid red',
                        boxSizing: 'border-box',
                    }}
                ></div>
            )}
                </div>
    );
};

export default OnboardingLogin;
