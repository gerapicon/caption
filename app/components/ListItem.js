import "./ListItem.scss"
import React, {Component} from 'react'
import {shell} from 'electron'
import Loading from './Loading'
import {humanFileSize} from '../scripts/Utility'

export default class ListItem extends Component {
    constructor(props) {
        super(props)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
    }

    handleDoubleClick() {
        const {item} = this.props

        if (item.MovieReleaseName) {
            window.location.assign(item.ZipDownloadLink)
        }
        else {
            const extention = item.path.substr(item.path.lastIndexOf('.') + 1)
            if (extention === 'mp4' || extention === 'mkv') {
                shell.openItem(item.path)
            }
            else {
                shell.showItemInFolder(item.path)
            }
        }
    }

    render() {
        let title
        let status
        const {handleClick, item, selected, index} = this.props

        // Title is the name of the subtitle files (movie release name)
        if (item.MovieReleaseName) {
            title = item.MovieReleaseName
        }
        // Title is the name of the dropped files
        else {
            title = item.name
        }

        // Check status of file
        if (item.status === 'done') {
            status = <span className='status'>√</span>
        }
        else if (item.status === 'failed') {
            status = <span className='status'>x</span>
        }
        else if (item.status === 'loading') {
            status = <Loading small={true} />
        }
        else {
            status = ''
        }

        return (
            <li className={`list-item ${index == selected ? 'selected' : ''}`} onClick={handleClick} onDoubleClick={this.handleDoubleClick}>
                {title}
                {item.size &&
                    <span className='size'>{humanFileSize(item.size, true)}</span>
                }
                {status}
            </li>
        )
    }

}
