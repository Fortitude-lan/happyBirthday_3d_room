import * as THREE from 'three'

import Experience from './Experience.js'
import vertexShader from './shaders/house/vertex.glsl'
import fragmentShader from './shaders/house/fragment.glsl'

export default class House {
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Debug
        // if (this.debug) {
        //     this.debugFolder = this.debug.addFolder({
        //         title: 'house',
        //         expanded: true
        //     })
        // }

        this.setModel()
    }

    setModel() {
        this.scene.background = new THREE.Color(0xbfe3dd)
        this.model = {}
        this.model.mesh = this.resources.items.houseModel.scene
        this.model.mesh.scale.set(5, 5, 5)
        this.model.mesh.position.y -= 1
        this.model.mesh.rotation.y -= Math.PI / 2.5

        // TEXTURE

        this.model.houseTexture = this.resources.items.houseTexture
        this.model.houseTexture.encoding = THREE.sRGBEncoding
        this.model.houseTexture.flipY = false
        this.model.cakeTexture = this.resources.items.cakeTexture
        this.model.cakeTexture.encoding = THREE.sRGBEncoding
        this.model.cakeTexture.flipY = false

        //MESH
        const roomMesh = this.model.mesh.children.find(child => child.name === 'room')
        const cakeMesh = this.model.mesh.children.find(child => child.name === 'cake')
        roomMesh.material = new THREE.MeshBasicMaterial({ map: this.model.houseTexture })
        cakeMesh.material = new THREE.MeshBasicMaterial({ map: this.model.cakeTexture })

        // this.model.mesh.traverse(child => {
        //     if (child instanceof THREE.Mesh) {
        //         child.castShadow = true
        //     }
        // })
        this.model.material = new THREE.ShaderMaterial({
            uniforms:
            {
                uHouseTexture: { value: this.model.houseTexture },
                // uBakedNightTexture: { value: this.model.bakedNightTexture },
                // uBakedNeutralTexture: { value: this.model.bakedNeutralTexture },
                // uLightMapTexture: { value: this.model.lightMapTexture },

                // uNightMix: { value: 1 },
                // uNeutralMix: { value: 0 },

                // uLightTvColor: { value: new THREE.Color(this.colors.tv) },
                // uLightTvStrength: { value: 1.47 },

                // uLightDeskColor: { value: new THREE.Color(this.colors.desk) },
                // uLightDeskStrength: { value: 1.9 },

                // uLightPcColor: { value: new THREE.Color(this.colors.pc) },
                // uLightPcStrength: { value: 1.4 }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        })
        //ADD
        this.scene.add(this.model.mesh)

        //LIGHT
        const directionalLight = new THREE.DirectionalLight(0x1d76c3, 0.5);
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        const directionalLighthelper = new THREE.DirectionalLightHelper(directionalLight, 5);
        const directionalLighthelper2 = new THREE.DirectionalLightHelper(directionalLight2, 3);
        directionalLight.position.y = 5
        directionalLight2.position.set(-5, 3, 4)
        directionalLight2.rotation.x -= Math.PI / 3

        this.scene.add(directionalLight, directionalLight2);
        // this.scene.add(directionalLighthelper, directionalLighthelper2)




        // this.model.mesh = this.resources.items.roomModel.scene.children[0]

        // this.model.bakedDayTexture = this.resources.items.bakedDayTexture
        // this.model.bakedDayTexture.encoding = THREE.sRGBEncoding
        // this.model.bakedDayTexture.flipY = false

        // this.model.bakedNightTexture = this.resources.items.bakedNightTexture
        // this.model.bakedNightTexture.encoding = THREE.sRGBEncoding
        // this.model.bakedNightTexture.flipY = false

        // this.model.bakedNeutralTexture = this.resources.items.bakedNeutralTexture
        // this.model.bakedNeutralTexture.encoding = THREE.sRGBEncoding
        // this.model.bakedNeutralTexture.flipY = false

        // this.model.lightMapTexture = this.resources.items.lightMapTexture
        // this.model.lightMapTexture.flipY = false

        // this.colors = {}
        // this.colors.tv = '#ff115e'
        // this.colors.desk = '#ff6700'
        // this.colors.pc = '#0082ff'

        // this.model.material = new THREE.ShaderMaterial({
        //     uniforms:
        //     {
        //         uBakedDayTexture: { value: this.model.bakedDayTexture },
        //         uBakedNightTexture: { value: this.model.bakedNightTexture },
        //         uBakedNeutralTexture: { value: this.model.bakedNeutralTexture },
        //         uLightMapTexture: { value: this.model.lightMapTexture },

        //         uNightMix: { value: 1 },
        //         uNeutralMix: { value: 0 },

        //         uLightTvColor: { value: new THREE.Color(this.colors.tv) },
        //         uLightTvStrength: { value: 1.47 },

        //         uLightDeskColor: { value: new THREE.Color(this.colors.desk) },
        //         uLightDeskStrength: { value: 1.9 },

        //         uLightPcColor: { value: new THREE.Color(this.colors.pc) },
        //         uLightPcStrength: { value: 1.4 }
        //     },
        //     vertexShader: vertexShader,
        //     fragmentShader: fragmentShader
        // })

        // this.model.mesh.traverse((_child) =>
        // {
        //     if(_child instanceof THREE.Mesh)
        //     {
        //         _child.material = this.model.material
        //     }
        // })

        // this.scene.add(this.model.mesh)

        // // Debug
        // if(this.debug)
        // {
        //     this.debugFolder
        //         .addInput(
        //             this.model.material.uniforms.uNightMix,
        //             'value',
        //             { label: 'uNightMix', min: 0, max: 1 }
        //         )

        //     this.debugFolder
        //         .addInput(
        //             this.model.material.uniforms.uNeutralMix,
        //             'value',
        //             { label: 'uNeutralMix', min: 0, max: 1 }
        //         )

        //     this.debugFolder
        //         .addInput(
        //             this.colors,
        //             'tv',
        //             { view: 'color' }
        //         )
        //         .on('change', () =>
        //         {
        //             this.model.material.uniforms.uLightTvColor.value.set(this.colors.tv)
        //         })

        //     this.debugFolder
        //         .addInput(
        //             this.model.material.uniforms.uLightTvStrength,
        //             'value',
        //             { label: 'uLightTvStrength', min: 0, max: 3 }
        //         )

        //     this.debugFolder
        //         .addInput(
        //             this.colors,
        //             'desk',
        //             { view: 'color' }
        //         )
        //         .on('change', () =>
        //         {
        //             this.model.material.uniforms.uLightDeskColor.value.set(this.colors.desk)
        //         })

        //     this.debugFolder
        //         .addInput(
        //             this.model.material.uniforms.uLightDeskStrength,
        //             'value',
        //             { label: 'uLightDeskStrength', min: 0, max: 3 }
        //         )

        //     this.debugFolder
        //         .addInput(
        //             this.colors,
        //             'pc',
        //             { view: 'color' }
        //         )
        //         .on('change', () =>
        //         {
        //             this.model.material.uniforms.uLightPcColor.value.set(this.colors.pc)
        //         })

        //     this.debugFolder
        //         .addInput(
        //             this.model.material.uniforms.uLightPcStrength,
        //             'value',
        //             { label: 'uLightPcStrength', min: 0, max: 3 }
        //         )
        // }
    }
}