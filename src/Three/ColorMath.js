import * as THREE from 'three';

export default class ColorMath {
    colorMode = null;
    SIZE = null;
    SEGMENTS = null;

    constructor(colorMode, SIZE, SEGMENTS) {
        this.colorMode = colorMode;
        this.SIZE = SIZE;
        this.SEGMENTS = SEGMENTS;
    }

    // HANDLING THE CONVERSION OF POINTS TO ANGLES
    p = (x, y) => {
        return { x, y }
    }

    normalizeAngle = (angle) => {
        if (angle < 0)
            angle += (2 * Math.PI)

        return angle
    }

    angle = (p1, center, p2) => {
        const transformedP1 = this.p(p1.x - center.x, p1.y - center.y)
        const transformedP2 = this.p(p2.x - center.x, p2.y - center.y)

        const angleToP1 = Math.atan2(transformedP1.y, transformedP1.x)
        const angleToP2 = Math.atan2(transformedP2.y, transformedP2.x)

        return this.normalizeAngle(angleToP2 - angleToP1)
    }

    toDegrees = (radians) => {
        return 360 * radians / (2 * Math.PI)
    }

    posToRGB = (color, x, y, z) => {
        const r = 0.5 + x / this.SIZE;       // R coordinate
        const g = 0.5 + y / this.SIZE;       // G coordinate
        const b = 0.5 + z / this.SIZE;       // B coordinate

        color.setRGB(r, g, b);
    }

    posToHSL = (color, x, y, z) => {
        // CALCULATE ANCLE AROUND CONE
        let h = this.toDegrees(this.angle(
            this.p(5, 0),
            this.p(0, 0),
            this.p(x, z)
        )) / 360;

        let s = 1;
        let v = 0.5;

        // DETERMINE IF THE POINT IS IN THE CENTER
        if ((x, Math.abs(y), z) === (0, this.SIZE / 2, 0)) {
            s = 0;                      // saturation levels of zero
            v = 0.5 - y / this.SIZE     // set the light levels for the center
        }

        color.setHSL(h, s, v)
    }

    posToColor = (colorMode, x, y, z) => {
        var color = new THREE.Color(0xffffff);

        // CONVERT POSITION TO COLOR
        if (colorMode === "RGB")
            this.posToRGB(color, x, y, z)
        else if (colorMode === "HSL")
            this.posToHSL(color, x, y, z)

        return color
    }

    // hexToPos = (hex) => {
    //     return new THREE.Vector3(x, y, z)
    // }
}