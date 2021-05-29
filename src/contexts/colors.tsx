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
	changeColor: (id: string, color: IColor) => void,
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

const getNewColor = (shadeStepCount, shadeStepSize) => {
  const color = tinycolor.random();
  const mainIndex = Math.ceil(shadeStepCount);
  const oddOffset = shadeStepCount % 2 ? 0 : 1;
  const halfToDarken = shadeStepCount - (mainIndex + shadeStepCount)
  const halfToLighten = mainIndex - 1;

	return {
		id: uid(),
		color,
    shades: new Array(shadeStepCount)
      .fill(null)
      .map((_, i) => {
        let shade = tinycolor(color.toRgb());

        if (i < mainIndex) shade = tinycolor(color.toRgb()).lighten((halfToLighten - i) * shadeStepSize);
        if (i > mainIndex) shade = tinycolor(color.toRgb()).darken((i - halfToDarken) * shadeStepSize);

        return {
          id: uid(),
          color: shade,
          isLight: shade.isLight(),
        }
      })
	};
};

export const ColorsProvider: React.FC = ({ children }) => {
  const [shadeStepCount, setShadeStepCount] = useState<number>(7);
  const [shadeStepSize, setShadeStepSize] = useState<number>(5);
	const [colors, setColors] = useState<IColor[]>(
    new Array(3)
      .fill(null)
      .map(() => getNewColor(shadeStepCount, shadeStepSize))
  );

	const addColor = (): void => colors
		? setColors(prev => [...prev, getNewColor(shadeStepCount, shadeStepSize)])
		: setColors(prev => [getNewColor(shadeStepCount, shadeStepSize)]);
	
	const removeColor = (id: string): void =>
    colors.length > 1 && setColors(colors.filter(color => color.id !== id));

  const changeColor = (id: string, color: IColor): void => setColors(
    colors.map(presentColor => presentColor.id === id
      ? {
          ...color,
          id: id,
      }
      : presentColor
  ));

  const regenerateColor = (id: string): void => changeColor(id, getNewColor());
  const changeShadeStepSize = (amount: number): void => {
    amount < 1 && setShadeStepSize(1);
    setShadeStepSize(amount);
  };
  const changeShadeStepCount = (amount: number): void => {
    amount < 1 && setShadeStepCount(1);
    setShadeStepCount(amount);
  };

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