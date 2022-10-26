import * as React from 'react'
import * as THREE from 'three'
import * as ReactDOM from 'react-dom/client'
import { VRButton, XR, Hands, useXR, Interactive, useHitTest, Controllers } from '@react-three/xr'
import { Box, Text } from '@react-three/drei'
import { useFrame, Canvas } from '@react-three/fiber'
import { Model as SwagLamp } from './Swag-lamp'
import { Euler } from 'three'

function Button(props: JSX.IntrinsicElements['group']) {
  const [hover, setHover] = React.useState(false)
  const [color, setColor] = React.useState(0x123456)
  const { args, ...rest } = props;

  return (
    <Interactive onSelect={() => setColor((Math.random() * 0xffffff) | 0)} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
      <SwagLamp {...props} wearingGlasses={hover} glassesColor={`${color}`} />
      {/* <Box {...props} args={[0.4, 0.1, 0.1]} scale={hover ? 1.5 : 1}>
        <meshStandardMaterial color={color} />
        {false && (
          <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">
            Hello react-xr!
          </Text>
        )}
      </Box> */}
    </Interactive>
  )
}

function PlayerExample() {
  const player = useXR((state) => state.player)
  useFrame(() => void (player.rotation.x = player.rotation.y += 0.01))

  return null
}

function HitTestExample() {
  const boxRef = React.useRef<THREE.Mesh>(null!)
  useHitTest((hitMatrix) => boxRef.current.applyMatrix4(hitMatrix))

  return <Box ref={boxRef} args={[0.1, 0.1, 0.1]} />
}

function PresentingNotice() {
  const isPresenting = useXR((state) => state.isPresenting);
  const [presentationText, setPresentationText] = React.useState<string>("Loading...");
  React.useEffect(() => {
    switch(presentationText) {
      case "Loading...":
        isPresenting && setPresentationText("Presenting");
        !isPresenting && setPresentationText("Not Presenting");
        break;
      case "Not Presenting":
        isPresenting && setPresentationText("Presenting");
        break;
      case "Presenting":
        !isPresenting && setPresentationText("Not Presenting");
      default:
        setPresentationText("Loading...");
    }
  }, [isPresenting])
  return (
    <Text position={[0, 0, 0.06]} fontSize={0.05} color="#000" anchorX="center" anchorY="middle">{presentationText}</Text>
  );
}

function App() {
  // useFrame(() => thatone.set(thatone['x'] + 0.01, thatone['y'], thatone['z']));
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <PresentingNotice />
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Hands
          // modelLeft="/hand-left.gltf"
          // modelRight="/hand-right.gltf"
          />
          <Button scale={0.01} position={[0, 0.8, -1]} rotation={[-1.6, 0, -1]} />
          <Controllers />
          {false && <PlayerExample />}
          {false && <HitTestExample />}
        </XR>
      </Canvas>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
