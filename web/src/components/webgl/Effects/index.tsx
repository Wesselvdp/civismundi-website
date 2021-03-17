import { useMemo, useEffect } from 'react'
import { useThree, useFrame } from 'react-three-fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'

import { StaticShader } from './shaders/StaticShader'
import { GlitchPass } from './passes/GlitchPass'

function Effects({ ready }) {
  const { gl, scene, camera, size } = useThree()

  const [composer, glitchPass, staticPass] = useMemo(() => {
    const composer = new EffectComposer(gl)

    // - Render pass
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    // - Glitch pass
    const glitchPass = new GlitchPass(32)
    glitchPass.goWild = true
    composer.addPass(glitchPass)

    // - Static pass
    const staticPass = new ShaderPass(StaticShader)
    composer.addPass(staticPass)

    // - Copy pass
    const copyPass = new ShaderPass(CopyShader)
    copyPass.renderToScreen = true
    composer.addPass(copyPass)

    return [composer, glitchPass, staticPass]
  }, [])

  useEffect(() => {
    if (ready) {
      setTimeout(() => {
        glitchPass.goWild = false
      }, 1500)

      setTimeout(() => {
        glitchPass.range = [540, 660]
        glitchPass.generateTrigger()
      }, 10000)
    }
  }, [ready])

  useEffect(() => {
    composer.setSize(size.width, size.height)
  }, [composer, size])

  useFrame(() => {
    if (staticPass.uniforms['time'].value > 12) {
      staticPass.uniforms['time'].value = 0
    }

    staticPass.uniforms['time'].value += 0.1

    composer.render()
  }, 1)

  return null
}

export default Effects
