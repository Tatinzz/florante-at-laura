import React from 'react';

const BokabularyoTab = () => {
  const bokabularyo = [
    {
      word: 'Higera',
      meaning: 'Isang uri ng puno na matatagpuan sa gubat'
    },
    {
      word: 'Paghihinagpis',
      meaning: 'Matinding kalungkutan o pagdadalamhati'
    },
    {
      word: 'Nagdadalamhati',
      meaning: 'Nasa matinding kalungkutan o pagdurusa'
    },
    {
      word: 'Mapait',
      meaning: 'Hindi kanais-nais na karanasan o pangyayari'
    },
    {
      word: 'Inggit',
      meaning: 'Pagnanasa sa bagay o katangian ng iba; pagkainggit'
    },
    {
      word: 'Kasamaan',
      meaning: 'Masamang gawa o intensyon; kabuktutan'
    },
    {
      word: 'Albanya',
      meaning: 'Lugar kung saan nanggaling si Florante'
    }
  ];

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold text-indigo-100 mb-6">Bokabularyo</h2>
      <div className="space-y-4">
        {bokabularyo.map((item, index) => (
          <div key={index} className="bg-indigo-900/50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-indigo-200 mb-2">{item.word}</h3>
            <p className="text-indigo-100">{item.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BokabularyoTab; 