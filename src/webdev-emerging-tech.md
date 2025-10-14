---
layout: layout.html
---

<small>December 6, 2024</small>

# Three Important Emerging Technologies for WebDevs

There are three emerging technologies that are really important for web devs.

## Bun

Bun will run your tests suites much faster, it will make your CI/CD pipelines faster (and cheaper), It will make you more productive and you will spend less time in config hell. You can run typescript without pulling in other deps. It isn’t a drop in replacement quite yet but for new projects it is an incredible build and test tool, and hopefully soon it will be much more.

It is successfully bringing convention over configuration into the JS/TS ecosystem.

## WebGPU

WebGPU was very recently released and is what comes after WebGL. It introduces the concept of a Compute Shader.

A Compute Shader is a Shader Stage that is used entirely for computing arbitrary information.¹

This means that you can leverage the GPU for insane parallelization. The GPU is designed to parallelize computation for each pixel on a screen, so if you aren’t aware it’s like a processor dedicated to parallelization and rendering. But you can leverage the parallelization part. It doesn’t always improve performance, because of communication overhead between the CPU and the GPU. In some cases you will see incredible performance improvements from moving work over to a graphics card.

## Elixir/Phoenix

I have been writing Elixir for 6 years and it has only gotten sweeter. It makes testing a breeze, instantiates a web application with a test database right there that you can write assertions against from the getgo. It leverages Ecto which is a really powerful querying dsl and migration tool. The productivity is incredible.

Elixir runs on the BEAM which is a VM designed long, long ago for massive parallelization for the telecommunications domain. It was designed by a humble physicist and working with it reignited my love for software development. It is simply a joy to work with.

But the kicker is LiveView.

LiveView does SSR over websockets and their own version of components. It passes diffs in a sophisticated but understandable way via a lot of interesting optimizations that you can read about right here. Imagine a frontend tool that isn’t a black box. That you can write assertions against with ease, even assertions that match on one word being present. Or one word being present after you press a button. And they run really fast. Granted sometimes React makes more sense. It’s still good to know about, and absurdly powerful for the creation of internal tools and prototypes.

[1] <a href="https://www.khronos.org/opengl/wiki/Compute_Shader">https://www.khronos.org/opengl/wiki/Compute_Shader</a>
