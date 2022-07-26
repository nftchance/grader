import { useState } from "react";
import { Helmet } from "react-helmet-async";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary
} from "@mui/material";

import Page from "@components/Page/Page";

import SEO_CONSTANTS from "@components/SEO/constants";

const FAQ = () => {
    const faqs = [
        {
            question: "What's the 1 sentence summary of Colorspace?",
            answer: "In 2022 we are using design principlies from 1917, Colorspace introduces easy mechanisms to use and understand the principles of digital colors and their usage within a palette."
        }, {
            question: "What is Colorspace?",
            answer: "Colorspace is a visualization tool that scores color palettes while improving the overall cohesiveness. With that, you can curate the perfect color scale while Colorspace handles the digital appearance scoring."
        }, {
            question: "How do I benefit from the visualization?",
            answer: "In digital design, large and inconsistent jumps result in murky greys. For a 'pure' digital brand, following a linear curve through the colorspace will result in a far more color-filled scale."
        }, {
            question: "How does this work?",
            answer: "Behind the scenes, Colorspace is scaling the colors you provide to visualize the spectrum of your palette in 2D and 3D. Built on the foundation of digital brand guidelines, Colorspace then takes all the output data to score the active color scale."
        }, {
            question: "How does the scoring work?",
            answer: "With every small change of the colors you provide, Colorspace will calculate a new score based on the rules provided. Primarily, calculating and weighing different aspects of the color scale linearity. Color, will always be relative to the viewer. However, the score provides a solid frame of reference for the digital strength of the scale."
        }, {
            question: "Who is this for?",
            answer: "Colorspace is for digital-focused designers and creators. The 'rules' of color have been defined for more than a century. Colorspace is not taking the stance that everything in history was wrong. Instead, Colorspace is made for designers that primarily live in the digital world. The usage of digital brands and colors are entirely different to that of the physical world and different tools are needed."
        }, {
            question: "What makes this different to <x> product?",
            answer: "Existing color products operate on an extremely guess-and-check driven workflow. Instead, with Colorspace it is simple as defining initial 'base colors' and then adjusting them in the visual 3D Colorspace; knowing that you have created a cohesive palette. More importantly though, existing tools are utilizing the outdated thought patterns of the 1900s. From a time when paint pigment could not even reach a true state of color, to a world where colors are visualized with just red, green and blue lights. Times have changed and Colorspace stands in that lane of offering a helping hand in the new era."
        }, {
            question: "Is this a super niche product?",
            answer: "As it stands, there has been little discussion about the need for new color mental-models. With the continual growth of technology adoption and integration it is inevitable that will come. Colorspace, is niche for now."
        }, { 
            question: "When was the last time you questioned how you were choosing colors for your digital brand?",
            answer: "A few seconds ago."
        },
    ]

    const [expanded, setExpanded] = useState('panel-0');

    const handlePanelChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <Page>
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
                            padding: 2
                        }}>
                            <p>{faq.answer}</p>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </Page>
    )
}

export default FAQ;