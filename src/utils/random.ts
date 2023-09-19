const videos = [
  'https://upload.wikimedia.org/wikipedia/commons/e/eb/Wmhack_2021_trailer.webm',
  'https://upload.wikimedia.org/wikipedia/commons/1/11/A_2011_Motion_Christmas.webm',
  'https://upload.wikimedia.org/wikipedia/commons/f/f2/02_TimeLapse_-_Ex_Ospedale_Sant%27Agostino_-_Modena.webm',
  'https://upload.wikimedia.org/wikipedia/commons/5/5c/Garlic_peeler.webm',
  'https://upload.wikimedia.org/wikipedia/commons/a/a6/Gatteville_lighthouse%2C_Gatteville-le-Phare_-_aerial_view_-_short_version.webm',
  'https://upload.wikimedia.org/wikipedia/commons/d/dd/Taubenbrunnen_K%C3%B6ln.webm',
  'https://upload.wikimedia.org/wikipedia/commons/6/61/Miejscu-pracy-koparka-budowlanych-3741.webm',
  'https://upload.wikimedia.org/wikipedia/commons/8/82/Circular_panoramic_view_of_the_Champs_de_Mars_-_Palace_of_Electricity.ogv',
]

export const getRandomVideo = () => {
  const index = Math.floor(Math.random() * (videos.length - 1))
  return videos[index]
}

export const randomImage = {
  'background-image': 'url(\'https://source.unsplash.com/random\')',
  'background-size': 'cover',
  'background-position': 'center',
}

