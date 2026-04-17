import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // limit pixel ratio for performance
    mountRef.current.appendChild(renderer.domElement);

    // Particles (simulating cells/molecules)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      // spread particles out
      posArray[i] = (Math.random() - 0.5) * 20; 
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create a circular texture for particles programmatically
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(16, 16, 14, 0, Math.PI * 2);
    context.fillStyle = 'rgba(6, 182, 212, 0.8)';
    context.fill();
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      map: particleTexture,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create some floating DNA-like connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x1e3a8a, 
      transparent: true, 
      opacity: 0.15 
    });
    const lineGeometry = new THREE.BufferGeometry();
    // Connect some particles with lines
    const lineIndices = [];
    for(let i=0; i<particlesCount; i++) {
       // connect to next particle randomly to form loose strands
       if(Math.random() > 0.5 && i < particlesCount - 1) {
           lineIndices.push(i, i+1);
       }
    }
    lineGeometry.setIndex(lineIndices);
    lineGeometry.setAttribute('position', particlesGeometry.attributes.position);
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    camera.position.z = 5;

    // Mouse interaction for subtle movement
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Scroll interaction to merge lines effect
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', onScroll);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      particlesMesh.rotation.y += 0.001;
      particlesMesh.rotation.x += 0.0005;
      
      lineMesh.rotation.y += 0.001;
      lineMesh.rotation.x += 0.0005;

      // Subtle interaction based on mouse
      particlesMesh.rotation.x += 0.05 * (targetY - particlesMesh.rotation.x);
      particlesMesh.rotation.y += 0.05 * (targetX - particlesMesh.rotation.y);

      // Scroll effect: move camera slightly and change particle density visually
      camera.position.y = -scrollY * 0.001;
      
      // On scroll DNA lines opacity effect
      const scrollFactor = Math.min(scrollY / 1000, 1);
      lineMaterial.opacity = 0.15 + (scrollFactor * 0.2); // Lines become slightly more visible on scroll down

      renderer.render(scene, camera);
    };

    animate();

    // Responsive design
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('scroll', onScroll);
      mountRef.current?.removeChild(renderer.domElement);
      
      // Cleanup ThreeJS resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div id="bg-canvas" ref={mountRef} />;
}
