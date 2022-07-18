import { useState } from "react";
import { Helmet } from "react-helmet-async";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary
} from "@mui/material";

import SEO_CONSTANTS from "../SEO/constants";

const FAQ = () => {
    const faqs = [
       
    ]

    const [expanded, setExpanded] = useState('panel-0');

    const handlePanelChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            <Helmet>
                <title>{SEO_CONSTANTS.faq.title}</title>
                <meta property="og:title" content={SEO_CONSTANTS.faq.title} />
                <meta name="twitter:title" content={SEO_CONSTANTS.faq.title} />

                <meta name="description" content={SEO_CONSTANTS.faq.description} />
                <meta property="og:description" content={SEO_CONSTANTS.faq.description} />
                <meta name="twitter:description" content={SEO_CONSTANTS.faq.description} />
            </Helmet>

            <div className="container">
                <div className="header">
                    <h1>FAQs</h1>
                    <p className="lead">Have a few questions about COLORSPACE and how to best use it? You can find all the answers below.</p>
                </div>

                {faqs.map((faq, idx) => (
                    <Accordion
                        expanded={expanded === `panel-${idx}`}
                        key={idx}
                        square={true}
                        onChange={handlePanelChange(`panel-${idx}`)}
                    >
                        <AccordionSummary
                            // expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${idx}-content`}
                            id={`panel-${idx}`}
                            sx={{
                                backgroundColor: "black",
                                border: "1px solid #fff",
                            }}
                        >
                            <strong>{faq.question}</strong>
                        </AccordionSummary>

                        <AccordionDetails sx={{
                            backgroundColor: "black",
                            border: "1px solid #fff",
                            borderTop: "none",
                            borderBottom: "none",
                            padding: 2
                        }}>
                            {faq.answer}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </>
    )
}

export default FAQ;