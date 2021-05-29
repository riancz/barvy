import React, { createContext, useContext, useState, useEffect } from 'react';
import { uid } from 'uid';

interface IColor {
  id: string;
  color: string;
}

interface IColorContext {
  colors: IColor[],
	addColor: () => void,
	removeColor: (id: string) => void,
	changeColor: (id: string, color: string) => void,
  regenerateColor: (id: string) => void,
  shadeStepSize: number,
  changeShadeStepSize: (amount: number) => void,
  shadeStepCount: number,
  changeShadeStepCount: (amount: number) => void,
}

const ColorsContext = createContext({
	colors: [],
	addColor: () => {},
	removeColor: () => {},
	changeColor: () => {},
  regenerateColor: () => {},
  shadeStepSize: 5,
  changeShadeStepSize: () => {},
  shadeStepCount: 7,
  changeShadeStepCount: () => {},
});

export const useColors = (): IColorContext => useContext(ColorsContext);

const randomBetweenInts = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1) + min);

const getNewColor = () => {
    const r = randomBetweenInts(0, 255).toString(16).padStart(2, '0'),
    g = randomBetweenInts(0, 255).toString(16).padStart(2, '0'),
    b = randomBetweenInts(0, 255).toString(16).padStart(2, '0');

	return {
		id: uid(),
		color: `#${r}${g}${b}`,
	};
};

export const ColorsProvider: React.FC = ({ children }) => {
  const [shadeStepCount, setStepCount] = useState<number>(7);
  const [shadeStepSize, setStepSize] = useState<number>(5);
	const [colors, setColors] = useState<IColor[]>(
    new Array(3)
      .fill(null)
      .map(() => getNewColor())
  );

	const addColor = (): void => colors
		? setColors(prev => [...prev, getNewColor()])
		: setColors(prev => [getNewColor()]);
	
	const removeColor = (id: string): void =>
    colors.length > 1 && setColors(colors.filter(color => color.id !== id));

  const changeColor = (id: string, color: string): void => setColors(
    colors.map(presentColor => presentColor.id === id
      ? {
          id: id,
          color
      }
      : presentColor
  ));

  const regenerateColor = (id: string): void => changeColor(id, getNewColor().color);
  const changeShadeStepSize = (amount: number): void => {
    amount < 1 && setStepSize(1);
    setStepSize(amount);
  }
  const changeShadeStepCount = (amount: number): void => {
    amount < 1 && setStepCount(1);
    setStepCount(amount);
  }

	return (
		<ColorsContext.Provider value={
      {
        colors,
        addColor,
        removeColor,
        changeColor,
        regenerateColor,
        shadeStepSize,
        changeShadeStepSize,
        shadeStepCount,
        changeShadeStepCount
      }
    }>
			{children}
		</ColorsContext.Provider>
	);
};