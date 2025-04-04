import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useDrag } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';




function Floor() {
  return (
    <mesh position={[0, -1, 3]} scale={[100, 2, 100]}> {/* Scale: Multiplicera objektets ursprungliga storlek.*/}
      <boxGeometry args={[1, 1, 1]} />                 {/* Ursprungliga storleken på objektets geometri.*/}
      <meshStandardMaterial color={0xf9c834} />
    </mesh>
  );
}

function Box() {
  return (
    <mesh position={[6, 2, 6]} scale={[6, 6, 6]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={0xDC143C} />
    </mesh>
  );
}

function Cylinder() {
  return (
    <mesh position={[-15, 7, 6]} scale={[6, 5, 6]}>
      <cylinderGeometry args={[1, 1, 3, 32]} />
      <meshPhongMaterial color={0x90ee90} />
    </mesh>
  );
}

function Sphere() {
  const radius = 4;

  return (
    <mesh position={[15, radius, -15]}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshPhongMaterial color={0x43a1f4} />
    </mesh>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} color={0xffffff} />
      <directionalLight intensity={1} position={[-30, 50, -30]} castShadow />
    </>
  );
}

function Scene2() {
  const [draggable, setDraggable] = useState(null);
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  
  const handleClick = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, event.camera);
    const intersects = raycaster.current.intersectObjects(event.scene.children);

    if (intersects.length > 0 && intersects[0].object.userData.draggable) {
      setDraggable(intersects[0].object); // Välj objektet att dra
    }
  };

  const handleDrag = (event) => {
    if (draggable) {
      const intersects = raycaster.current.intersectObjects(event.scene.children);
      if (intersects.length > 0) {
        const target = intersects[0].point;
        draggable.position.x = target.x;
        draggable.position.z = target.z;
      }
    }
  };

  const handleRelease = () => {
    setDraggable(null); // Släpp objektet när du slutar dra
  };

  const [model, setModel] = useState(null);

  // Ladda OBJ-modellen med OBJLoader
  useEffect(() => {
    const loader = new OBJLoader();
    loader.load('/path/to/your/model.obj', (obj) => {
      obj.scale.set(2, 2, 2);
      obj.position.set(0, 0, 0);
      obj.userData = { draggable: true }; // Gör modellen flyttbar
      setModel(obj);
    });
  }, []);

  return (
    <Canvas 
      onClick={handleClick} 
      onMouseMove={handleDrag} 
      onPointerUp={handleRelease}
      shadows
      camera={{ position: [-35, 70, 100], fov: 30, near: 1, far: 1500 }}
    >
      <OrbitControls />
      <Lights />
      <Floor />
      <Box />
      <Sphere />
      <Cylinder />
      {model && <primitive object={model} />}
    </Canvas>
  );
}

export default Scene2;


// function BoxthreeJs() {
//   const scale = new THREE.Vector3(6, 6, 6);
//   const position = new THREE.Vector3(15, scale.y / 2, 15);
//   const meshRef = useRef();

//   useEffect(() => {
//     if (meshRef.current) {
//       meshRef.current.userData = { draggable: true }; // Gör objektet flyttbart
//     }
//   }, []);

//   return (
//     <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshPhongMaterial color={0xDC143C} />
//     </mesh>
//   );
// }