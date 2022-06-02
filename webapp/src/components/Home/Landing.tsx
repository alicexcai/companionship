import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

import background from "../../images/bg.jpeg";

const TEXTS = [
    "Anyone",
    "Mentor",
    "Therapist",
    "Minority",
    "Friends",
];

export default function Landing() {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() =>
          setIndex(index => index + 1),
          2 * 1000 // every 2 seconds
        );
        return () => clearTimeout(intervalId);
    }, []);

    return (
        <div 
            className="background"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="overlay">
                <h2>
                    Talk to 
                    <TextTransition
                        text={ TEXTS[index % TEXTS.length] }
                        springConfig={ presets.wobbly }
                        inline
                        style={{ margin: "0 .5rem" }}
                    />
                    on Companion
                </h2>
                <p>
                    Companion contributes to the happiness by (1) allowing users to interact with anyone they want, (2) providing an easy access to an AI therapist, and (3) promoting the understanding of the minority via conversations.
                </p>
            </div>
        </div>
    );
}