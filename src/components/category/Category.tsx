import { useParams } from 'react-router-dom';

import Loader from '../axillary/loader/Loader';
import TopicsTable from '../topics/TopicsTable';
import useTopics from '../topics/useTopics';

import useCategory from './useCategory';
import DisplayInput from '../axillary/DisplayInput';
import useEditCategory from '../categories/useEditCategory';

export default function Category(): React.ReactElement {
  const { id } = useParams();
  const { category, isLoading, error } = useCategory(id);
  const { topics } = useTopics({ categoryId: id ?? '' });
  const { editCategory } = useEditCategory();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }

  return category ? (
    <div>
      <h1>Category title: {category.title}</h1>
      <p>Id: {category.id}</p>
      <p>Description: {category.description}</p>
      <DisplayInput
        value={category.title}
        onChange={(value) => {
          console.log('value', value);
          editCategory({ ...category, title: value });
        }}
      />
      {topics.length === 0 || (
        <>
          <hr />
          <h2>Topics</h2>
          <TopicsTable />
        </>
      )}
    </div>
  ) : (
    <>Category is missing</>
  );
}
