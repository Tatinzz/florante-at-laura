import React from 'react';

const NilamanTab = () => {
  const nilalaman = [
    'Paglalarawan sa kalunos-lunos na kalagayan ni Florante',
    'Paggunita sa kanyang kabataan at kasaysayang nagbunsod sa pagkakagapos',
    'Pagpapahiwatig ng pagtataksil na kanyang naranasan',
    'Tema ng kawalang-katarungan, pananampalataya, at pag-asa'
  ];

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold text-indigo-100 mb-6">Nilalaman</h2>
      <div className="space-y-4">
        {nilalaman.map((item, index) => (
          <div key={index} className="bg-indigo-900/50 p-4 rounded-lg">
            <p className="text-indigo-100">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NilamanTab; 