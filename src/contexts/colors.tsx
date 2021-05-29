import React, { createContext, useContext, useState, useEffect } from 'react';
import tinycolor from 'tinycolor2';
import { uid } from 'uid';

interface IColor {
  id: string;
  color: string;
  shades: {
    id: string;
    color: string;
    isLight: boolean;
  }[];
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

const getNewColor = (shadeStepCount, setStepSize) => {
  const color = tinycolor.random();

	return {
		id: uid(),
		color,
    shades: new Array(shadeStepCount)
      .fill(null)
      .map((_, i) => {
        let shade = color;
        const mainIndex = Math.ceil(shadeStepCount / 2);
        if (i < mainIndex) shade = color.darken(setStepSize);
        if (i > mainIndex) shade = color.lighten(setStepSize);

        return {
          id: uid(),
          color: shade,
          isLight: shade.isLight(),
        }
      })
	};
};

export const ColorsProvider: React.FC = ({ children }) => {
  const [shadeStepCount, setStepCount] = useState<number>(7);
  const [shadeStepSize, setStepSize] = useState<number>(5);
	const [colors, setColors] = useState<IColor[]>(
    new Array(3)
      .fill(null)
      .map(() => getNewColor(shadeStepCount, setStepSize))
  );

	const addColor = (): void => colors
		? setColors(prev => [...prev, getNewColor(shadeStepCount, setStepSize)])
		: setColors(prev => [getNewColor(shadeStepCount, setStepSize)]);
	
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