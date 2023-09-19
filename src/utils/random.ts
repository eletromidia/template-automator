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
  'background-image': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='680.764' height='528.354' viewBox='0 0 180.119 139.794'%3E%3Cg transform='translate(-13.59 -66.639)' paint-order='fill markers stroke'%3E%3Cpath fill='%23d0d0d0' d='M13.591 66.639H193.71v139.794H13.591z'/%3E%3Cpath d='m118.507 133.514-34.249 34.249-15.968-15.968-41.938 41.937H178.726z' opacity='.675' fill='%23fff'/%3E%3Ccircle cx='58.217' cy='108.555' r='11.773' opacity='.675' fill='%23fff'/%3E%3Cpath fill='none' d='M26.111 77.634h152.614v116.099H26.111z'/%3E%3C/g%3E%3C/svg%3E\")",
  'background-position': 'center',
  'background-size': 'cover',
}

