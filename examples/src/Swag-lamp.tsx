import React from 'react'
import { useGLTF } from '@react-three/drei'
import { Group } from 'three';
import { GroupProps } from '@react-three/fiber';

interface ModelProps extends GroupProps {
  wearingGlasses?: boolean;
  glassesColor?: string;
}

export function Model(props: ModelProps) {
  const { nodes, materials }: any = useGLTF('/swag-lamp.gltf')
  const { wearingGlasses, glassesColor, ...rest } = props;
  return (
    <group {...rest} dispose={null}>
      <mesh geometry={nodes.r0093.geometry} material={materials.ReflectiveC27D3A} />
      <mesh geometry={nodes.r0096.geometry} material={materials.CartoonFFFFFF} material-color={glassesColor} />
      {wearingGlasses && (
        <>
          <mesh geometry={nodes.s0099.geometry} material={materials.CartoonFF0A08} material-color={glassesColor} />
          <mesh geometry={nodes.s0102Thicken.geometry} material={materials.CartoonFF1100} material-color={glassesColor} />
          <mesh geometry={nodes.s0103Thicken.geometry} material={materials.CartoonFF1100} material-color={glassesColor} />
          <mesh geometry={nodes.s0104.geometry} material={materials.CartoonFF1100} material-color={glassesColor} />
          <mesh geometry={nodes.s0105.geometry} material={materials.CartoonFF1100} material-color={glassesColor} />
        </>
      )}
      <mesh geometry={nodes.s0111.geometry} material={materials.ReflectiveC27D3A} material-color={glassesColor} />
    </group>
  )
}

useGLTF.preload('/swag-lamp.gltf')
