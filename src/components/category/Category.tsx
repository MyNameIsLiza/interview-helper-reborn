import { useParams } from 'react-router-dom';

import Loader from '../axillary/loader/Loader';

import useCategory from './useCategory';

export default function Category(): React.ReactElement {
  const { id } = useParams();
  const { category, isLoading, error } = useCategory(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  return category ? (
    <div>
      <h1>Category title: {category.title}</h1>
      {!category.description || <p>Description: {category.description}</p>}
    </div>
  ) : (
    <>Category is missing</>
  );
}
