import React from 'react';
import CBumImg from '../assets/cbum.jpeg';
import DavidImg from '../assets/dl.jpg';
import JeffImg from '../assets/js.jpg';
import KeiImg from '../assets/kieani.jpg';

const coaches = [
  {
    name: "Chris Bumstead",
    title: "5x Mr. Olympia Classic Physique",
    image: CBumImg,
  },
  {
    name: "David Laid",
    title: "Fitness Model & Influencer",
    image: DavidImg,
  },
  {
    name: "Jeff Seid",
    title: "IFBB Pro & Author",
    image: JeffImg,
  },
  {
    name: "Keinai Mabe",
    title: "Fitness Coach & Nutritionist",  
    image: KeiImg,
  },
];

const Coaches = () => (
  <div className="py-12 px-6 max-w-5xl mx-auto">
    <h2 className="text-3xl font-bold mb-6 text-center text-emerald-600 dark:text-emerald-400">Meet Your Fitness Mentors</h2>
    <div className="grid md:grid-cols-4 gap-6">
      {coaches.map((coach, idx) => (
        <div key={idx} className="bg-white dark:bg-gray-800 p-5 rounded-xl text-center shadow border dark:border-gray-700">
          <img
            src={coach.image}
            alt={coach.name}
            className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-emerald-500"
          />
          <h4 className="text-lg font-semibold mt-4">{coach.name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">{coach.title}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Coaches;
