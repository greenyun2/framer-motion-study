import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useScroll, 
  AnimatePresence,
  } from 'framer-motion';

const StyleWrapper = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 250px;
`;

const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div: first-child, 
  div: last-child {
    grid-column: span 2;
  }
`;

const StyleBox = styled(motion.div)`
  // width: 400px;
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyleOverlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
`;

const StyleCircle = styled(motion.div)`
  background: #00a5ff;
  width: 100px;
  height: 100px;
  // border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const boxVariants = {
  initial: (next: boolean) => ({
    x: next ? -500 : 500,
    opacity: 0,
    scale: 0
    }),
  visible: {
    x: 0, 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5
    },
  },
  leaving: (next: boolean) => ({
    x: next ? 500 : -500,
    opacity: 0, 
    y: 20,
    scale: 0,
    rotateX: 180,
    transition: {
      duration: 0.5,
    },
  }),
};

const box = {
  start: {width: 0, height: 0},
  end: {width: 500, height: 500}
}
function App() {
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState<string>('');
  const toggle = () => {
    setClicked((prev) => !prev);
  };
  const boxName = ['hello', 'box2', 'box3', 'box4'];
  console.log('박스이름', id)
  return (
    <StyleWrapper onClick={toggle}>
      <StyleGrid>
        {boxName.map((item) => (
        <StyleBox onClick={() => setId(item)} key={item} layoutId={item} />
        ))}
      </StyleGrid>
      <AnimatePresence>
      {clicked ? (
      <StyleOverlay 
      onClick={() => setId('')}
      initial={{opacity: 0}} 
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      >
        <StyleBox 
        layoutId={id}
        style={{width: 400, height: 400}} />
      </StyleOverlay> 
      )
      : null}
      </AnimatePresence>
    </StyleWrapper>
  );
};

export default App;
