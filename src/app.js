import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import 'assets/styles/style.css'

// Layouts
import Container from 'layouts/container'

// Content
import AlbumContainer from 'JS/albumContainer'
import GalleryContainer from 'JS/galleryContainer'
import PhotoContainer from 'JS/photoContainer'
import NewAlbumForm from 'JS/newAlbumForm'
import NewPhotoForm from 'JS/newPhotoForm'

ReactDOM.render((
  <Router history={hashHistory}>
    <Route component={Container}>
      <Route path='/' component={AlbumContainer} />
      <Route path='/gallery/:albumId' component={GalleryContainer} />
      <Route path='/gallery/photo/:photoId' component={PhotoContainer} />
      <Route path='/newAlbum/:id' component={NewAlbumForm} />
      <Route path='/gallery/:albumId/add' component={NewPhotoForm} />
    </Route>
  </Router>
), document.getElementById('app'))
