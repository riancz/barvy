import React, { createContext, useContext, useState, useEffect } from 'react';
import tinycolor from 'tinycolor2';
import { uid } from 'uid';

interface IShade {
  id: string;
  color: string;
  isMain: boolean;
  isLight: boolean;
}

interface IColor {
  id: string;
  color: string;
  shades: IShade[];
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

const generateShades = (color: any, shadeStepCount: number, shadeStepSize: number, shades?: IShade[]): IShade[] => {
  const mainIndex = Math.floor(shadeStepCount / 2);
  const oddOffset = shadeStepCount % 2 ? 0 : 1;
  const halfToDarken = shadeStepCount - (mainIndex + oddOffset);
  const halfToLighten = mainIndex - 1;

  return new Array(shadeStepCount)
    .fill(null)
    .map((_, i) => {
      let shade = tinycolor(color.toRgb());

      if (i < mainIndex) shade = tinycolor(color.toRgb()).lighten((halfToLighten - i) * shadeStepSize);
      if (i > mainIndex) shade = tinycolor(color.toRgb()).darken((halfToDarken - (shadeStepCount - i)) * shadeStepSize);

      return {
        id: shades?.[i]?.id || uid(),
        color: shade,
        isMain: shades?.[i]?.isMain || i === mainIndex,
        isLight: shade.isLight(),
      };
    });
};

const getNewColor = (shadeStepCount: number, shadeStepSize: number, color?: string) => {
  const tinyColor = color ? tinycolor(color) : tinycolor.random();
  
	return {
		id: uid(),
		color: tinyColor,
    shades: generateShades(tinyColor, shadeStepCount, shadeStepSize)
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

  useEffect(() => setColors(
    colors.map(color => ({
      ...color,
      shades: generateShades(color.color, shadeStepCount, shadeStepSize)
    }))
  ), [shadeStepCount]);

  useEffect(() => setColors(
    colors.map(color => ({
      ...color,
      shades: generateShades(color.color, shadeStepCount, shadeStepSize, color.shades)
    }))
  ), [shadeStepSize]);

	const addColor = (): void => colors
		? setColors(prev => [...prev, getNewColor(shadeStepCount, shadeStepSize)])
		: setColors(prev => [getNewColor(shadeStepCount, shadeStepSize)]);
	
	const removeColor = (id: string): void =>
    colors.length > 1 && setColors(colors.filter(color => color.id !== id));

  const changeColor = (id: string, color: string): void => {
    const colorWithShades = getNewColor(shadeStepCount, shadeStepSize, color);
    const updatedColors = colors.map(presentColor => presentColor.id === id
      ? {
        ...colorWithShades,
        id,
      }
      : presentColor
    );

    setColors(updatedColors);
  };

  const regenerateColor = (id: string): void => changeColor(id, tinycolor.random());
  const changeShadeStepSize = (amount: number): void => {
    amount < 1 && setShadeStepSize(1);
    setShadeStepSize(Number(amount));
  };
  const changeShadeStepCount = (amount: number): void => {
    amount < 1 && setShadeStepCount(1);
    setShadeStepCount(Number(amount));
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