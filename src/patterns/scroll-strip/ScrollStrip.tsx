import { useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

const spring = { stiffness: 260, damping: 26, mass: 0.8 }

const images = Array.from({ length: 11 }, (_, i) =>
  `https://picsum.photos/seed/strip${i + 10}/400/600`
)

interface StripItemProps {
  src: string
  isHovered: boolean
  anyHovered: boolean
  onMouseEnter: () => void
}

function StripItem({ src, isHovered, anyHovered, onMouseEnter }: StripItemProps) {
  const targetFlex = isHovered ? 3 : anyHovered ? 0.8 : 1
  const targetGrayscale = isHovered ? 0 : 1
  const targetScale = isHovered ? 1.06 : anyHovered ? 0.97 : 1
  const targetY = isHovered ? -4 : 0

  const flexValue = useSpring(targetFlex, spring)
  const grayscale = useSpring(targetGrayscale, spring)
  const scale = useSpring(targetScale, spring)
  const y = useSpring(targetY, spring)

  flexValue.set(targetFlex)
  grayscale.set(targetGrayscale)
  scale.set(targetScale)
  y.set(targetY)

  const filter = useTransform(grayscale, (g) => `grayscale(${g})`)

  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      style={{
        flex: flexValue,
        height: '100%',
        minWidth: 0,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: 4,
        scale,
        y,
      }}
    >
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          filter,
          display: 'block',
        }}
      />

      {/* Pumpkin accent at bottom on hover */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--color-pumpkin-400)',
          opacity: useSpring(isHovered ? 0.5 : 0, spring),
          borderRadius: 1,
        }}
      />
    </motion.div>
  )
}

export default function ScrollStrip() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 12px',
      }}
    >
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          width: '100%',
          height: '80%',
          maxHeight: 200,
          overflow: 'hidden',
        }}
      >
        {images.map((src, i) => (
          <StripItem
            key={src}
            src={src}
            isHovered={hoveredIndex === i}
            anyHovered={hoveredIndex !== null}
            onMouseEnter={() => setHoveredIndex(i)}
          />
        ))}
      </div>
    </div>
  )
}
