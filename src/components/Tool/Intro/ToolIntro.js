import { Steps } from 'intro.js-react';

import "intro.js/introjs.css"

import "./ToolIntro.css";

const ToolIntro = ({ introEnabled, handleIntroExit }) => {
    const steps = [
        {
            element: '.cube',
            intro: <p>Explore the 3D visualization of your color palette as each point is plotted within the colorspace.<br /><br/>(The straighter the line, the higher the score.)</p>,
            position: 'right',
        }, {
            element: '.input',
            intro: 'Fine tune the colors of your scale along with their positions within the gradient!',
            position: 'left',
        }, {
            element: '.controls',
            intro: 'With your colors defined, you can control every little detail of the final scale.',
            position: 'left',
        }, {
            element: '.score',
            intro: 'See how well the collor palette you have assembled performs in the digital colorspace!' 
        }, { 
            element: '.tool',
            intro: "That's it! Now get out there and create the palette of your dreams."
        }
    ];

    return (
        <Steps
            enabled={introEnabled}
            initialStep={0}
            steps={steps}
            onExit={handleIntroExit}
            options={{
                doneLabel: "GO", 
                hideNext: false,
                keyboardNavigation: true,
                showProgress: true,
                showBullets: false,
                scrollToElement: true,
                overlayOpacity: 0,
                scrollPadding: 50
            }}
        />
    )
}

export default ToolIntro;