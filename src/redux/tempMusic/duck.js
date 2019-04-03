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
            title: `I Don't Know Why`,
            time: 190,
            levels: generateLevels(190),
            source: `${url}/Imagine Dragons - Evolve (2017)/01. I Don't Know Why.mp3`,
          },
          {
            title: `Whatever It Takes`,
            time: 211,
            levels: generateLevels(190),
            source: `${url}/Imagine Dragons - Evolve (2017)/02. Whatever It Takes.mp3`,
          },
          {
            title: `Believer`,
            time: 214,
            levels: generateLevels(214),
            source: `${url}/Imagine Dragons - Evolve (2017)/03. Believer.mp3`,
          },
          {
            title: `Walking The Wire`,
            time: 232,
            levels: generateLevels(232),
            source: `${url}/Imagine Dragons - Evolve (2017)/04. Walking The Wire.mp3`,
          },
          {
            title: `Rise Up`,
            time: 231,
            levels: generateLevels(231),
            source: `${url}/Imagine Dragons - Evolve (2017)/05. Rise Up.mp3`,
          },
          {
            title: `I'll Make It Up To You`,
            time: 262,
            levels: generateLevels(262),
            source: `${url}/Imagine Dragons - Evolve (2017)/06. I'll Make It Up To You.mp3`,
          },
          {
            title: `Yesterday`,
            time: 205,
            levels: generateLevels(205),
            source: `${url}/Imagine Dragons - Evolve (2017)/07. Yesterday.mp3`,
          },
          {
            title: `Mouth Of The River`,
            time: 221,
            levels: generateLevels(190),
            source: `${url}/Imagine Dragons - Evolve (2017)/08. Mouth Of The River.mp3`,
          },
          {
            title: `Thunder`,
            time: 187,
            levels: generateLevels(187),
            source: `${url}/Imagine Dragons - Evolve (2017)/09. Thunder.mp3`,
          },
          {
            title: `Start Over`,
            time: 186,
            levels: generateLevels(186),
            source: `${url}/Imagine Dragons - Evolve (2017)/10. Start Over.mp3`,
          },
          {
            title: `Dancing In The Dark`,
            time: 233,
            levels: generateLevels(233),
            source: `${url}/Imagine Dragons - Evolve (2017)/11. Dancing In The Dark.mp3`,
          },
          {
            title: `Levitate`,
            time: 198,
            levels: generateLevels(190),
            source: `${url}/Imagine Dragons - Evolve (2017)/12. Levitate.mp3`,
          },
          {
            title: `Not Today`,
            time: 268,
            levels: generateLevels(268),
            source: `${url}/Imagine Dragons - Evolve (2017)/13. Not Today.mp3`,
          },
          {
            title: `Believer (Kaskade Remix)`,
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
            title: `20th Century Fox Fanfare`,
            time: 25,
            levels: generateLevels(25),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/01. 20th Century Fox Fanfare.mp3`,
          },
          {
            title: `Somebody To Love.mp3`,
            time: 296,
            levels: generateLevels(296),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/02. Somebody To Love.mp3.mp3`,
          },
          {
            title: `Doing All Right (...Revisited)`,
            time: 197,
            levels: generateLevels(197),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/03. Doing All Right (...Revisited).mp3`,
          },
          {
            title: `Keep Yourself Alive (Live At The Rainbow)`,
            time: 236,
            levels: generateLevels(236),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/04. Keep Yourself Alive (Live At The Rainbow).mp3`,
          },
          {
            title: `Killer Queen`,
            time: 179,
            levels: generateLevels(179),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/05. Killer Queen.mp3`,
          },
          {
            title: `Fat Bottomed Girls (Live In Paris)`,
            time: 278,
            levels: generateLevels(278),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/06. Fat Bottomed Girls (Live In Paris).mp3`,
          },
          {
            title: `Bohemian Rhapsody`,
            time: 355,
            levels: generateLevels(355),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/07. Bohemian Rhapsody.mp3`,
          },
          {
            title: `Now I'm Here (Live At The Hammersmith Odeon)`,
            time: 266,
            levels: generateLevels(266),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/08. Now I'm Here (Live At The Hammersmith Odeon).mp3`,
          },
          {
            title: `Crazy Little Thing Called Love`,
            time: 163,
            levels: generateLevels(163),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/09. Crazy Little Thing Called Love.mp3`,
          },
          {
            title: `Love Of My Life (Live At Rock In Rio)`,
            time: 269,
            levels: generateLevels(269),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/10. Love Of My Life (Live At Rock In Rio).mp3`,
          },
          {
            title: `We Will Rock You (Movie Mix)`,
            time: 129,
            levels: generateLevels(129),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/11. We Will Rock You (Movie Mix).mp3`,
          },
          {
            title: `Another One Bites The Dust`,
            time: 215,
            levels: generateLevels(215),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/12. Another One Bites The Dust.mp3`,
          },
          {
            title: `I Want To Break Free`,
            time: 223,
            levels: generateLevels(223),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/13. I Want To Break Free.mp3`,
          },
          {
            title: `Under Pressure`,
            time: 244,
            levels: generateLevels(244),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/14. Under Pressure.mp3`,
          },
          {
            title: `Who Wants To Live Forever`,
            time: 315,
            levels: generateLevels(315),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/15. Who Wants To Live Forever.mp3`,
          },
          {
            title: `Bohemian Rhapsody (Live Aid)`,
            time: 148,
            levels: generateLevels(148),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/16. Bohemian Rhapsody (Live Aid).mp3`,
          },
          {
            title: `Radio Ga Ga (Live Aid)`,
            time: 246,
            levels: generateLevels(246),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/17. Radio Ga Ga (Live Aid).mp3`,
          },
          {
            title: `Ay-Oh (Live Aid)`,
            time: 41,
            levels: generateLevels(41),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/18. Ay-Oh (Live Aid).mp3`,
          },
          {
            title: `Hammer To Fall (Live Aid)`,
            time: 244,
            levels: generateLevels(244),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/19. Hammer To Fall (Live Aid).mp3`,
          },
          {
            title: `We Are The Champions (Live Aid)`,
            time: 237,
            levels: generateLevels(237),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/20. We Are The Champions (Live Aid).mp3`,
          },
          {
            title: `Don't Stop Me Now (...Revisited)`,
            time: 218,
            levels: generateLevels(218),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/21. Don't Stop Me Now (...Revisited).mp3`,
          },
          {
            title: `The Show Must Go On`,
            time: 272,
            levels: generateLevels(272),
            source: `${url}/Queen - Bohemian Rhapsody (The Original Soundtrack) 2018/22. The Show Must Go On.mp3`,
          },
        ],
      },
      {
        id: 2,
        album: 'Human',
        artist: `Rag'n'Bone Man`,
        artwork: `${url}/Rag-n-Bone Man - Human (2017)/cover.jpg`,
        totalTime: 2504,
        tracks: [
          {
            title: `Human`,
            time: 200,
            levels: generateLevels(200),
            source: `${url}/Rag-n-Bone Man - Human (2017)/01. Human.mp3`,
          },
          {
            title: `Innocent Man`,
            time: 186,
            levels: generateLevels(186),
            source: `${url}/Rag-n-Bone Man - Human (2017)/02. Innocent Man.mp3`,
          },
          {
            title: `Skin`,
            time: 239,
            levels: generateLevels(239),
            source: `${url}/Rag-n-Bone Man - Human (2017)/03. Skin.mp3`,
          },
          {
            title: `Bitter End`,
            time: 219,
            levels: generateLevels(219),
            source: `${url}/Rag-n-Bone Man - Human (2017)/04. Bitter End.mp3`,
          },
          {
            title: `Be The Man`,
            time: 194,
            levels: generateLevels(194),
            source: `${url}/Rag-n-Bone Man - Human (2017)/05. Be The Man.mp3`,
          },
          {
            title: `Love You Any Less`,
            time: 261,
            levels: generateLevels(261),
            source: `${url}/Rag-n-Bone Man - Human (2017)/06. Love You Any Less.mp3`,
          },
          {
            title: `Odetta`,
            time: 216,
            levels: generateLevels(216),
            source: `${url}/Rag-n-Bone Man - Human (2017)/07. Odetta.mp3`,
          },
          {
            title: `Grace`,
            time: 211,
            levels: generateLevels(211),
            source: `${url}/Rag-n-Bone Man - Human (2017)/08. Grace.mp3`,
          },
          {
            title: `Ego`,
            time: 197,
            levels: generateLevels(197),
            source: `${url}/Rag-n-Bone Man - Human (2017)/09. Ego.mp3`,
          },
          {
            title: `Arrow`,
            time: 201,
            levels: generateLevels(201),
            source: `${url}/Rag-n-Bone Man - Human (2017)/10. Arrow.mp3`,
          },
          {
            title: `As You Are`,
            time: 228,
            levels: generateLevels(228),
            source: `${url}/Rag-n-Bone Man - Human (2017)/11. As You Are.mp3`,
          },
          {
            title: `Die Easy`,
            time: 152,
            levels: generateLevels(152),
            source: `${url}/Rag-n-Bone Man - Human (2017)/12. Die Easy.mp3`,
          },
          {
            title: `The Fire`,
            time: 222,
            levels: generateLevels(222),
            source: `${url}/Rag-n-Bone Man - Human (2017)/13. The Fire.mp3`,
          },
          {
            title: `Fade To Nothing`,
            time: 222,
            levels: generateLevels(222),
            source: `${url}/Rag-n-Bone Man - Human (2017)/14. Fade To Nothing.mp3`,
          },
          {
            title: `Life In Her Yet`,
            time: 183,
            levels: generateLevels(183),
            source: `${url}/Rag-n-Bone Man - Human (2017)/15. Life In Her Yet.mp3`,
          },
          {
            title: `Your Way Or The Rope`,
            time: 204,
            levels: generateLevels(204),
            source: `${url}/Rag-n-Bone Man - Human (2017)/16. Your Way Or The Rope.mp3`,
          },
          {
            title: `Lay My Body Down`,
            time: 216,
            levels: generateLevels(216),
            source: `${url}/Rag-n-Bone Man - Human (2017)/17. Lay My Body Down.mp3`,
          },
          {
            title: `Wolves`,
            time: 175,
            levels: generateLevels(175),
            source: `${url}/Rag-n-Bone Man - Human (2017)/18. Wolves.mp3`,
          },
          {
            title: `Healed`,
            time: 176,
            levels: generateLevels(176),
            source: `${url}/Rag-n-Bone Man - Human (2017)/19. Healed.mp3`,
          },
        ],
      },
      {
        id: 3,
        album: 'Bon Scott Hits',
        artist: `AC/DC`,
        artwork: `${url}/ACDC - Bon Scott Hits (2015)/cover.jpg`,
        totalTime: 4260,
        tracks: [
          {
            title: `Rock 'n' Roll Damnation`,
            time: 216,
            levels: generateLevels(216),
            source: `${url}/ACDC - Bon Scott Hits (2015)/01 - Rock 'n' Roll Damnation.mp3`,
          },
          {
            title: `Touch Too Much`,
            time: 266,
            levels: generateLevels(266),
            source: `${url}/ACDC - Bon Scott Hits (2015)/02 - Touch Too Much.mp3`,
          },
          {
            title: `Rock 'n' Roll Singer`,
            time: 301,
            levels: generateLevels(301),
            source: `${url}/ACDC - Bon Scott Hits (2015)/03 - Rock 'n' Roll Singer.mp3`,
          },
          {
            title: `Jailbreak`,
            time: 277,
            levels: generateLevels(277),
            source: `${url}/ACDC - Bon Scott Hits (2015)/04 - Jailbreak.mp3`,
          },
          {
            title: `T.N.T.`,
            time: 212,
            levels: generateLevels(212),
            source: `${url}/ACDC - Bon Scott Hits (2015)/05 - T.N.T..mp3`,
          },
          {
            title: `Highway To Hell`,
            time: 208,
            levels: generateLevels(208),
            source: `${url}/ACDC - Bon Scott Hits (2015)/06 - Highway To Hell.mp3`,
          },
          {
            title: `Soul Stripper`,
            time: 384,
            levels: generateLevels(384),
            source: `${url}/ACDC - Bon Scott Hits (2015)/07 - Soul Stripper.mp3`,
          },
          {
            title: `It's  A Long Way To The Top (If You Wanna Rock 'n' Roll)`,
            time: 297,
            levels: generateLevels(297),
            source: `${url}/ACDC - Bon Scott Hits (2015)/09 - It's  A Long Way To The Top (If You Wanna Rock 'n' Roll).mp3`,
          },
          {
            title: `Dirty Deeds Done Dirt Cheap`,
            time: 229,
            levels: generateLevels(229),
            source: `${url}/ACDC - Bon Scott Hits (2015)/10 - Dirty Deeds Done Dirt Cheap.mp3`,
          },
          {
            title: `Walk All Over You`,
            time: 310,
            levels: generateLevels(310),
            source: `${url}/ACDC - Bon Scott Hits (2015)/11 - Walk All Over You.mp3`,
          },
          {
            title: `Love Hungry Man`,
            time: 255,
            levels: generateLevels(255),
            source: `${url}/ACDC - Bon Scott Hits (2015)/12 - Love Hungry Man.mp3`,
          },
          {
            title: `Gone Shootin'`,
            time: 297,
            levels: generateLevels(297),
            source: `${url}/ACDC - Bon Scott Hits (2015)/13 - Gone Shootin'.mp3`,
          },
          {
            title: `Squealer`,
            time: 310,
            levels: generateLevels(310),
            source: `${url}/ACDC - Bon Scott Hits (2015)/14 - Squealer.mp3`,
          },
          {
            title: `Problem Child`,
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
