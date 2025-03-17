import { Suspense } from 'react'  // Suspense – En React-komponent som hanterar asynkrona laddningar, t.ex. när man laddar modeller eller texturer i en 3D-scen.
import './App.css'

import { Canvas } from '@react-three/fiber'; //  Skapar en WebGL-renderingsyta. (Web Graphics Library) JavaScript-API som gör det möjligt att rendera 3D-grafik direkt i webbläsaren 
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'; //  användaren kan rotera, zooma och panorera runt en 3D-scen med musen eller touch.
import Earth from '../public/Earth'



function App() {

  return (
    <>
    <Canvas>
      <ambientLight intensity={2}/> {'ljuskälla,  grundbelysning så att modeller inte är helt svarta i skuggade områden.'}
      <OrbitControls enableZoom={false}/>
      <Suspense fallback={null}>
        <Earth/>
      </Suspense>
      <ContactShadows position={[0, -1.2 , 0]} opacity={0.5} scale={30} blur={1} far={10} resolution={256} color="black"/>
      <Environment preset='sunset'/>

      {' En "environment" är en bakgrund eller ljussättning som simulerar en verklig eller stiliserad miljö för att ge din 3D-scen ett mer realistiskt utseende.'}
      {'<Suspense> är för att hantera asynkrona operationer, till exempel när du laddar data eller komponenter på ett sätt som kan ta lite tid (t.ex. att hämta bilder eller 3D-modeller). När något laddas asynkront, kan du visa en fallback (t.ex. en laddningsindikator) tills resursen är redo att visas.'}
    </Canvas>
    </>
  )
}

export default App
