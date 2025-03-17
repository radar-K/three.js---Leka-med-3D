import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from 'react';
import { OrbitControls, GizmoHelper, GizmoViewcube, GizmoViewport, useHelper } from "@react-three/drei";
import { useControls } from 'leva'
import { SpotLightHelper } from 'three'

function LightWithHelper() {
    const Light = useRef();  

    useHelper(Light, SpotLightHelper, 'orange')
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
        <spotLight ref={Light} angle={angle} penumbra={penumbra} intensity={60} color={0xfcfcfc} position={[2, 5, 1]}/>
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
      <mesh ref={boxRef}>
      <boxGeometry args={[2, 2, 2]}/>
      <axesHelper args={[10]}/>
      <meshStandardMaterial color={color}/>
      </mesh>
    )
  }
  

function Scene3() {
    return (
        <div>
        <Canvas>
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewcube/>
        <GizmoViewport/>

        </GizmoHelper>


        <gridHelper args={[20, 20, 0xff22aa, 0x000000]}/>
        <axesHelper args={[10]}/>
        <OrbitControls/>
        <AnimatedBox/>
        <ambientLight/>
        {/*<LightWithHelper/> */}
        <pointLight 
        intensity={50} 
        position={[2, 5, 1]}/>
        </Canvas>
      </div>
    )
}

export default Scene3;
