import { ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Webcam from "react-webcam";
import { io, Socket } from "socket.io-client";
import "./styleRegister.css";

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
            success: boolean;
        };
    };
}

const OnboardingRegister = (): ReactElement => {
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
        const initializeSocket = () => {
            socket.current = io("http://localhost:5000");

            console.log('username', paramUsername());

            socket.current.on("register", (data: StreamData) => {
                console.log("Received data from server:", data);
                setStreamData(data);
            });
        };

        const sendVideoStream = async () => {
            if (webcamRef.current && isSending) {
                const videoFrame = webcamRef.current.getScreenshot();

                if (videoFrame) {
                    const binaryData = await fetch(videoFrame).then((res) => res.arrayBuffer());

                    if (socket.current) {
                        console.log("Sending data to server:");
                        socket.current.emit("register", [paramUsername(), new Uint8Array(binaryData)]);
                    }
                }
            }
        };

        initializeSocket();

        const intervalId = setInterval(sendVideoStream, 1000);

        setTimeout(() => {
            clearInterval(intervalId);
            setIsSending(false);
            if (socket.current) {
                if (streamData && streamData.data.attributes.success) {
                    navigateToHome();
                }
                socket.current.disconnect();
            }
        }, 4000);

        return () => {
            clearInterval(intervalId);

            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [isSending]);

    return (
        <div className="overflow-hidden">
            <Webcam videoConstraints={videoConstraints} ref={webcamRef} />
        </div>
    );
};

export default OnboardingRegister;
