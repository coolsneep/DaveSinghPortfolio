import React, { useEffect, useRef } from 'react'
import { useTrail, animated } from '@react-spring/web'

import styles from './Blob.module.css'

interface BlobProps {
  // Define props if any
}

const fast = { tension: 1200, friction: 40 }
const slow = { mass: 10, tension: 200, friction: 50 }
const trans = (x: number, y: number) =>
  `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`

const Blob: React.FC<BlobProps> = (props) => {
  const [trail, api] = useTrail(3, (i) => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
  }))
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const { left, top } = ref.current.getBoundingClientRect()
        api.start({ xy: [e.clientX - left, e.clientY - top] })
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [api])

  return (
    <div className={styles.container}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 2 0"
          />
        </filter>
      </svg>
      <div ref={ref} className={styles.hooksMain}>
        {trail.map((props, index) => (
          <animated.div key={index} style={{ transform: props.xy.to(trans) }} />
        ))}
      </div>
    </div>
  )
}

export default Blob
