import Slider from 'rc-slider';

import "./Colorspace2DGradient.css";

const Colorspace2DGradient = (props) => {
    const { colors, onChange, gradient } = props;

    return (
        <div className="step gradient" style={{
            background: gradient,
        }}>
            <Slider
                range
                min={0}
                max={100}
                value={colors.map(color => color.domain * 100)}
                onChange={onChange}
                pushable={true}
            />

            {colors.map((color, idx) => { 
                return <div className="gradient-slider" key={idx}  style={{
                    left: `${color.domain * 100}%`
                }}>
                    <div className="handle" style={{
                        backgroundColor: color.color
                    }}/>
                </div>
            })}
        </div>
    )
}

export default Colorspace2DGradient;