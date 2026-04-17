import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import MissionVision from '../components/MissionVision';
import WhyChooseUs from '../components/WhyChooseUs';
import Products from '../components/Products';
import BoardMembers from '../components/BoardMembers';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';

export default function Home() {
  return (
    <>
      <section id="home"><Hero /></section>
      <section id="clients"><Clients /></section>
      <section id="about"><About /></section>
      <section id="mission-vision"><MissionVision /></section>
      <section id="why-choose-us"><WhyChooseUs /></section>
      <section id="products"><Products /></section>
      <section id="testimonials"><Testimonials /></section>
      <section id="board"><BoardMembers /></section>
    </>
  );
}
