import { Steps } from 'intro.js-react';
import { useState } from 'react';

import "intro.js/introjs.css"

import "./ToolIntro.css";

const ToolIntro = () => {
    const steps = [
        {
            element: '.cube',
            intro: <p>Explore the 3D visualization of your generated color palette as each point is plotted within the colorspace.<br /><br/>(The more straight the line, the better.)</p>,
            position: 'right',
        }, {
            element: '.input',
            intro: 'Customize the input and fine-tune all aspects to get it just right.',
            position: 'left',
        }, {
            element: '.code',
            intro: '... and here is the web-friendly code of your color scale so that you can take it home with you.',
            position: 'left',
        }, {
            element: '.color-mode',
            intro: 'Choose from any of the available output modes and fine-tune your scale to perfection.',
            position: 'top',
        }, {
            element: '.scale-gradient',
            intro: 'Finally we have the 2D view of your scale in gradient form along with sliders to move a color to a different position.',
            position: 'top',
        }
    ];

    const [introEnabled, setIntroEnabled] = useState(false);

    const handleExit = () => { 
        setIntroEnabled(!introEnabled)
    }

    return (
        <Steps
            enabled={introEnabled}
            initialStep={0}
            steps={steps}
            onExit={handleExit}
            options={{
                doneLabel: "GO", 
                hideNext: false,
                keyboardNavigation: true,
                showProgress: true,
                showBullets: false,
                scrollToElement: true,
                overlayOpacity: 1,
                scrollPadding: 50
            }}
        />
    )
}

export default ToolIntro;