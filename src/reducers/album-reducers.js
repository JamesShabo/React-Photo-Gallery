const DefaultState = {
  albums: [],
  currentAlbumLabel: '',
  photos: [],
  currentPhoto: '',
  currentPhotoId: ''
}

export default function (state = DefaultState, action) {
  switch (action.type) {
    case 'GET_ALBUMS':
      return {...state, albums: action.albums}

    case 'GET_ALBUM':
      return {...state, currentAlbumLabel: action.currentAlbumLabel}

    case 'GET_PHOTOS':
      return {...state, photos: action.photos}

    case 'GET_PHOTO':
      return {...state, currentPhoto: action.currentPhoto, currentPhotoId: action.currentPhotoId}

    default:
      return state

  }
}
