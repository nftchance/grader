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
            intro: 'Customize the input and fine-tune all aspects of your palette to get it just right.',
            position: 'left',
        }, {
            element: '.code',
            intro: 'Once you have found your palette you can find the copy-paste ready code.',
            position: 'left',
        }, {
            element: '.color-mode',
            intro: 'Choose from any of the available color output modes and fine-tune your scale to perfection.',
            position: 'top',
        }, {
            element: '.scale-gradient',
            intro: 'Finally we have the 2D view of your scale in gradient form along with sliders to move a color to a different position.',
            position: 'top',
        }, { 
            element: '.tool',
            intro: <p>That's it! Now get out there and create the palette of your dreams.</p>
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