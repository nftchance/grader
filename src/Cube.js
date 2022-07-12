import { useRef, Suspense, useEffect } from "react";

import * as THREE from 'three';

import { Canvas, useLoader } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const SIZE = 10;
const SEGMENTS = 1;

// TODO: On hover make it have an opacity
// TODO: On hover show the points of the circle

// const WaveShaderMaterial = shaderMaterial(
//     // Uniform
//     { uColor: new THREE.Color(1.0, 0.0, 0.0), uTime: 0, uTexture: null },
//     // Vertex Shader 
//     glsl`
//         precision mediump float;

//         varying vec2 vUv;
//         uniform float uTime;

//         void main() {
//             vUv = uv;

//             gl_Position = projectionMatrix * modelViewMatrix * vec4(
//                 position, 
//                 1.0 
//             );
//         }
//     `,
//     // Fragment Shader
//     glsl`
//         precision mediump float;

//         uniform vec3 uColor;
//         uniform float uTime;
//         uniform sampler2D uTexture;

//         varying vec2 vUv;

//         void main() {
//             vec3 texture = texture2D(uTexture, vUv).rgb; 
//             gl_FragColor = vec4(texture, 1.0);
//         }
//     `
// )
// extend({ WaveShaderMaterial });

const Floor = () => {
    // REPEAT THE TEXTURE A TON OF TIMES
    const floorTexture = useLoader(TextureLoader, 'ground.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(350, 350);

    // Set the material
    const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide })
    const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);

    return (
        <mesh
            geometry={floorGeometry}
            material={floorMaterial}
            position={[0, -1.01 * SIZE / 2, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow={true}
            receiveShadow={true}
        />
    )
}

const CubeMesh = (props) => {
    const { mode } = props;

    const ref = useRef(null);

    // HANDLING THE CONVERSION OF POINTS TO ANGLES
    const p = (x, y) => {
        return {x,y}
    }

    const normalizeAngle = (angle) => {
        if (angle < 0)
            angle += (2 * Math.PI)
   
        return angle
    }
    
    const angle = (p1, center, p2) => {
        const transformedP1 = p(p1.x - center.x, p1.y - center.y)
        const transformedP2 = p(p2.x - center.x, p2.y - center.y)
    
        const angleToP1 = Math.atan2(transformedP1.y, transformedP1.x)
        const angleToP2 = Math.atan2(transformedP2.y, transformedP2.x)
    
        return normalizeAngle(angleToP2 - angleToP1)
    }
    
    const toDegrees = (radians) => {
        return 360 * radians / (2 * Math.PI)
    }
    
    const appendColorVertex = (colors, x, y, z) => {
        var color = new THREE.Color(0xffffff);

        // CONVERT POSITION TO COLOR
        if (mode === "RGB") {
            const r = 0.5 + x / SIZE;       // R coordinate
            const g = 0.5 + y / SIZE;       // G coordinate
            const b = 0.5 + z / SIZE;       // B coordinate

            color.setRGB(r, g, b);
        } else if (mode === "HSL") {
            // CALCULATE ANCLE AROUND CONE
            let h = toDegrees(angle(p(5, 0), p(0, 0), p(x, z))) / 360;
            let s = 1;
            let v = 0.5;

            // DETERMINE IF THE POINT IS IN THE CENTER
            if ((x, Math.abs(y), z) === (0, SIZE / 2, 0)) {
                s = 0;              // saturation levels of zero
                v = 0.5 - y / SIZE  // set the light levels for the center
            }

            color.setHSL(h, s, v)
        }

        // BUILD THE VERTEX COLOR ARRAY 3 VALUES AT A TIME
        colors.push(color.r, color.g, color.b);
    }

    // DEFINE THE GEOMETRY
    var boxGeometry = new THREE.BoxGeometry(SIZE, SIZE, SIZE, SEGMENTS, SEGMENTS, SEGMENTS);
    if (mode === "HSL") {
        boxGeometry = new THREE.ConeBufferGeometry(SIZE / 2, SIZE, SEGMENTS * 50)
    }

    // ENABLE THE ABILITY TO COLOR THE CUBE BY VERTEX
    const material = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 1 });
    const vertexPositions = boxGeometry.attributes.position.array;

    // STORE THE COLORS NEEDED FOR THE VERTEXES
    const colors = [];

    // LOOP THROUGH EVERY VERTEX
    for (let vertex = 0; vertex < vertexPositions.length; vertex += 3) {
        // CALCULATE THE POSITION OF THE VERTEX
        const x = vertexPositions[vertex];      // X coordinate
        const y = vertexPositions[vertex + 1];  // Y coordinate
        const z = vertexPositions[vertex + 2];  // Z coordinate

        // DETERMINE THE PROPER COLOR FOR THIS VERTEX
        appendColorVertex(colors, x, y, z);
    }

    // UPDATE THE GEOMETRY
    boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    // TODO: ROTATE THE CONE REF
    useEffect(() => { 
        if(mode == "HSL") {
            ref.current.rotation.x = Math.PI;
        } else {
            ref.current.rotation.x = 0;
        }
    }, [ref, mode])

    return (
        <>
            <mesh
                geometry={boxGeometry}
                material={material}
                castShadow={true}
                receiveShadow={true}
                ref={ref}
            />
        </>
    )
}

const Cube = (props) => {
    const { colors, colorMode: mode } = props;

    return (
        <Canvas
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight />
            <pointLight intensity={1} position={[10, 10, 10]} />

            <fog attach="fog" args={['black', 1, 75]} />

            <Suspense fallback={null}>
                <Floor />
            </Suspense>
            <Suspense fallback={null}>
                <CubeMesh mode={mode} />
            </Suspense>

            <OrbitControls makeDefault minDistance={SIZE * 1.5} maxDistance={SIZE * 3} />
            <PerspectiveCamera makeDefault fov={50} position={[10, 10, 10]} />
        </Canvas>
    )
}

export default Cube;