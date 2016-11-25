import React from 'react'
import { Link } from 'react-router'
import { getData, addAlbum, deleteAlbum } from 'apis/api'
import store from 'store'

const AlbumsContainerData = React.createClass({
  getInitialState: function () {
    return {
      albums: []
    }
  },

  componentWillMount: function () {
    getData()

    this.unsubscribe = store.subscribe(() => {
      const appState = store.getState()
      this.setState({
        albums: appState.albums
      })
    })
  },

  componentWillUnmount: function () {
    this.unsubscribe()
  },

  render: function () {
    return (
      <AlbumsLayout albums={this.state.albums} />
    )
  }
})

const AlbumsLayout = React.createClass({
  addAlbum: function () {
    var obj = {
      albumId: '',
      coverphoto: ''
    }

    addAlbum(obj)
  },

  deleteAlbum: function (e) {
    var id = e.target.id
    deleteAlbum(id)
  },

  render: function () {
    return (
      <div id='albumsContainer'>
        <div id='albumHeader'>Jason's Photo Album</div>
        <div id='albumContainer'>
          <div className='albumRow'>
            {this.props.albums.map(item => {
              return (
                <div key={'album' + item.id} className='relative'>
                  <Link key={'album' + item.id} to={'/gallery/' + item.id}>
                    <div key={'album' + item.id} className='albumThumb'>
                      <img src={item.coverphoto} />
                      <div className='albumFooter'>{item.name}</div>
                    </div>
                  </Link>
                  <div id={item.id} onClick={this.deleteAlbum} className='deleteButton'>delete album</div>
                </div>
              )
            })}
          </div>
        </div>
        <a><div onClick={() => this.addAlbum()} className='addButton'>Add Album</div></a>
      </div>
    )
  }
})
export default AlbumsContainerData
