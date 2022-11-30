import {useParams} from 'react-router-dom';

import type {Category as CategoryType} from '../../types';
import DisplayInput from '../axillary/DisplayInput';
import Loader from '../axillary/loader/Loader';
import useLogChanges from '../axillary/useLogChanges';
import useEditCategory from '../categories/useEditCategory';
import TopicsTable from '../topics/TopicsTable';
import useTopics from '../topics/useTopics';

import useCategory from './useCategory';

export default function Category(): React.ReactElement {
  const {id} = useParams();
  const {category, isLoading, error} = useCategory(id);
  const {topics} = useTopics(id ? {categoryId: id} : undefined);
  const {editCategory, isLoading: isEditLoading} = useEditCategory();

  useLogChanges('Category', 'isEditLoading', isEditLoading);

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return <>Error: {error.message}</>;
  }
  if (!id) {
    return <>Error: Id is missing</>;
  }

  return category ? (
    <div className="flex flex-col gap-3">
      <h1 className="text-h1">Category</h1>
      <p>Id: {category.id}</p>
      <div className="flex items-center">
        <div className="w-fit">Title:</div>
        <DisplayInput
          wrapClassName="w-fit"
          isLoading={isEditLoading}
          value={category.title}
          onChange={async (value): Promise<CategoryType> =>
            editCategory({...category, title: value})
          }
        />
      </div>
      <p>Description: {category.description}</p>
      {topics.length === 0 || (
        <div>
          <hr/>
          <h2 className="text-h2">Topics</h2>
          <TopicsTable {...{categoryId: id}} />
        </div>
      )}
    </div>
  ) : (
    <>Category is missing</>
  );
}
