import * as THREE from 'three';

import chroma from 'chroma-js';

export default class ColorMath {
    colorMode = null;
    SIZE = null;
    SEGMENTS = null;

    constructor(colorMode, SIZE, SEGMENTS) {
        this.colorMode = colorMode;
        this.SIZE = SIZE;
        this.SEGMENTS = SEGMENTS;
    }

    vectorCoords = (coords) => {
        return new THREE.Vector3(
            coords[0],
            coords[1],
            coords[2]
        )
    }

    // HANDLING THE CONVERSION OF POINTS TO ANGLES
    p = (x, y) => {
        return { x, y }
    }

    // MAKE SURE OUR ANGLE IS NOT BLOWN OUT 
    normalizeAngle = (angle) => {
        if (angle < 0)
            angle += (2 * Math.PI)

        return angle
    }

    // DETERMINE THE ANGLE BETWEEN TWO POINTS ON THE CONE 
    angle = (p1, center, p2) => {
        const transformedP1 = this.p(p1.x - center.x, p1.y - center.y)
        const transformedP2 = this.p(p2.x - center.x, p2.y - center.y)

        const angleToP1 = Math.atan2(transformedP1.y, transformedP1.x)
        const angleToP2 = Math.atan2(transformedP2.y, transformedP2.x)

        return this.normalizeAngle(angleToP2 - angleToP1)
    }

    // CONVERT FROM RADIANS TO DEGREES
    toDegrees = (radians) => {
        return 360 * radians / (2 * Math.PI)
    }

    // FIND CORRESPONDING RGB COLOR TO X,Y,Z
    posToRGB = (color, { x, y, z }) => {
        const r = 0.5 + x / this.SIZE;       // R coordinate
        const g = 0.5 + y / this.SIZE;       // G coordinate
        const b = 0.5 + z / this.SIZE;       // B coordinate

        color.setRGB(r, g, b);
    }

    // FIND CORRESPONDING HSL COLOR TO X,Y,Z
    posToHSL = (color, { x, y, z }) => {
        // CALCULATE ANCLE AROUND CONE
        let h = this.toDegrees(this.angle(
            this.p(0, 0),
            this.p(0, 0),
            this.p(x, z)
        )) / -360;

        let s = 1;
        let v = 0.5;

        // DETERMINE IF THE POINT IS IN THE CENTER
        if ((x, Math.abs(y), z) === (0, this.SIZE / 2, 0)) {
            s = 0;                      // saturation levels of zero
            v = 0.5 - y / this.SIZE     // set the light levels for the center
        }

        color.setHSL(h, s, v)
    }

    posToColor = (colorMode, coords) => {
        var color = new THREE.Color(0xffffff);

        // CONVERT POSITION TO COLOR
        if (colorMode === "RGB")
            this.posToRGB(color, coords)
        else if (colorMode === "HSL")
            this.posToHSL(color, coords)

        return color
    }

    // PLACING IT WITHIN THE RGB CUBE
    hexToRGBPos = (hex) => {
        const hexRGB = chroma(hex).rgb()

        const x = (hexRGB[0] / 255 - 0.5) * this.SIZE;
        const y = (hexRGB[1] / 255 - 0.5) * this.SIZE;
        const z = (hexRGB[2] / 255 - 0.5) * this.SIZE;

        return [x, y, z]
    }

    // REBUILDING THE CONE WITH THE EQUATIONS
    hexTOHSLPos = (hex) => {
        const hexHSL = chroma(hex).hsv()

        // (x and z) are determinations of saturation and color rotation
        // (y) left side of the box is lightness (vertical)  
        const saturation = hexHSL[2] * (hexHSL[1] * this.SIZE / 2);
        const hue = (hexHSL[0]) * Math.PI / 180

        const x = saturation * Math.cos(hue)
        const z = saturation * Math.sin(hue)
        const y = (hexHSL[2] - 0.5) * this.SIZE

        return [x, y, z]
    }

    // DETERMINE WHICH MODE TO USE
    hexToPos = (mode, hex) => {
        if (mode === "RGB")
            return this.hexToRGBPos(hex)
        return this.hexTOHSLPos(hex);
    }
}