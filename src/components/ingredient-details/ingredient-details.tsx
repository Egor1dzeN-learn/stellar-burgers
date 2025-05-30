import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '@app-store';
import { getIngredients } from '@slices';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const ingreds = useSelector(getIngredients);
  const idParam = useParams();
  const ingredientData = ingreds.find(
    (ingredient) => ingredient._id === idParam.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
