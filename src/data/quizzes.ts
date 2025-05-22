import { Quiz } from '../types';

export const quizzes: Quiz[] = [
  {
    id: 1,
    chapterId: 1,
    type: 'bokabularyo',
    title: 'Bokabularyo: Unang Kabanata',
    questions: [
      {
        id: 1,
        text: 'Ano ang kahulugan ng salitang mapanglaw?',
        options: ['masalimuot na gubat', 'malagim o malungkot', 'madilim na tanawin', 'maraming tinik'],
        correctAnswer: 1
      },
      {
        id: 2,
        text: 'Alin sa mga sumusunod ang naglalarawan sa salitang masukal?',
        options: ['maraming punong kahoy', 'madalas daanan ng hayop', 'maraming matatayog na damo', 'lupang walang patanim'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 2,
    chapterId: 1,
    type: 'nilalaman',
    title: 'Nilalaman: Unang Kabanata',
    questions: [
      {
        id: 1,
        text: 'Ano ang pangunahing inilarawan sa Kabanata 1 ng Florante at Laura?',
        options: ['Ang madilim at masukal na kagubatan', 'Ang palasyo ni Florante', 'Ang bundok sa Albanya', 'Ang tabing-dagat ng Albanya'],
        correctAnswer: 0
      },
      {
        id: 2,
        text: 'Bakit sinasabing napakadilim ng gubat sa unang kabanata?',
        options: ['Dahil gabi na at wala ng buwan', 'Dahil masikip at makapal ang dahon at sanga ng mga puno', 'Dahil nilamon ng apoy ang liwanag', 'Dahil umuulan ng malakas'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    chapterId: 1,
    type: 'simbolismo',
    title: 'Simbolismo: Unang Kabanata',
    questions: [
      {
        id: 1,
        text: 'Ano ang simbolismo ng madilim na kagubatan sa unang kabanata?',
        options: ['Kagandahan ng kalikasan', 'Kapayapaan at pag-asa', 'Mga pagsubok at panganib', 'Kalayaan at ligaya'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 4,
    chapterId: 2,
    type: 'bokabularyo',
    title: 'Bokabularyo: Kabanata 2',
    questions: [
      {
        id: 1,
        text: 'Ano ang ibig sabihin ng "alingawngaw"?',
        options: ['Malakas na hangin', 'Balik ng tunog; echo', 'Sigaw ng tao', 'Tunog ng hayop'],
        correctAnswer: 1
      },
      {
        id: 2,
        text: 'Ano ang kahulugan ng "mapanglaw"?',
        options: ['Masaya ang damdamin', 'Malungkot o madilim ang damdamin', 'Galit na damdamin', 'Walang damdamin'],
        correctAnswer: 1
      },
      {
        id: 3,
        text: 'Ano ang ibig sabihin ng "panibugho"?',
        options: ['Katapatan', 'Matinding selos', 'Paghanga', 'Kabaitan'],
        correctAnswer: 1
      },
      {
        id: 4,
        text: 'Ano ang kahulugan ng "lupig"?',
        options: ['Mananalo', 'Talunan o napasailalim', 'Kalaban', 'Kaibigan'],
        correctAnswer: 1
      },
      {
        id: 5,
        text: 'Ano ang ibig sabihin ng "marawal"?',
        options: ['Masaya', 'Kaawa-awa o kahiya-hiya', 'Maganda', 'Matapang'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 5,
    chapterId: 2,
    type: 'nilalaman',
    title: 'Nilalaman: Kabanata 2',
    questions: [
      {
        id: 1,
        text: 'Ano ang pangunahing tema ng kabanatang ito?',
        options: [
          'Ang kagandahan ng kalikasan',
          'Ang kalunos-lunos na kalagayan ni Florante',
          'Ang kasayahan ng pag-ibig',
          'Ang tagumpay sa digmaan'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        text: 'Ano ang isa sa mga pangunahing paksa ng kabanata?',
        options: [
          'Ang kasiyahan ni Florante',
          'Ang kanyang kabataan at kasaysayang nagbunsod sa pagkakagapos',
          'Ang kanyang tagumpay sa digmaan',
          'Ang kanyang paglalakbay'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        text: 'Alin sa mga sumusunod ang HINDI tema ng kabanatang ito?',
        options: [
          'Kawalang-katarungan',
          'Pananampalataya',
          'Pag-asa',
          'Kasiyahan'
        ],
        correctAnswer: 3
      }
    ]
  },
  {
    id: 6,
    chapterId: 2,
    type: 'simbolismo',
    title: 'Simbolismo: Kabanata 2',
    questions: [
      {
        id: 1,
        text: 'Ano ang sinisimbolo ng punong higera?',
        options: [
          'Kalayaan at kaginhawahan',
          'Pagkakagapos at kawalang-katarungan',
          'Pag-asa at pagmamahal',
          'Tagumpay at kasaganaan'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        text: 'Ano ang sinisimbolo ng pagluha ni Florante?',
        options: [
          'Kasiyahan at pag-ibig',
          'Paninibugho, pagdurusa, at pangungulila',
          'Galit at paghihiganti',
          'Pag-asa at pangarap'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        text: 'Ano ang isinisimbolo ng alingawngaw ng kalikasan?',
        options: [
          'Kasiyahan ng mundo',
          'Pag-uulit ng kasamaan at kirot ng alaala',
          'Kagandahan ng kapaligiran',
          'Kalungkutan ng mga hayop'
        ],
        correctAnswer: 1
      }
    ]
  }
];