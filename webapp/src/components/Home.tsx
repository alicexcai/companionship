import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// @ts-ignore
import RadioButtonGroup from "react-custom-radio-buttons-group";

import Landing from "./Home/Landing";

export default function Home({setOption, options}: any) {

    const navigate = useNavigate();

    const handleChange = (e : any) => {
        setOption(e.target.value);
    }

    const handleSubmit= () => {
        navigate("/chat");
    }

    return (
        <Row>
            <Col xs={12} md={6}>
                <Landing />
            </Col>
            <Col xs={12} md={6}>
                <section>
                    <div className="mb-4">
                        <h4 className="mb-3">
                        What kind of conversation do you want to have?
                        </h4>
                        <RadioButtonGroup
                            onChange={handleChange}
                            hide={false}
                            values={options}
                        />
                    </div>

                    <Button 
                        onClick={handleSubmit}
                        size="lg"
                    >
                        👯‍♀️ Start Talking
                    </Button>

                </section>
            </Col>
        </Row>
    );
}