import React from 'react';

const SimbolismoTab = () => {
  const simbolismo = [
    {
      symbol: 'Punong Higera',
      meaning: 'Simbolo ng pagkakagapos at kawalang-katarungan'
    },
    {
      symbol: 'Pagluha ni Florante',
      meaning: 'Sumasagisag sa paninibugho, pagdurusa, at pangungulila'
    },
    {
      symbol: 'Alingawngaw ng kalikasan',
      meaning: 'Pahiwatig ng pag-uulit ng kasamaan at kirot ng alaala'
    }
  ];

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold text-indigo-100 mb-6">Simbolismo</h2>
      <div className="space-y-4">
        {simbolismo.map((item, index) => (
          <div key={index} className="bg-indigo-900/50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-indigo-200 mb-2">{item.symbol}</h3>
            <p className="text-indigo-100">{item.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimbolismoTab; 