import axios from 'axios'
import store from 'store'
import {hashHistory} from 'react-router'

axios.defaults.baseURL = 'http://localhost:8001/'

export function getData () {
  return axios.get('albums').then(function (resp) {
    store.dispatch({
      type: 'GET_ALBUMS',
      albums: resp.data
    })
  })
}

export function getAlbumData (id) {
  return axios.get(`albums/${id}`).then(function (resp) {
    store.dispatch({
      type: 'GET_ALBUM',
      currentAlbumLabel: resp.data.album_label
    })
  })
}

export function getPhotos (id) {
  return axios.get(`photos?albumId=${id}`).then(function (resp) {
    store.dispatch({
      type: 'GET_PHOTOS',
      photos: resp.data
    })
  })
}

export function getPhoto (id) {
  return axios.get(`photos/${id}`).then(function (resp) {
    store.dispatch({
      type: 'GET_PHOTO',
      currentPhoto: resp.data
    })
  })
}

export function addAlbum (obj) {
  return axios.post('albums', obj).then(function (resp) {
    hashHistory.push(`/newAlbum/${resp.data.id}`)
    console.log('addAlbum() axios.post')
    store.dispatch({
      type: 'ADD_ALBUM',
      album_label: resp.data.album_label,
      album_cover_pic: resp.data.album_cover_pic
    })
  })
}

export function updateAlbum (id, obj) {
  return axios.put(`albums/${id}`, obj).then(function (resp) {
    store.dispatch({
      type: 'UPDATE_ALBUM',
      album_label: resp.data.album_label,
      album_cover_pic: resp.data.album_cover_pic
    })
  })
}

export function addPhotos (obj) {
  return axios.post('photos', obj).then(function (resp) {
    hashHistory.push(`/gallery/${obj.albumId}`)
    store.dispatch({
      type: 'ADD_PHOTOS',
      url: resp.data.url,
      albumId: resp.data.albumId
    })
  })
}

export function deletePhoto (id, albumId) {
  return axios.delete(`photos/${id}`)
}

export function deleteAlbum (id) {
  return axios.delete(`albums/${id}`).then(resp => {
    getData()
  })
}
