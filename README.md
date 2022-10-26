# React Three Fiber Heightmap

A very simple implementation of a heightmap generated via simplex noise using React Three Fiber, a wrapper around ThreeJS in React.

I built this as I explored how Minecraft and other Voxel games work which use more advanced versions of this approach to generate terrain.

A large part of my understanding of this came from [Making Maps with Noise Functions - Red Blog Games](https://www.redblobgames.com/maps/terrain-from-noise/), an excellent post that details the specific details of an array of different attributes we can apply to noise functions.

It's built with vite, and you can run `yarn run dev` to boot it in dev mode or `yarn run build` to output a static version.