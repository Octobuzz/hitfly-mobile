import { handleActions } from 'redux-actions'

/* #region Action Types */

const generateLevels = time => {
  let levels = []
  for (let i = 0; i < time; i++) {
    levels.push(Math.trunc(Math.random() * 100) / 100)
  }
  return levels
}

const url = 'https://rejjer.io/music/albums'

const tempMusic = handleActions(
  {},
  {
    albums: [
      {
        id: 0,
        album: 'Evolve',
        artist: 'Imagine Dragons',
        artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
        totalTime: 2352,
        tracks: [
          {
            id: '0_0',
            title: "I Don't Know Why",
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 190,
            levels: generateLevels(190),
            source: `${url}/Imagine Dragons - Evolve (2017)/01. I Don't Know Why.mp3`,
          },
          {
            id: '0_1',
            title: 'Whatever It Takes',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 211,
            levels: generateLevels(190),
            source: `${url}/Imagine Dragons - Evolve (2017)/02. Whatever It Takes.mp3`,
          },
          {
            id: '0_2',
            title: 'Believer',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 214,
            levels: generateLevels(214),
            source: `${url}/Imagine Dragons - Evolve (2017)/03. Believer.mp3`,
          },
          {
            id: '0_3',
            title: 'Walking The Wire',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 232,
            levels: generateLevels(232),
            source: `${url}/Imagine Dragons - Evolve (2017)/04. Walking The Wire.mp3`,
          },
          {
            id: '0_4',
            title: 'Rise Up',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 231,
            levels: generateLevels(231),
            source: `${url}/Imagine Dragons - Evolve (2017)/05. Rise Up.mp3`,
          },
          {
            id: '0_5',
            title: "I'll Make It Up To You",
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 262,
            levels: generateLevels(262),
            source: `${url}/Imagine Dragons - Evolve (2017)/06. I'll Make It Up To You.mp3`,
          },
          {
            id: '0_6',
            title: 'Yesterday',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 205,
            levels: generateLevels(205),
            source: `${url}/Imagine Dragons - Evolve (2017)/07. Yesterday.mp3`,
          },
          {
            id: '0_7',
            title: 'Mouth Of The River',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 221,
            levels: generateLevels(190),
            source: `${url}/Imagine Dragons - Evolve (2017)/08. Mouth Of The River.mp3`,
          },
          {
            id: '0_8',
            title: 'Thunder',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 187,
            levels: generateLevels(187),
            source: `${url}/Imagine Dragons - Evolve (2017)/09. Thunder.mp3`,
          },
          {
            id: '0_9',
            title: 'Start Over',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 186,
            levels: generateLevels(186),
            source: `${url}/Imagine Dragons - Evolve (2017)/10. Start Over.mp3`,
          },
          {
            id: '0_10',
            title: 'Dancing In The Dark',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 233,
            levels: generateLevels(233),
            source: `${url}/Imagine Dragons - Evolve (2017)/11. Dancing In The Dark.mp3`,
          },
          {
            id: '0_11',
            title: 'Levitate',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 198,
            levels: generateLevels(190),
            source: `${url}/Imagine Dragons - Evolve (2017)/12. Levitate.mp3`,
          },
          {
            id: '0_12',
            title: 'Not Today',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 268,
            levels: generateLevels(268),
            source: `${url}/Imagine Dragons - Evolve (2017)/13. Not Today.mp3`,
          },
          {
            id: '0_13',
            title: 'Believer (Kaskade Remix)',
            artist: 'Imagine Dragons',
            artwork: `${url}/Imagine Dragons - Evolve (2017)/cover.jpg`,
            time: 194,
            levels: generateLevels(194),
            source: `${url}/Imagine Dragons - Evolve (2017)/14. Believer (Kaskade Remix).mp3`,
          },
        ],
      },
      {
        id: 1,
        album: 'Bohemian Rhapsody',
        artist: 'Queen',
        artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
        totalTime: 7484,
        tracks: [
          {
            id: '1_0',
            title: '20th Century Fox Fanfare',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 25,
            levels: generateLevels(25),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/01. 20th Century Fox Fanfare.mp3`,
          },
          {
            id: '1_1',
            title: 'Somebody To Love',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 296,
            levels: generateLevels(296),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/02. Somebody To Love.mp3`,
          },
          {
            id: '1_2',
            title: 'Doing All Right (...Revisited)',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 197,
            levels: generateLevels(197),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/03. Doing All Right (...Revisited).mp3`,
          },
          {
            id: '1_3',
            title: 'Keep Yourself Alive (Live At The Rainbow)',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 236,
            levels: generateLevels(236),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/04. Keep Yourself Alive (Live At The Rainbow).mp3`,
          },
          {
            id: '1_4',
            title: 'Killer Queen',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 179,
            levels: generateLevels(179),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/05. Killer Queen.mp3`,
          },
          {
            id: '1_5',
            title: 'Fat Bottomed Girls (Live In Paris)',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 278,
            levels: generateLevels(278),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/06. Fat Bottomed Girls (Live In Paris).mp3`,
          },
          {
            id: '1_6',
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 355,
            levels: generateLevels(355),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/07. Bohemian Rhapsody.mp3`,
          },
          {
            id: '1_7',
            title: "Now I'm Here (Live At The Hammersmith Odeon)",
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 355,
            levels: generateLevels(355),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/08. Now I'm Here (Live At The Hammersmith Odeon).mp3`,
          },
          {
            id: '1_8',
            title: 'Crazy Little Thing Called Love',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 163,
            levels: generateLevels(163),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/09. Crazy Little Thing Called Love.mp3`,
          },
          {
            id: '1_9',
            title: 'Love Of My Life (Live At Rock In Rio)',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 269,
            levels: generateLevels(269),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/10. Love Of My Life (Live At Rock In Rio).mp3`,
          },
          {
            id: '1_10',
            title: 'We Will Rock You (Movie Mix)',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 129,
            levels: generateLevels(129),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/11. We Will Rock You (Movie Mix).mp3`,
          },
          {
            id: '1_11',
            title: 'Another One Bites The Dust',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 215,
            levels: generateLevels(215),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/12. Another One Bites The Dust.mp3`,
          },
          {
            id: '1_12',
            title: 'I Want To Break Free',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 223,
            levels: generateLevels(223),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/13. I Want To Break Free.mp3`,
          },
          {
            id: '1_13',
            title: 'Under Pressure',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 244,
            levels: generateLevels(244),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/14. Under Pressure.mp3`,
          },
          {
            id: '1_14',
            title: 'Who Wants To Live Forever',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 315,
            levels: generateLevels(315),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/15. Who Wants To Live Forever.mp3`,
          },
          {
            id: '1_15',
            title: 'Bohemian Rhapsody (Live Aid)',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 148,
            levels: generateLevels(148),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/16. Bohemian Rhapsody (Live Aid).mp3`,
          },
          {
            id: '1_17',
            title: 'Radio Ga Ga (Live Aid)',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 246,
            levels: generateLevels(246),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/17. Radio Ga Ga (Live Aid).mp3`,
          },
          {
            id: '1_18',
            title: 'Ay-Oh (Live Aid)',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 41,
            levels: generateLevels(41),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/18. Ay-Oh (Live Aid).mp3`,
          },
          {
            id: '1_19',
            title: 'Hammer To Fall (Live Aid)',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 244,
            levels: generateLevels(244),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/19. Hammer To Fall (Live Aid).mp3`,
          },
          {
            id: '1_20',
            title: 'We Are The Champions (Live Aid)',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 237,
            levels: generateLevels(237),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/20. We Are The Champions (Live Aid).mp3`,
          },
          {
            id: '1_21',
            title: "Don't Stop Me Now (...Revisited)",
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 218,
            levels: generateLevels(218),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/21. Don't Stop Me Now (...Revisited).mp3`,
          },
          {
            id: '1_22',
            title: 'The Show Must Go On',
            artist: 'Queen',
            artwork: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/cover.jpg`,
            time: 272,
            levels: generateLevels(272),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/22. The Show Must Go On.mp3`,
          },
        ],
      },
      {
        id: 2,
        album: 'Human',
        artist: "Rag'n'Bone Man",
        artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
        totalTime: 2504,
        tracks: [
          {
            id: '2_0',
            title: 'Human',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 200,
            levels: generateLevels(200),
            source: `${url}/Rag-n-Bone Man - Human (2017)/01. Human.mp3`,
          },
          {
            id: '2_1',
            title: 'Innocent Man',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 186,
            levels: generateLevels(186),
            source: `${url}/Rag-n-Bone Man - Human (2017)/02. Innocent Man.mp3`,
          },
          {
            id: '2_2',
            title: 'Skin',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 239,
            levels: generateLevels(239),
            source: `${url}/Rag-n-Bone Man - Human (2017)/03. Skin.mp3`,
          },
          {
            id: '2_3',
            title: 'Bitter End',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 219,
            levels: generateLevels(219),
            source: `${url}/Rag-n-Bone Man - Human (2017)/04. Bitter End.mp3`,
          },
          {
            id: '2_4',
            title: 'Be The Man',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 194,
            levels: generateLevels(194),
            source: `${url}/Rag-n-Bone Man - Human (2017)/05. Be The Man.mp3`,
          },
          {
            id: '2_5',
            title: 'Love You Any Less',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 261,
            levels: generateLevels(261),
            source: `${url}/Rag-n-Bone Man - Human (2017)/06. Love You Any Less.mp3`,
          },
          {
            id: '2_6',
            title: 'Odetta',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 216,
            levels: generateLevels(216),
            source: `${url}/Rag-n-Bone Man - Human (2017)/07. Odetta.mp3`,
          },
          {
            id: '2_7',
            title: 'Grace',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 211,
            levels: generateLevels(211),
            source: `${url}/Rag-n-Bone Man - Human (2017)/08. Grace.mp3`,
          },
          {
            id: '2_8',
            title: 'Ego',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 197,
            levels: generateLevels(197),
            source: `${url}/Rag-n-Bone Man - Human (2017)/09. Ego.mp3`,
          },
          {
            id: '2_9',
            title: 'Arrow',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 201,
            levels: generateLevels(201),
            source: `${url}/Rag-n-Bone Man - Human (2017)/10. Arrow.mp3`,
          },
          {
            id: '2_10',
            title: 'As You Are',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 228,
            levels: generateLevels(228),
            source: `${url}/Rag-n-Bone Man - Human (2017)/11. As You Are.mp3`,
          },
          {
            id: '2_11',
            title: 'Die Easy',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 152,
            levels: generateLevels(152),
            source: `${url}/Rag-n-Bone Man - Human (2017)/12. Die Easy.mp3`,
          },
          {
            id: '2_12',
            title: 'The Fire',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 222,
            levels: generateLevels(222),
            source: `${url}/Rag-n-Bone Man - Human (2017)/13. The Fire.mp3`,
          },
          {
            id: '2_13',
            title: 'Fade To Nothing',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 222,
            levels: generateLevels(222),
            source: `${url}/Rag-n-Bone Man - Human (2017)/14. Fade To Nothing.mp3`,
          },
          {
            id: '2_14',
            title: 'Life In Her Yet',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 183,
            levels: generateLevels(183),
            source: `${url}/Rag-n-Bone Man - Human (2017)/15. Life In Her Yet.mp3`,
          },
          {
            id: '2_15',
            title: 'Your Way Or The Rope',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 204,
            levels: generateLevels(204),
            source: `${url}/Rag-n-Bone Man - Human (2017)/16. Your Way Or The Rope.mp3`,
          },
          {
            id: '2_16',
            title: 'Lay My Body Down',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 216,
            levels: generateLevels(216),
            source: `${url}/Rag-n-Bone Man - Human (2017)/17. Lay My Body Down.mp3`,
          },
          {
            id: '2_17',
            title: 'Wolves',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 175,
            levels: generateLevels(175),
            source: `${url}/Rag-n-Bone Man - Human (2017)/18. Wolves.mp3`,
          },
          {
            id: '2_18',
            title: 'Healed',
            artist: "Rag'n'Bone Man",
            artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
            time: 176,
            levels: generateLevels(176),
            source: `${url}/Rag-n-Bone Man - Human (2017)/19. Healed.mp3`,
          },
        ],
      },
      {
        id: 3,
        album: 'Bon Scott Hits',
        artist: 'AC/DC',
        artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
        totalTime: 4260,
        tracks: [
          {
            id: '3_0',
            title: "Rock 'n' Roll Damnation",
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 216,
            levels: generateLevels(216),
            source: `${url}/ACDC - Bon Scott Hits (2015)/01 - Rock 'n' Roll Damnation.mp3`,
          },
          {
            id: '3_1',
            title: 'Touch Too Much',
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 266,
            levels: generateLevels(266),
            source: `${url}/ACDC - Bon Scott Hits (2015)/02 - Touch Too Much.mp3`,
          },
          {
            id: '3_2',
            title: "Rock 'n' Roll Singer",
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 301,
            levels: generateLevels(301),
            source: `${url}/ACDC - Bon Scott Hits (2015)/03 - Rock 'n' Roll Singer.mp3`,
          },
          {
            id: '3_3',
            title: 'Jailbreak',
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 277,
            levels: generateLevels(277),
            source: `${url}/ACDC - Bon Scott Hits (2015)/04 - Jailbreak.mp3`,
          },
          {
            id: '3_4',
            title: 'T.N.T.',
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 212,
            levels: generateLevels(212),
            source: `${url}/ACDC - Bon Scott Hits (2015)/05 - T.N.T..mp3`,
          },
          {
            id: '3_5',
            title: 'Highway To Hell',
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 208,
            levels: generateLevels(208),
            source: `${url}/ACDC - Bon Scott Hits (2015)/06 - Highway To Hell.mp3`,
          },
          {
            id: '3_6',
            title: 'Soul Stripper',
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 384,
            levels: generateLevels(384),
            source: `${url}/ACDC - Bon Scott Hits (2015)/07 - Soul Stripper.mp3`,
          },
          {
            id: '3_7',
            title: "It's  A Long Way To The Top (If You Wanna Rock 'n' Roll)",
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 297,
            levels: generateLevels(297),
            source: `${url}/ACDC - Bon Scott Hits (2015)/09 - It's  A Long Way To The Top (If You Wanna Rock 'n' Roll).mp3`,
          },
          {
            id: '3_8',
            title: 'Dirty Deeds Done Dirt Cheap',
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 229,
            levels: generateLevels(229),
            source: `${url}/ACDC - Bon Scott Hits (2015)/10 - Dirty Deeds Done Dirt Cheap.mp3`,
          },
          {
            id: '3_9',
            title: 'Walk All Over You',
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 310,
            levels: generateLevels(310),
            source: `${url}/ACDC - Bon Scott Hits (2015)/11 - Walk All Over You.mp3`,
          },
          {
            id: '3_10',
            title: 'Love Hungry Man',
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 255,
            levels: generateLevels(255),
            source: `${url}/ACDC - Bon Scott Hits (2015)/12 - Love Hungry Man.mp3`,
          },
          {
            id: '3_11',
            title: "Gone Shootin'",
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 297,
            levels: generateLevels(297),
            source: `${url}/ACDC - Bon Scott Hits (2015)/13 - Gone Shootin'.mp3`,
          },
          {
            id: '3_12',
            title: 'Squealer',
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 310,
            levels: generateLevels(310),
            source: `${url}/ACDC - Bon Scott Hits (2015)/14 - Squealer.mp3`,
          },
          {
            id: '3_13',
            title: 'Problem Child',
            artist: 'AC/DC',
            artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
            time: 326,
            levels: generateLevels(326),
            source: `${url}/ACDC - Bon Scott Hits (2015)/15 - Problem Child.mp3`,
          },
        ],
      },
    ],
  },
)

/* #endregion */

export default tempMusic
