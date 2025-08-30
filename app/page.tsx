"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Particles from "./components/particles";
import { Card } from "./components/card";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setShowNavbar(window.scrollY > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Sticky Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-lg font-semibold text-zinc-100 hover:text-white transition-colors">
                Talha Amir
              </Link>
              <ul className="flex items-center gap-6">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm duration-300 text-zinc-400 hover:text-zinc-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Particles for entire page */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <nav className="my-16 animate-fade-in">
          <ul className="flex items-center justify-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        
        <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
          Talha Amir
        </h1>

        <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        <div className="my-16 text-center animate-fade-in">
          <h2 className="text-sm text-zinc-500 ">
            Passionate about embedded systems, AI, and building technology with real-world impact.
          </h2>
        </div>
      </div>

      {/* Education Section */}
      <div className="relative py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Education
            </h2>
            <div className="w-24 h-px bg-zinc-500 mx-auto mt-4"></div>
          </div>
          
          <Card>
            <div className="p-8">
              <div className="flex items-center gap-6">
                <div className="flex-shrink-0">
                  <img src="/uw-logo.png" alt="University of Waterloo" className="w-20 h-20 object-contain" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-zinc-500 text-sm mb-1">
                        2022 - 2027
                      </p>
                      <h3 className="text-xl font-semibold text-zinc-100">
                        Computer Engineering
                      </h3>
                      <p className="text-zinc-400 mt-1">
                        Bachelor of Applied Science (BASc) • University of Waterloo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Experience Section */}
      <div className="relative py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Experience
            </h2>
            <div className="w-24 h-px bg-zinc-500 mx-auto mt-4"></div>
          </div>
          
          <div className="space-y-6">
            <Card>
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <img src="/opal-logo.png" alt="Opal" className="w-20 h-20 object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-zinc-500 text-sm">
                            Jul - Aug 2024
                          </p>
                          <p className="text-zinc-500 text-sm">
                            San Francisco, CA
                          </p>
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-100">
                          Software QA
                        </h3>
                        <p className="text-zinc-400 mt-1">
                          Opal Camera
                        </p>
                        <ul className="text-zinc-500 text-sm mt-2 space-y-1">
                          <li>• Designed and executed test plans to validate backend systems built in Python and C++, ensuring reliable communication with connected devices</li>
                          <li>• Performed cloud-based testing across AWS and GCP deployments, validating scalability, availability, and fault tolerance of backend services</li>
                          <li>• Contributed to Python automation scripts to streamline regression testing of backend APIs and device communication workflows</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <img src="/monogram-logo.png" alt="Monogram" className="w-20 h-20 object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-zinc-500 text-sm">
                            Sep - Dec 2023
                          </p>
                          <p className="text-zinc-500 text-sm">
                            Kitchener, ON
                          </p>
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-100">
                          Software Engineer Intern
                        </h3>
                        <p className="text-zinc-400 mt-1">
                          Monogram
                        </p>
                        <ul className="text-zinc-500 text-sm mt-2 space-y-1">
                          <li>• Developed features for the Monogram Creative Console desktop app using TypeScript, C++, Qt, and QML across Mac and Windows platforms</li>
                          <li>• Implemented a copy/paste module assignment system that improved user workflows and satisfaction</li>
                          <li>• Leveraged Git for version control and contributed to agile sprint cycles, participating in issue tracking and prioritization</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

}
