import { useState } from 'react'
import FloorTest from '../assets/floortest.svg'
import EditorCanvas from './EditorCanvas'
import Wall from '../Wall'
import { dist } from '../util'

export default function LineEditor() {
    const [walls, setWalls] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [selectedKey, setSelectedKey] = useState()

    const getCoords = (e) => {
        // https://stackoverflow.com/a/42111623/10666216
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left; //x position within the element.
        let y = e.clientY - rect.top;  //y position within the element.
        return [x,y]
    }

    const handleMouseUp = (e) => {
        console.log('mouseup')
        const lastWall = walls[walls.length-1]
        if (lastWall.length() < 10) {
            // click
            setWalls(walls.filter(wall => wall.key != lastWall.key))
            const mouse = getCoords(e)
            let minDist = 0
            let closestKey = null
            walls.forEach(wall => {
                if (wall.key != lastWall.key) {
                    const mouseDist = dist(mouse, wall.midPoint())
                    if (mouseDist < minDist || closestKey==null) {
                        closestKey = wall.key
                        minDist = mouseDist
                    }
                }
            })
            setSelectedKey(closestKey)
        }
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (isDragging) {
            setWalls(walls.map((wall, i) => {
                if (i == walls.length-1) {
                    let draggedWall = wall.copy()
                    draggedWall.end = getCoords(e)
                    return draggedWall
                } else {
                    return wall
                }
            }))
        }
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
        const coords = getCoords(e)
        setWalls(walls => [...walls, new Wall(coords, coords)])
    }

    const selectedWall = () => {
        return walls.find(w => w.key == selectedKey)
    }

    const deleteSelected = (e) => {
        e.stopPropagation()
        setWalls(walls.filter(w => w.key != selectedKey))
        setSelectedKey()
    }

    return (
        <div 
            onMouseDown={handleMouseDown} 
            onMouseUp={handleMouseUp} 
            onMouseMove={handleMouseMove} 
            className="h-[500px] w-[500px] flex relative"
        >
            <EditorCanvas w={500} h={500} walls={walls} selectedKey={selectedKey} />
            <img className="flex-1" src={FloorTest} />
            { selectedKey &&
                <button
                    style={{ 
                        left: selectedWall().midPoint()[0],
                        top: selectedWall().midPoint()[1],
                    }}
                    onMouseUp={deleteSelected} 
                    onMouseDown={e => e.stopPropagation()}
                    className='absolute bg-red-600 text-white p-1 rounded'
                >
                    Delete
                </button>
            }
        </div>
    )
}
