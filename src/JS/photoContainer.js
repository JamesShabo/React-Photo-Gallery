import React from 'react'
import { Link, hashHistory } from 'react-router'
import store from 'store'
import { getPhoto, deletePhoto } from 'apis/api'

const PhotoContainer = React.createClass({
  getInitialState: function () {
    return {
      currentPhoto: '',
      currentPhotoId: '',
      albumId: ''
    }
  },

  componentWillMount: function () {
    getPhoto(this.props.params.photoId)
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        currentPhoto: store.getState().currentPhoto.url,
        currentPhotoId: store.getState().currentPhoto.id,
        albumId: store.getState().currentPhoto.albumId
      })
    })
  },

  componentWillUnmount: function () {
    this.unsubscribe()
  },

  render: function () {
    return (
      <CurrentPhoto currentPhoto={this.state.currentPhoto} currentPhotoId={this.state.currentPhotoId} albumId={this.state.albumId} />
    )
  }
})

const CurrentPhoto = React.createClass({
  goBack: function (e) {
    e.preventDefault()
    hashHistory.goBack()
  },

  deletePhoto: function (e) {
    console.log('albumId props', this.props.albumId)
    var id = e.target.id
    deletePhoto(id, this.props.albumId).then(resp => {
      hashHistory.push(`/gallery/${this.props.albumId}`)
    })
  },

  render: function () {
    return (
      <div id='photoContainer' className='relative'>
        <div id='photoContainerHeader'>Photo #{this.props.currentPhotoId}</div>
        <div id='photo'><img src={this.props.currentPhoto} /></div>
        <button id='goBackphoto' onClick={this.goBack}>Back</button>
        <div id={this.props.currentPhotoId} onClick={this.deletePhoto} className='photoContainerDeletePhoto'>Delete Photo</div>

      </div>
    )
  }
})

export default PhotoContainer
