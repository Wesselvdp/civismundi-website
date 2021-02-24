import * as THREE from 'three'

import { GeoJsonGeometry } from 'three-geojson-geometry';
import { ConicPolygonGeometry } from 'three-conic-polygon-geometry';
// import { geoGraticule10 } from 'd3';

import BaseObject from './BaseObject';
import { tThreeObject, tProject } from '../types';

import geoJson from './geoJson';
// import console = require('console');
// import console = require('console');
// import console = require('console');
// import console = require('console');
// import console = require('console');
// import console = require('console');

const SIZE = { width: 40, height: 30 };

const VIDEOS = [
  '/video-test-0.mp4',
  '/video-test-1.mp4',
  '/video-test-2.mp4'
]

const ALT = 105;

export default class VideoPlane extends BaseObject {
  project: tProject;
  objects: any[] = [];

  constructor(globe: any, project: tProject, sphere: tThreeObject) {
    super();

    this.project = project;

    this.init(globe, sphere);
  }

  init(globe: any, sphere: tThreeObject) {
    const materials: any = [];
    for (let i = 0; i < VIDEOS.length; i++) {
      const video = document.createElement('video');
      video.crossOrigin = 'anonymous';

      video.src = `/video-test-${i}.mp4`;
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.load();
      video.play();

      const texture = new THREE.VideoTexture( video );
      const material = new THREE.MeshLambertMaterial({side: THREE.DoubleSide, color: 0xffffff, map: texture, opacity: 0.6, transparent: true });
      materials.push([undefined, undefined, material]);
    }

    const polygonMeshes: any = [];
    geoJson.features.forEach(({ properties, geometry }, j) => {
      const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates;

      polygons.forEach((coords) => {
        const iMaterial = j % VIDEOS.length;

        polygonMeshes.push(
          new THREE.Mesh(
            new ConicPolygonGeometry(coords, 0, ALT, true, true, true, 3),
            materials[iMaterial]
          )
        );
      });
    });

    polygonMeshes.forEach(obj => {
      this.computeUVs(obj.geometry);
      globe.scene().add(obj);
    })

    const normal = new THREE.Vector3();
    globe.controls().addEventListener('start', () => {
      const tile = Math.floor(Math.random() * this.objects.length)

      let mesh = this.objects[tile];
      const normalMatrix = new THREE.Matrix3().getNormalMatrix( mesh.matrixWorld );
      const newNormal = normal.clone().applyMatrix3( normalMatrix ).normalize();

      console.log('normal vector', newNormal);
      mesh.position.add(newNormal.multiplyScalar(10));
    })

    this.objects = polygonMeshes;
  }

  computeUVs = (geometry: any) => {

    geometry.computeBoundingBox();

    var max = geometry.boundingBox.max,
        min = geometry.boundingBox.min;
    var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
    var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
    var faces = geometry.faces;
    var vertices = geometry.vertices;

    geometry.faceVertexUvs[0] = [];

    for (var i = 0, il = faces.length; i < il; i++) {

      var v1 = vertices[faces[i].a],
          v2 = vertices[faces[i].b],
          v3 = vertices[faces[i].c];

      geometry.faceVertexUvs[0].push([
        new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
        new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
        new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y)
      ]);
    }
    geometry.uvsNeedUpdate = true;
  }
}
