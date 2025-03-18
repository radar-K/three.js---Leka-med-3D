import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from 'react';
import { OrbitControls, GizmoHelper, GizmoViewcube, GizmoViewport, useHelper, useGLTF } from "@react-three/drei";
import { useControls } from 'leva'
import { SpotLightHelper, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//camerahelper om skuggan hamnar utanför
// Sök på buffers i gltf filen för att byt namn på objektet

function LightWithHelper() {
    const Light = useRef();  

    useHelper(Light, SpotLightHelper, '#46cc43')
    const {angle, penumbra } = useControls({
        angle: Math.PI / 8,
        penumbra: {
        value: 0.0,
        min: 0.0,
        max:  1.0,
        step:  0.1
    }
    });

    return (
        <spotLight ref={Light} angle={angle} penumbra={penumbra} intensity={60} color={0xfcfcfc} 
        position={[2, 5, 1]}
        castShadow
        />
    )

}

function AnimatedBox(){
    const boxRef = useRef();
    const {color, speed} = useControls({
        color: '#00bfff',
        speed: {
            value: 0.005,
            min: 0.0,
            max:  0.03,
            step:  0.001
        }
    });

    useFrame(() => {
      boxRef.current.rotation.x += speed //0.005;
      boxRef.current.rotation.y += speed //0.005;
      boxRef.current.rotation.z += speed //0.005;
    })
  
    return (
      <mesh ref={boxRef} castShadow>
      <boxGeometry args={[2, 2, 2]}/>
      <axesHelper args={[10]}/>
      <meshStandardMaterial color={color}/>
      </mesh>
    )
  }
  
function Model() {
    const result = useLoader(GLTFLoader, '../../public/palm.gltf');
    return <primitive object={result.scene} position={[0, 2, 0]} />
} 

function Model2() {
    const result = useLoader(GLTFLoader, '../../public/scene.gltf');
    return <primitive object={result.scene} position={[5, 0, 2]} />
} 

function SphereWithTexture() {
    const texture = useLoader(TextureLoader, '../../public/textures/bird.jpg');
    return (
        <mesh position={[3, 1, 5]}>
        <sphereGeometry/>
        <meshStandardMaterial map={texture}/>
        </mesh>
    )
};

function Scene3() {
    return (
        <div>
        <Canvas shadows>
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewcube/>
        <GizmoViewport/>

        </GizmoHelper>


        <gridHelper args={[20, 20, 0xff22aa, 0x000000]}/>
        <axesHelper args={[10]}/>
        <OrbitControls/>
        <AnimatedBox/>
        <ambientLight/>
        <LightWithHelper/>
        <mesh rotation={[-Math.PI / 2,0,0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshPhongMaterial/>
        </mesh>
        <Model/>
        <Model2/>
        <SphereWithTexture/>      
        </Canvas>
      </div>
    )
}

export default Scene3;
