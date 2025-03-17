import { Suspense } from 'react'; // Suspense – En React-komponent som hanterar asynkrona laddningar, t.ex. när man laddar modeller eller texturer i en 3D-scen.
import { Canvas } from '@react-three/fiber';  //  Skapar en WebGL-renderingsyta. (Web Graphics Library) JavaScript-API som gör det möjligt att rendera 3D-grafik direkt i webbläsaren 
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import Earth from '../../public/Earth'

function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={2}/> {/* Grundbelysning */}
      <OrbitControls enableZoom={false}/> {/* Kamerakontroller */}
      <Suspense fallback={null}> {/* Hantera asynkrona laddningar */}
        <Earth/> {/* 3D-modell */}
      </Suspense>
      <ContactShadows position={[0, -1.2 , 0]} opacity={0.5} scale={30} blur={1} far={10} resolution={256} color="black"/>
      <Environment preset='sunset'/> {/* Bakgrund och ljussättning */}
    </Canvas>
  );
}

export default Scene;
